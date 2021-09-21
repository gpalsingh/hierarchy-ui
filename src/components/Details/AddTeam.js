import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SectionDetailsModal from './SectionDetailsModal';

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
    <SectionDetailsModal
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