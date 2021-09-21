import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Warning = ({ isShown, handleClose, handleRemoveConfirmed }) => {
  return <Modal show={isShown} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Remove</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleRemoveConfirmed}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>;
};

const RemoveMember = ({ memberId, dispatch, closeDetails, addToast }) => {
  const [isShowingWarning, setIsShowingWarning] = useState(false);

  const handleRemoveConfirmed = () => {
    setIsShowingWarning(false);

    const action = {
      type: 'REMOVE_MEMBER',
      payload: {
        memberId,
      },
    };

    dispatch(action);
    addToast('Employee removed');
    closeDetails();
  };

  return <>
    <Button
      variant="danger"
      onClick={() => setIsShowingWarning(true)}
      className="text-nowrap m-1"
    >
      Remove employee
    </Button>
    <Warning
      isShown={isShowingWarning}
      handleClose={() => setIsShowingWarning(false)}
      handleRemoveConfirmed={handleRemoveConfirmed}
    />
  </>;
};

export default RemoveMember;