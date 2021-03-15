import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';

const PdfView = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isObjectMode, setIsObjectMode] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(pageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  if (url !== null && url !== '') {
    return (
      <div>
        <div className='mt-2 mb-2'>
          <Row>
            <Col>
              <Button
                block
                variant={isObjectMode ? 'primary' : 'outline-primary'}
                onClick={() => {
                  setIsObjectMode(true);
                }}
              >
                Object View
              </Button>
            </Col>
            <Col>
              <Button
                block
                variant={!isObjectMode ? 'primary' : 'outline-primary'}
                onClick={() => {
                  setIsObjectMode(false);
                }}
              >
                React Pdf View
              </Button>
            </Col>
          </Row>
        </div>
        {isObjectMode ? (
          <object
            data={url}
            type='application/pdf'
            width='100%'
            height='500px'
            aria-label='PDF View Object'
            className='mb2'
          ></object>
        ) : (
          <div
            className='m-2'
            style={{
              maxWidth: 'fit-content',
              maxHeight: 'fit-content',
            }}
          >
            <Document
              file={{
                url: url,
              }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={800} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </p>
              <Button disabled={pageNumber <= 1} onClick={previousPage}>
                Previous
              </Button>{' '}
              <Button disabled={pageNumber >= numPages} onClick={nextPage}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

PdfView.propTypes = {
  urlArray: PropTypes.string,
};

export default PdfView;
