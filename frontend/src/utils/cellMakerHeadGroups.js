import { Fragment } from 'react';

const cellMakerHeadGroups = (arr = [], lenArr = []) => {
  return (
    <Fragment>
      {arr.map((it, index) => (
        <td key={index} colSpan={lenArr[index]}>
          {it}
        </td>
      ))}
    </Fragment>
  );
};

export default cellMakerHeadGroups;
