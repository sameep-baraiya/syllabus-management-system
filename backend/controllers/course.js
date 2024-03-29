const ErrorResponse = require('../utils/ErrorResponse');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create course
// @route   POST /api/v1/course
// @access  Private
exports.createCourse = async (req, res, next) => {
  // const { course, subjects } = req.body;
  const {
    courseCode,
    courseName,
    courseDescription,
    courseType,
    department,
    noOfSem,
    monthPerSem,
    isOutdated,
    isFreezed,
  } = req.body;
  try {
    const course = await Course.findOne({
      where: {
        courseCode,
      },
    });

    if (course !== null) {
      return next(new ErrorResponse('Error: Course allready exist', 400));
    }

    const newCourse = await Course.create({
      courseCode,
      courseName,
      courseDescription,
      courseType,
      department,
      noOfSem,
      monthPerSem,
      isOutdated,
      isFreezed,
      crudInfo: {
        type: 'COURSE_CREATE',
        by: req.user.name,
      },
    });

    if (newCourse === null) {
      return next(new ErrorResponse('Error: Unable to create course', 400));
    }
    // for (let i = 0; i < subjects.length; i++) {
    //   if (subjects[i].alreadyExists) {
    //     let subject = await Subject.findOne({
    //       where: {
    //         subjectCode: subjects[i].subjectCode,
    //       },
    //     });
    //     if (subject === null) {
    //       return next(
    //         new ErrorResponse('Error: Bad request subject not exists', 400)
    //       );
    //     }
    //     await courseSql.addSubject(subject);
    //     const subjectWithRef = await courseSql.getSubjects({
    //       where: { id: subject.id },
    //     });
    //     const courseSubject = subjectWithRef[0].CourseSubject;
    //     courseSubject.semNo = subjects[i].semNo;
    //     await courseSubject.save();
    //   } else {
    //     // TODO Logic for not alreadyExists
    //     // const { alreadyExists, semNo, ...rest } = subjects[i];
    //     // const newSubject = await Subject.create(rest);
    //     // await courseSql.addSubject(newSubject);
    //     // const subjectWithRef = await courseSql.getSubjects({
    //     //   where: { id: newSubject.id },
    //     // });
    //     // const courseSubject = subjectWithRef[0].CourseSubject;
    //     // courseSubject.semNo = semNo;
    //     // await courseSubject.save();
    //   }
    // }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Get courses
// @route   GET /api/v1/course
// @access  Private
exports.getCourses = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    return next(err);
  }
};

// @desc    Get single Course with specified id
// @route   GET /api/v1/course/:id
// @access  Private
exports.getCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (course === null) {
      return next(new ErrorResponse('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      data: course.toJSON(),
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Update course
// @route   PUT /api/v1/course/:id
// @access  Private
exports.updateCourse = async (req, res, next) => {
  const { id } = req.params;

  const {
    courseCode,
    courseName,
    courseDescription,
    courseType,
    department,
    noOfSem,
    monthPerSem,
    isOutdated,
    isFreezed,
  } = req.body;

  try {
    const course = await Course.findByPk(id);

    if (course === null) {
      return next(new ErrorResponse('Error: Course does not exist', 400));
    }

    const newCourse = await course.update({
      courseCode,
      courseName,
      courseDescription,
      courseType,
      department,
      noOfSem,
      monthPerSem,
      isOutdated,
      isFreezed,
      crudInfo: {
        type: 'COURSE_UPDATE',
        by: req.user.name,
      },
    });

    if (newCourse === null) {
      return next(new ErrorResponse('Error: Unable to update course', 400));
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// @desc    Delete course
// @route   DELETE /api/v1/course/:id
// @access  Private
exports.deleteCourse = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user.matchPassword(password)) {
      return next(new ErrorResponse('Passowrd not matched', 404));
    }

    const course = await Course.findByPk(id);
    if (course === null) {
      return next(new ErrorResponse('course not found', 404));
    }

    course.crudInfo = {
      type: 'COURSE_DELETE',
      by: req.user.name,
    };

    await course.destroy();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
