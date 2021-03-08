import React, { useState, Fragment } from 'react';
import { Table, Card, Button, Form, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { iconCopy, iconCreate2 } from '../../layout/Icon';

// Utils
import s2pf from '../../../utils/s2pf';
import cellMaker from '../../../utils/cellMaker';
import cellMakerHeadGroups from '../../../utils/cellMakerHeadGroups';
import editableCellMaker from '../../../utils/editableCellMaker';

import HMJSONCopy from './HMJSONCopy';

const HaedMasterJSONInput = ({ reqObj, setReqObj }) => {
  const { headMasterJSON } = reqObj;

  const changeCellValue = (e) => {
    const tempPointsArray = reqObj.headMasterJSON.points;
    tempPointsArray[parseInt(e.target.name)] = s2pf(e.target.value);
    setReqObj({
      ...reqObj,
      headMasterJSON: {
        ...reqObj.headMasterJSON,
        points: tempPointsArray,
      },
    });
  };

  // For copy pre existing value to HeadMasterJSON
  const onCopy = (index, ptIndex) => {
    if (headMasterJSON.headGroups.includes(HMJSONCopy[index].headGroups)) {
      const hmIndex = headMasterJSON.headGroups.indexOf(
        HMJSONCopy[index].headGroups
      );

      let newPoints = headMasterJSON.points;
      let newHeadMasters = headMasterJSON.headMasters;
      const startIndex = headMasterJSON.headGroupsLength
        .slice(0, hmIndex)
        .reduce((a, b) => a + b, 0);

      const lSubPoints = headMasterJSON.points.slice(0, startIndex);
      const lSubHeadMasters = headMasterJSON.headMasters.slice(0, startIndex);

      const rSubPoints = headMasterJSON.points.slice(
        startIndex + headMasterJSON.headGroupsLength[hmIndex],
        startIndex + newPoints.length
      );
      const rSubHeadMasters = headMasterJSON.headMasters.slice(
        startIndex + headMasterJSON.headGroupsLength[hmIndex],
        startIndex + newPoints.length
      );

      newPoints = lSubPoints
        .concat(HMJSONCopy[index].points[ptIndex])
        .concat(rSubPoints);

      // console.log(
      //   lSubHeadMasters,
      //   HMJSONCopy[index].headMasters,
      //   rSubHeadMasters
      // );

      newHeadMasters = lSubHeadMasters
        .concat(HMJSONCopy[index].headMasters)
        .concat(rSubHeadMasters);

      const newHeadGroupsLength = headMasterJSON.headGroupsLength;
      newHeadGroupsLength[hmIndex] = HMJSONCopy[index].points[ptIndex].length;

      // console.log(newHeadMasters);
      // console.log(newPoints);

      setReqObj({
        ...reqObj,
        headMasterJSON: {
          ...reqObj.headMasterJSON,
          headMasters: newHeadMasters,
          headGroupsLength: newHeadGroupsLength,
          points: newPoints,
        },
      });
    } else {
      const newHeadMasters = headMasterJSON.headMasters.concat(
        HMJSONCopy[index].headMasters
      );
      const newHeadGroups = headMasterJSON.headGroups.concat(
        HMJSONCopy[index].headGroups
      );
      headMasterJSON.headGroupsLength.push(
        HMJSONCopy[index].points[ptIndex].length
      );
      const newPoints = headMasterJSON.points.concat(
        HMJSONCopy[index].points[ptIndex]
      );

      setReqObj({
        ...reqObj,
        headMasterJSON: {
          headMasters: newHeadMasters,
          headGroups: newHeadGroups,
          headGroupsLength: headMasterJSON.headGroupsLength,
          points: newPoints,
        },
      });
    }
  };

  // For handling custom Head Master
  const [newHM, setNewHM] = useState({
    headGroups: 'Head Group Title',
    headMasters: ['Head Master Title'],
    points: [[0]],
  });

  const onHMChange = (e, field, index) => {
    if (field === 'headGroups') {
      setNewHM({
        ...newHM,
        headGroups: e.target.value,
      });
    } else if (field === 'headMasters') {
      newHM.headMasters[index] = e.target.value;
      setNewHM({
        ...newHM,
        headMasters: newHM.headMasters,
      });
    } else if (field === 'points') {
      newHM.points[0][index] = s2pf(e.target.value);
      setNewHM({
        ...newHM,
        points: newHM.points,
      });
    }
  };

  const handleFocus = (e) => e.target.select();

  const createNewHM = (e) => {
    HMJSONCopy.push(JSON.parse(JSON.stringify(newHM)));
    onCopy(HMJSONCopy.length - 1, 0);
  };

  // Remove Last Head Master from HeadMasterJSON
  const removeLast = (e) => {
    for (let i = 0; i < headMasterJSON.headGroupsLength.slice(-1)[0]; i++) {
      headMasterJSON.headMasters.pop();
      headMasterJSON.points.pop();
    }

    headMasterJSON.headGroups.pop();
    headMasterJSON.headGroupsLength.pop();

    setReqObj({
      ...reqObj,
      headMasterJSON: {
        headMasters: headMasterJSON.headMasters,
        headGroups: headMasterJSON.headGroups,
        headGroupsLength: headMasterJSON.headGroupsLength,
        points: headMasterJSON.points,
      },
    });
  };

  // Reset HeadMasterJSON
  const resetHM = (e) => {
    setReqObj({
      ...reqObj,
      headMasterJSON: {
        headMasters: [
          'Lecture',
          'Tutorial',
          'Practical',
          'L+T',
          'P',
          'Total CS',
          'Theory',
          'Sessional',
          'Practical',
          'Term Work',
          'Total ES',
        ],
        headGroups: ['Teaching Scheme', 'Credit Structure', 'Exam Scheme'],
        headGroupsLength: [3, 3, 5],
        points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    });
  };

  // Advanced Option Toggle
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Table striped bordered>
          <thead>
            <tr className='table-secondary'>
              {cellMakerHeadGroups(
                headMasterJSON.headGroups,
                headMasterJSON.headGroupsLength
              )}
            </tr>
          </thead>
          <thead>
            <tr className='table-secondary'>
              {cellMaker(headMasterJSON.headMasters)}
            </tr>
          </thead>
          <tbody>
            <tr>{editableCellMaker(headMasterJSON.points, changeCellValue)}</tr>
          </tbody>
        </Table>
        <Button
          variant={isAdvanced ? 'info' : 'outline-info'}
          block
          onClick={(e) => {
            setIsAdvanced(!isAdvanced);
          }}
        >
          Advanced Option
        </Button>

        {isAdvanced && (
          <Fragment>
            <h5 className='mt-3'>
              <strong>{iconCopy} Copy Head Master Values</strong>
            </h5>
            {HMJSONCopy.map((it, index) => (
              <Table bordered key={index} size='sm'>
                <tbody>
                  <tr>
                    <th rowSpan={it.points.length} width='30%'>
                      {it.headGroups}
                      <br />
                      <span className='text-muted'>
                        {it.headMasters.join(', ')}
                      </span>
                    </th>
                    <td width='65%'>{it.points[0].join(', ')}</td>
                    <td width='5%'>
                      <Button
                        name={`${index}.0`}
                        variant='warning'
                        size='sm'
                        block
                        onClick={(e) => onCopy(index, 0)}
                      >
                        {iconCopy}
                      </Button>
                    </td>
                  </tr>
                  {it.points.map((pt, ptIndex) => {
                    if (ptIndex === 0) {
                      return null;
                    }
                    return (
                      <tr key={ptIndex}>
                        <td>{pt.join(', ')}</td>
                        <td>
                          <Button
                            variant='warning'
                            size='sm'
                            block
                            onClick={(e) => onCopy(index, ptIndex)}
                          >
                            {iconCopy}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ))}
            <h5>
              <strong>{iconCreate2} Create Custom Head Master</strong>
            </h5>
            <Table bordered>
              <tbody>
                <tr className='table-secondary'>
                  <td width='70%'>
                    <Form.Label>
                      Custom New Head Group/Enter olds name
                    </Form.Label>
                    <Form.Control
                      name='headGroups'
                      type='text'
                      placeholder='Enter new head group title'
                      onChange={(e) => onHMChange(e, 'headGroups', 0)}
                      value={newHM.headGroups}
                    />
                  </td>
                  <td width='30%'>
                    <Button
                      variant='success'
                      onClick={(e) => {
                        newHM.headMasters.push('New');
                        newHM.points[0].push(0);
                        setNewHM({
                          ...newHM,
                          headMasters: newHM.headMasters,
                          points: newHM.points,
                        });
                      }}
                      block
                    >
                      Add New Head Master
                    </Button>
                    <Button
                      variant='warning'
                      onClick={(e) => {
                        newHM.headMasters.pop();
                        newHM.points[0].pop();
                        setNewHM({
                          ...newHM,
                          headMasters: newHM.headMasters,
                          points: newHM.points,
                        });
                      }}
                      block
                    >
                      Remove Last Head Master
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Form.Label>Modify this vaules as per need</Form.Label>
                    <Table bordered>
                      <tbody>
                        <tr>
                          {newHM.headMasters.map((it, index) => (
                            <td key={index} style={{ padding: '0px' }}>
                              <Form.Control
                                name='headMasters'
                                type='text'
                                placeholder='Enter new Head Masters Title'
                                onChange={(e) =>
                                  onHMChange(e, 'headMasters', index)
                                }
                                value={it}
                                style={{
                                  borderRadius: '0px',
                                  borderWidth: '0px',
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {newHM.points[0].map((it, index) => (
                            <td key={index} style={{ padding: '0px' }}>
                              <Form.Control
                                name='points'
                                type='number'
                                onChange={(e) => onHMChange(e, 'points', index)}
                                value={it}
                                step='0.1'
                                onFocus={handleFocus}
                                style={{
                                  borderRadius: '0px',
                                  borderWidth: '0px',
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Button variant='primary' block onClick={createNewHM}>
                      Create New Custom Head Master
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
            <ButtonGroup className='mb-2'>
              <Button variant='danger' onClick={removeLast}>
                Remove Last Head Master
              </Button>
              <Button variant='secondary' onClick={resetHM}>
                Reset Head Master
              </Button>
            </ButtonGroup>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

HaedMasterJSONInput.propTypes = {
  reqObj: PropTypes.object.isRequired,
  setReqObj: PropTypes.func.isRequired,
};

export default HaedMasterJSONInput;
