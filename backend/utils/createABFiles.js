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
      case 'CE_ALL':
        templateFilePath = './template/ce.ejs';
        data.isAll = true;
        data.isEven = true;
        break;
      case 'CE_EVEN':
        templateFilePath = './template/ce.ejs';
        data.isAll = false;
        data.isEven = true;
        break;
      case 'CE_ODD':
        templateFilePath = './template/ce.ejs';
        data.isAll = false;
        data.isEven = false;
        break;
      case 'SYLLABUS_BOOK':
        templateFilePath = './template/syllabus_book.ejs';
        break;
      case 'SYLLABUS_BOOK':
        templateFilePath = './template/syllabus_book.ejs';
        break;
      case 'SYLLABUS_BOOK_H':
      case 'SYLLABUS_BOOK_HT':
      case 'SYLLABUS_BOOK_HP':
      case 'SYLLABUS_BOOK_HTP':
        templateFilePath = './template/syllabus_book_h.ejs';
        break;
      default:
        throw new ErrorResponse('Template not found', 400);
    }

    const subTypeArray = type.split('_').pop().split('');
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

    const templateStr = fs.readFileSync(templateFilePath);
    if (!templateStr) throw new ErrorResponse('Unable read template', 500);

    const htmlStr = ejs.render(templateStr.toString(), data);
    if (!htmlStr) throw new ErrorResponse('Ubable create html from ejs', 500);

    const tempFilePath = `./temp/${data.academicBatchCode}.html`;

    fs.writeFileSync(tempFilePath, htmlStr);

    const newPdfFilePath = `./uploads/academic-batch/${type}-${
      data.academicBatchCode
    }-${Date.now()}.pdf`;

    if (subTypeArray.includes('T') || subTypeArray.includes('P')) {
      const tempStartPdf = `./temp/start${data.academicBatchCode}.pdf`;

      console.log(`wkhtmltopdf '${tempFilePath}' '${tempStartPdf}'`);
      if (
        shell.exec(`wkhtmltopdf '${tempFilePath}' '${tempStartPdf}'`, {
          silent: true,
        }).code !== 0
      ) {
        throw new ErrorResponse('Ubable create pdf', 500);
      }

      let command = '';
      let creditIndexCount = 0;
      data.creditIndex.forEach((it) => {
        if (it) {
          creditIndexCount += 1;
        }
      });
      const tempIndexPdf = `./temp/index${data.academicBatchCode}.pdf`;
      command = command.concat(
        `qpdf --empty --pages '${tempStartPdf}' 1-${
          1 + 1 + creditIndexCount
        } -- '${tempIndexPdf}' `
      );

      const hFLag = subTypeArray.includes('H');
      const tFlag = subTypeArray.includes('T');
      const pFlag = subTypeArray.includes('P');

      let num = 1;
      const mergeArray = [tempIndexPdf];

      for (let i = 0; i < data.subjects.length; i++) {
        if (hFLag) {
          const tempOutPdf = `./temp/out${data.academicBatchCode}${num}.pdf`;
          command = command.concat(
            `&& qpdf --empty --pages '${tempStartPdf}' ${
              1 + 1 + creditIndexCount + num
            } -- '${tempOutPdf}' `
          );
          num += 1;
          mergeArray.push(tempOutPdf);
        }
        if (tFlag) {
          if (data.subjects[i].theoryFile && data.subjects[i].theoryFile.path) {
            mergeArray.push(data.subjects[i].theoryFile.path);
          }
        }
        if (pFlag) {
          if (
            data.subjects[i].practicalFile &&
            data.subjects[i].practicalFile.path
          ) {
            mergeArray.push(data.subjects[i].practicalFile.path);
          }
        }
      }

      command = command.concat(`&& qpdf --empty --pages`);
      for (let i = 0; i < mergeArray.length; i++) {
        command = command.concat(` '${mergeArray[i]}'`);
      }
      command = command.concat(` -- '${newPdfFilePath}'`);

      // console.log(command.split('&&'));
      console.log('Creating'.red);

      const commandArray = command.split('&&');
      for (let i = 0; i < commandArray.length; i++) {
        if (
          shell.exec(commandArray[i], {
            silent: true,
          }).code !== 0
        ) {
          throw new ErrorResponse(`${commandArray[i]}`, 500);
        }
        console.log(`i:${i}`.green);
        // if (i % 10 === 0 || i === mergeArray.length - 1) {
        //   io.to(socketId).emit(
        //     'CREATE_FILE',
        //     `${((i + 1) / commandArray.length) * 100}`
        //   );
        // }
      }

      if (fs.existsSync(tempStartPdf)) {
        fs.unlinkSync(tempStartPdf);
      }
      mergeArray.forEach((fp) => {
        if (fs.existsSync(fp)) {
          fs.unlinkSync(fp);
        }
      });

      console.log('Done'.red);
    } else {
      if (
        shell.exec(`wkhtmltopdf '${tempFilePath}' '${newPdfFilePath}'`, {
          silent: true,
        }).code !== 0
      ) {
        throw new ErrorResponse('Ubable create pdf', 500);
      }
      fs.unlinkSync(tempFilePath);
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

    io.to(socketId).emit('CREATE_FILE', 'Done');
  } catch (err) {
    console.error(err);
    io.to(socketId).emit('CREATE_FILE', err.message);
  }
};

module.exports = createABFiles;
