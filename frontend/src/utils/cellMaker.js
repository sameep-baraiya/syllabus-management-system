import { Fragment } from 'react';

const cellMaker = (arr = []) => {
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index}>{it}</td>
      ))}
    </Fragment>
  );
};

export default cellMaker;
