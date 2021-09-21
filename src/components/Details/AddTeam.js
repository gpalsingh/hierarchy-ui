import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TeamDetails = ({ isShown, onHide, handleDetails }) => {
  const [teamName, setTeamName] = useState('');

  const handleNameChange = (event) => {
    const val = event.target.value;
    if (val) {
      setTeamName(val.trimStart());
    } else {
      setTeamName('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleDetails(teamName);
  };

  // Clear team name when modal closes
  useEffect(() => {
    if (teamName && (!isShown)) {
      setTeamName('');
    }
  }, [isShown, teamName]);

  return <Modal show={isShown} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Team Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={handleNameChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!teamName}
        type="submit"
      >
        Create
      </Button>
    </Modal.Footer>
  </Modal>
};

const AddTeam = ({ sectionId, dispatch, addToast }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleClick = () => {
    setShowDetailsModal(true);
  };

  const handleModalClose = () => {
    setShowDetailsModal(false);
  };

  const handleTeamDetails = (teamName) => {
    setShowDetailsModal(false);

    const action = {
      type: 'ADD_NEW_TEAM',
      payload: {
        sectionId,
        name: teamName,
      },
    };
    dispatch(action);
    addToast('Added new team: ' + teamName);
  };

  return <>
    <TeamDetails
      isShown={showDetailsModal}
      onHide={handleModalClose}
      handleDetails={handleTeamDetails}
    />
    <Button
      variant="success"
      onClick={handleClick}
      className="text-nowrap m-1"
    >
      Add a new team
    </Button>
  </>;
};

export default AddTeam;