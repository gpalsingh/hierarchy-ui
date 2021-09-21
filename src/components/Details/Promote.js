import Button from 'react-bootstrap/Button';

const Promote = ({ dispatch, employeeId, closeDetails, addToast }) => {
  const handleClick = () => {
    const action = {
      type: 'PROMOTE_EMPLOYEE',
      payload: {
        employeeId,
      },
    };

    dispatch(action);
    addToast('Employee promoted');
    closeDetails();
  };

  return <Button
    variant="primary"
    onClick={handleClick}
    className="text-nowrap m-1"
  >
    Promote
  </Button>;
};

export default Promote;