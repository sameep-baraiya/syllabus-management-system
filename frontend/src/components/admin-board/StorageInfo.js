import React, { useContext } from 'react';
import { Button, Alert } from 'react-bootstrap';

// Context
import StorageContext from '../../context/storage/storageContext';

// Layout
import { iconUpload } from '../layout/Icon';

const StorageInfo = () => {
  const storageContext = useContext(StorageContext);
  const { storageInfo, getStorageInfo } = storageContext;

  const dsConverter = (val) => {
    if (val < 1000) {
      return `${val} Byte`;
    } else if (val < 1e6) {
      return `≅ ${Math.floor(val / 1000)} Kilobyte`;
    } else if (val < 1e9) {
      return `≅ ${Math.floor(val / 1e6)} Megabyte`;
    } else {
      return `≅ ${Math.floor(val / 1e6)} Gigabyte`;
    }
  };

  return (
    <div>
      <br />
      <div>
        <Button
          block
          onClick={() => {
            getStorageInfo();
          }}
        >
          Get Storage Info
        </Button>
      </div>
      <br />
      {storageInfo && (
        <div>
          <Alert variant='primary'>
            <h4>
              <strong>{iconUpload} Upload Directory</strong>
            </h4>
            <strong>Size of uploded directory : </strong>
            {dsConverter(storageInfo.tree.size)} <br />
            <strong>Number of sub directory : </strong>
            {storageInfo.tree.children.length} <br />
            <br />
            <strong>Sub Directory :</strong>
            {storageInfo.tree.children.map((it, index) => (
              <div key={index}>
                <Alert variant='warning'>
                  <strong>Directory : </strong>
                  {it.name} <br />
                  <strong>Size : </strong>
                  {dsConverter(it.size)} <br />
                  <strong>Number of files : </strong>
                  {it.childrenLength}
                </Alert>
              </div>
            ))}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default StorageInfo;
