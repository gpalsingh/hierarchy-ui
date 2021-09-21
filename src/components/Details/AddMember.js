import Button from 'react-bootstrap/Button';

const AddMember = ({ section, sectionId, dispatch, addToast }) => {
  const id = section.role === 'lead' ? section.subSections[0] : sectionId;

  const handleClick = () => {
    const action = {
      type: 'ADD_MEMBER',
      payload: {
        sectionId: id,
      }
    };

    dispatch(action);
    addToast('Added a new employee slot to ' + section.label)
  };

  return <Button
    variant="success"
    onClick={handleClick}
    className="text-nowrap m-1"
  >
    Add new member
  </Button>;
};

export default AddMember;