import { Fragment } from 'react';

const cellMakerHeadGroups = (arr = []) => {
  let counts = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return (
    <Fragment>
      {Object.keys(counts).map((it, index) => (
        <td key={index} colSpan={counts[it]}>
          {it}
        </td>
      ))}
    </Fragment>
  );
};

export default cellMakerHeadGroups;
