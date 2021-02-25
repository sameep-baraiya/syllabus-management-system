import { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import ReactJson from 'react-json-view';

const itemJsonView = (item, index) => {
  return (
    <Fragment key={index}>
      <Card>
        <Card.Body>
          <ReactJson src={item} />
        </Card.Body>
      </Card>
      <br />
    </Fragment>
  );
};

export default itemJsonView;
