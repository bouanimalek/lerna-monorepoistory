import React from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import { Worker } from "@react-pdf-viewer/core";

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import DownloadLink from "react-download-link";

const ViewTicket = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ticket File Preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={props.path} />
        </Worker>
      </Modal.Body>
      <Modal.Footer>
        <a href={props.path} download target="_blank">
          <Button variant="success" className="me-1">
            <i className="fa fa-download"></i> Download ticket
          </Button>
        </a>
        {/* <DownloadLink
          label="Download"
          filename="ticket.pdf"
          exportFile={() => Promise.resolve(props.path)}
        /> */}

        <Button onClick={props.onHide}>
          <i className="fa fa-undo"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTicket;
