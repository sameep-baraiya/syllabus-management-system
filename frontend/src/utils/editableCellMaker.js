import { Fragment } from 'react';
import { Form } from 'react-bootstrap';

const editableCellMaker = (arr = [], changeCellValue) => {
  const handleFocus = (e) => e.target.select();
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index} style={{ padding: '0px' }}>
          <Form.Control
            name={index}
            type='number'
            onChange={changeCellValue}
            value={it}
            onFocus={handleFocus}
            step='0.1'
            style={{ borderRadius: '0px', borderWidth: '0px' }}
          />
        </td>
      ))}
    </Fragment>
  );
};

export default editableCellMaker;
