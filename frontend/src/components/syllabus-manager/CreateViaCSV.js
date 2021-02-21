import React, { Fragment, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// TODO Update CSV
const CreateViaCSV = () => {
  const [text, setText] = useState('');
  const [reqObj, setReqObj] = useState({
    course: {
      courseCode: '',
      courseDescription: '',
      courseType: '',
      department: '',
      courseLength: 0,
      noOfSemesters: 0,
    },
    subjects: [],
  });
  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileText = e.target.result;
      // console.log(fileText);
      setText(fileText);
    };
    reader.readAsText(e.target.files[0]);
  };
  const createReqObj = (e) => {
    const columns = text.split('\n');
    // for (let column = 0; column < columns.length; column++) {
    //   const cells = columns[column].split(',');
    //   for (let cell = 0; cell < cells.length; cell++) {
    //     console.log('---->', cells[cell]);
    //   }
    // }
    if (
      columns[0].split(',')[0] === 'DocType' &&
      columns[1].split(',')[0] === 'dsms-course-creation'
    ) {
      const headCells = columns[1].split(',');
      console.log('DocType OK');
      setReqObj({
        course: {
          courseCode: headCells[1],
          courseDescription: headCells[2],
          courseType: headCells[3],
          department: headCells[4],
          courseLength: parseInt(headCells[5]),
          noOfSemesters: parseInt(headCells[6]),
        },
        subjects: [],
      });
    }
  };
  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Upload CSV file to create course</Form.Label>
          <Form.File name='file' onChange={showFile} />
        </Form.Group>
      </Form>
      <Button variant='primary' onClick={createReqObj}>
        Test
      </Button>
      <hr />
      <p>{text}</p>
      <hr />
      <div>
        <pre>{JSON.stringify(reqObj, null, 4)}</pre>
      </div>
      <hr />
    </Fragment>
  );
};

export default CreateViaCSV;
