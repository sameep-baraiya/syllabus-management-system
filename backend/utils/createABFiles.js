const ejs = require('ejs');
const shell = require('shelljs');
const fs = require('fs');
const mkdirp = require('mkdirp');
const PDFMerger = require('pdf-merger-js');
var rimraf = require('rimraf');
const merger = new PDFMerger();
const ErrorResponse = require('../utils/ErrorResponse');
const AcademicBatch = require('../models/AcademicBatch');
const AcademicBatchSubject = require('../models/AcademicBatchSubject');
const Course = require('../models/Course');
const Subject = require('../models/Subject');

const createABFiles = async (
  ogAcademicBatch,
  type,
  data,
  user,
  io,
  socketId
) => {
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
      case 'SYLLABUS_BOOK_H':
      case 'SYLLABUS_BOOK_HT':
      case 'SYLLABUS_BOOK_HP':
      case 'SYLLABUS_BOOK_HTP':
      case 'SYLLABUS_BOOK_TP':
      case 'SYLLABUS_BOOK_T':
      case 'SYLLABUS_BOOK_P':
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

    fs.readFile(templateFilePath, (err, templateStr) => {
      console.log('test'.green);
      if (err) throw new ErrorResponse('Unable read template', 500);

      const htmlStr = ejs.render(templateStr.toString(), data);
      if (!htmlStr) throw new ErrorResponse('Ubable create html from ejs', 500);

      const tempDirPath = `./temp/${data.academicBatchCode}/${type}`;

      mkdirp(tempDirPath, (err) => {
        const tempFilePath = `${tempDirPath}/ejsToHtml.html`;
        fs.writeFile(tempFilePath, htmlStr, async (errW) => {
          if (errW) throw new ErrorResponse('Unable save file', 500);

          const newPdfFilePath = `./uploads/academic-batch/${type}-${
            data.academicBatchCode
          }-${Date.now()}.pdf`;

          if (subTypeArray.includes('T') || subTypeArray.includes('P')) {
            const tempStartPdf = `${tempDirPath}/start.pdf`;

            if (
              shell.exec(`wkhtmltopdf '${tempFilePath}' '${tempStartPdf}'`, {
                silent: true,
              }).code !== 0
            ) {
              throw new ErrorResponse('Ubable create pdf', 500);
            }

            let creditIndexCount = 0;
            data.creditIndex.forEach((it) => {
              if (it) {
                creditIndexCount += 1;
              }
            });

            merger.add(tempStartPdf, `1 to ${1 + 1 + creditIndexCount}`);

            const hFLag = subTypeArray.includes('H');
            const tFlag = subTypeArray.includes('T');
            const pFlag = subTypeArray.includes('P');

            let num = 1;
            for (let i = 0; i < data.subjects.length; i++) {
              if (hFLag) {
                merger.add(tempStartPdf, [1 + 1 + creditIndexCount + num]);
                num += 1;
              }
              if (tFlag) {
                if (
                  data.subjects[i].theoryFile &&
                  data.subjects[i].theoryFile.path
                ) {
                  merger.add(data.subjects[i].theoryFile.path);
                }
              }
              if (pFlag) {
                if (
                  data.subjects[i].practicalFile &&
                  data.subjects[i].practicalFile.path
                ) {
                  merger.add(data.subjects[i].practicalFile.path);
                }
              }
            }
            await merger.save(newPdfFilePath);
            rimraf.sync(tempDirPath);

            console.log('Creating'.red);

            const academicBatch = ogAcademicBatch;
            if (!academicBatch.files) {
              academicBatch.files = [];
            }

            const newFiles = academicBatch.files;
            const tempIndex = academicBatch.files
              .map((ab) => ab.type)
              .indexOf(type);

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
            io.to(socketId).emit('CREATE_FILE', {
              success: true,
              type: type,
              code: academicBatch.academicBatchCode,
            });
          } else {
            shell.exec(
              `wkhtmltopdf '${tempFilePath}' '${newPdfFilePath}'`,
              {
                silent: true,
                async: true,
              },
              async (code) => {
                if (code !== 0)
                  throw new ErrorResponse('Ubable create pdf', 500);

                const academicBatch = ogAcademicBatch;
                if (!academicBatch)
                  throw new ErrorResponse(
                    'Unexpected academic batch not found',
                    500
                  );

                if (!academicBatch.files) {
                  academicBatch.files = [];
                }

                const newFiles = academicBatch.files;
                const tempIndex = academicBatch.files
                  .map((ab) => ab.type)
                  .indexOf(type);

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

                rimraf.sync(tempDirPath);
                await academicBatch.save();
                io.to(socketId).emit('CREATE_FILE', {
                  success: true,
                  type: type,
                  code: academicBatch.academicBatchCode,
                });
              }
            );
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = createABFiles;
