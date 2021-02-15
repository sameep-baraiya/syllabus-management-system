import { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import ReactJson from 'react-json-view';

const subjectJsonView = (subject, index) => {
  return (
    <Fragment key={index}>
      <Card>
        <Card.Body>
          {/* <div>
            <pre>{JSON.stringify(subject, null, 4)}</pre>
          </div> */}
          <ReactJson src={subject} />
        </Card.Body>
      </Card>
      <br />
    </Fragment>
  );
};

export default subjectJsonView;
