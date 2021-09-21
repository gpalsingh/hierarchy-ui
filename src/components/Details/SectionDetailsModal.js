import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const SectionDetailsModal = ({ isShown, onHide, handleDetails, sectionType, initialValue }) => {
  const [sectionName, setSectionName] = useState(initialValue || '');
  const [hasEdited, setHasEdited] = useState(false);

  const handleNameChange = (event) => {
    const val = event.target.value;

    if (!hasEdited) {
      setHasEdited(true);
    }

    if (val) {
      setSectionName(val.trimStart());
    } else {
      setSectionName('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleDetails(sectionName);
  };

  // Clear team name when modal closes
  useEffect(() => {
    if (sectionName && (!isShown)) {
      setSectionName(initialValue || '');
    }
  }, [initialValue, isShown, sectionName]);

  const handleClose = () => {
    setHasEdited(false);
    setSectionName(initialValue || '');
    onHide();
  };

  return <Modal show={isShown} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{sectionType || 'Team'} Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder={`${sectionType || 'Team'} Name`}
            value={sectionName}
            onChange={handleNameChange}
            isInvalid={hasEdited && !sectionName}
            isValid={hasEdited && sectionName}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!hasEdited || !sectionName}
        type="submit"
      >
        Create
      </Button>
    </Modal.Footer>
  </Modal>
};

export default SectionDetailsModal;