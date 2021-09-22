import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

/**
 * Modal used to enter section name
 * Used both when creating new team and when editing section name
 */
const SectionDetailsModal = ({
  isShown,
  onHide,
  handleDetails,
  sectionType,
  initialValue,
  invalidTerms,
}) => {
  const [sectionName, setSectionName] = useState(initialValue || '');
  const [hasEdited, setHasEdited] = useState(false);
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  const isDisabled = !hasEdited || !sectionName || isDuplicateName;

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

    if (isDisabled) {
      return;
    }
    handleDetails(sectionName);
  };

  // Clear team name when modal closes
  useEffect(() => {
    if (sectionName && (!isShown)) {
      setSectionName(initialValue || '');
    }
  }, [initialValue, isShown, sectionName]);

  // Disable save if team name already exists
  useEffect(() => {
    if (!invalidTerms) {
      return;
    }

    const canSave = invalidTerms.some(term => sectionName.toLowerCase() === term.toLowerCase());
    if (canSave !== isDuplicateName) {
      setIsDuplicateName(canSave);
    }
  }, [invalidTerms, isDuplicateName, sectionName])

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
            isInvalid={hasEdited && (!sectionName || isDuplicateName)}
            isValid={hasEdited && sectionName && !isDuplicateName}
          />
          {hasEdited && isDuplicateName &&
            <Form.Control.Feedback type="invalid">
              A {sectionType || 'Team'} with this name already exists
            </Form.Control.Feedback>
          }
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
        disabled={isDisabled}
        type="submit"
      >
        Create
      </Button>
    </Modal.Footer>
  </Modal>
};

export default SectionDetailsModal;