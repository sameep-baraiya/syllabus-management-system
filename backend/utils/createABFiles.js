const ejs = require('ejs');
const shell = require('shelljs');
const fs = require('fs');
const temp = require('temp');
const path = require('path');
const ErrorResponse = require('./ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');

const createABFiles = async (type, data, io, socketId, user) => {
  try {
    let templateFilePath = null;
    switch (type) {
      case 'SYLLABUS_BOOK_H':
        templateFilePath = './template/syllabus_book_h.ejs';
        const creditIndex = [];
        const csIndex = data.subjects[0].headMasterJSON.headMasters.indexOf(
          'Total CS'
        );
        const esIndex = data.subjects[0].headMasterJSON.headMasters.indexOf(
          'Total ES'
        );
        const electiveFilter = [];
        const semIndex = [];

        if (csIndex >= 0 && esIndex >= 0) {
          data.subjects.forEach((sub, index) => {
            if (!(sub.isElective && electiveFilter[sub.semNo])) {
              if (creditIndex[sub.semNo]) {
                creditIndex[sub.semNo][1] += sub.headMasterJSON.points[csIndex];
                creditIndex[sub.semNo][2] += sub.headMasterJSON.points[esIndex];
              } else {
                creditIndex[sub.semNo] = [
                  sub.semNo,
                  sub.headMasterJSON.points[csIndex],
                  sub.headMasterJSON.points[esIndex],
                ];
              }
              if (sub.isElective) {
                electiveFilter[sub.semNo] = true;
              }
            }
            if (semIndex[sub.semNo]) {
              semIndex[sub.semNo].push(index);
            } else {
              semIndex[sub.semNo] = [index];
            }
          });
        } else {
          throw new ErrorResponse('Invalid Headmaster', 400);
        }

        let csTotal = 0.0;
        let esTotal = 0.0;
        creditIndex.forEach((it) => {
          if (it) {
            csTotal += parseFloat(it[1]);
            esTotal += parseFloat(it[2]);
          }
        });

        const creditIndexTotal = [csTotal, esTotal];

        // console.log(creditIndex, creditIndexTotal, semIndex);
        data.creditIndex = creditIndex;
        data.creditIndexTotal = creditIndexTotal;
        data.semIndex = semIndex;
        data.csIndex = csIndex;
        data.esIndex = esIndex;

        break;
      default:
        throw new ErrorResponse('Template not found', 400);
    }

    const templateStr = fs.readFileSync(templateFilePath);
    if (!templateStr) throw new ErrorResponse('Unable read template', 500);

    const htmlStr = ejs.render(templateStr.toString(), data);
    if (!htmlStr) throw new ErrorResponse('Ubable create html from ejs', 500);

    const tempFilePath = `./temp/${data.academicBatchCode}.html`;

    fs.writeFileSync(tempFilePath, htmlStr);

    const newPdfFilePath = `./uploads/academic-batch/${type}-${
      data.academicBatchCode
    }-${Date.now()}.pdf`;
    if (
      shell.exec(`wkhtmltopdf '${tempFilePath}' '${newPdfFilePath}'`, {
        silent: true,
      }).code !== 0
    ) {
      throw new ErrorResponse('Ubable create pdf', 500);
    }

    const academicBatch = await AcademicBatch.findByPk(data.id);
    if (!academicBatch)
      throw new ErrorResponse('Unexpected academic batch not found', 500);

    if (!academicBatch.files) {
      academicBatch.files = [];
    }

    const newFiles = academicBatch.files;
    const tempIndex = academicBatch.files.map((ab) => ab.type).indexOf(type);

    academicBatch.crudInfo = {
      type: 'ACADEMIC_BATCH_FILE_CREATE',
      by: user.name,
    };

    if (tempIndex >= 0) {
      if (fs.existsSync(newFiles[tempIndex].path)) {
        fs.unlinkSync(newFiles[tempIndex].path);
      }
      newFiles[tempIndex] = {
        name: newPdfFilePath.split('/').pop(),
        path: newPdfFilePath,
        type: type,
      };
      academicBatch.set('files', null);
      academicBatch.set('files', newFiles);
    } else {
      newFiles.push({
        name: newPdfFilePath.split('/').pop(),
        path: newPdfFilePath,
        type: type,
      });
      academicBatch.set('files', null);
      academicBatch.set('files', newFiles);
    }

    await academicBatch.save();

    fs.unlinkSync(tempFilePath);

    io.to(socketId).emit('CREATE_FILE', 'Done');
  } catch (err) {
    console.error(err);
    io.to(socketId).emit('CREATE_FILE', err.message);
  }
};

module.exports = createABFiles;
