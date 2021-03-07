import { Fragment } from 'react';
import { Form } from 'react-bootstrap';

const editableCellMaker = (arr = [], changeCellValue) => {
  const handleFocus = (e) => e.target.select();
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index}>
          <Form.Control
            name={index}
            type='text'
            onChange={changeCellValue}
            value={it}
            onFocus={handleFocus}
          />
        </td>
      ))}
    </Fragment>
  );
};

export default editableCellMaker;
