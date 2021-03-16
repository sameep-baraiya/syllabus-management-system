import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

// Subject Model Components
import DeleteSubject from '../../models/subject/DeleteSubject';
import FindSubject from '../../models/subject/FindSubject';
import ViewSubject from '../../models/subject/ViewSubject';

// Context
import SubjectContext from '../../../context/subject/subjectContext';

const SMDeleteSubject = () => {
  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubject, subject } = subjectContext;

  const [isSelected, setIsSelected] = useState(false);
  const [mode, setMode] = useState('');

  const onSelectClick = (id) => {
    setIsSelected(true);
    getSubject(id);
  };

  const onSubjectSelectClick = () => {
    setMode('delete');
    setIsSelected(false);
  };

  const selectionList = () => {
    return (
      <div>
        <FindSubject defaultSelect='id,subjectCode,subjectName,subjectShort' />
        {subjects &&
          subjects.map((sub, index) => (
            <div
              key={index}
              className='p-3 mb-2 bg-dark text-white'
              onClick={() => onSelectClick(sub.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <span className='pt-1 pb-1 pl-3 pr-3 mr-3 bg-secondary text-white'>
                Select
              </span>
              {sub.subjectCode}: {sub.subjectName} ({sub.subjectShort})
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <br />
      <h2>
        <strong>Delete Subject</strong>
      </h2>
      <Card>
        <Card.Header>Select subject that you want to delete</Card.Header>
        <Card.Body>
          {isSelected ? (
            <div>
              <ViewSubject subject={subject} />
              <br />
              <Button variant='success' onClick={onSubjectSelectClick}>
                Select
              </Button>{' '}
              <Button
                variant='secondary'
                onClick={() => {
                  setIsSelected(false);
                }}
              >
                Back To Search
              </Button>
            </div>
          ) : (
            selectionList()
          )}
        </Card.Body>
      </Card>
      <hr />
      <DeleteSubject mode={mode} setMode={setMode} />
      <br />
    </div>
  );
};

export default SMDeleteSubject;
