import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EmployeeData = ({ employees, employeeId, dispatch, addToast }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hasDataChanged, setHasDataChanged] = useState(false);
  const employee = employees[employeeId];

  useEffect(() => {
    setName(employee.label ?? '');
    setPhone(employee.phone ?? '');
    setEmail(employee.email ?? '');
    setHasDataChanged(false);
  }, [employee.email, employee.label, employee.phone, employeeId]);

  const handleInputEvent = (stateUpdateFunc) => {
    return (event) => {
      if (!hasDataChanged) {
        setHasDataChanged(true);
      }
      stateUpdateFunc(event.target.value.trimStart());
    };
  };

  const updateEmployeeDetails = (event) => {
    event.preventDefault();
    const action = {
      type: 'UPDATE_EMPLOYEE_DETAILS',
      payload: {
        id: employeeId,
        label: name,
        phone,
        email
      },
    };

    dispatch(action);
    setHasDataChanged(false);
    addToast('Employee details updated');
  };

  return <Form>
    <Form.Group className="mb-3">
      <Form.Label>Name (required):</Form.Label>
      <Form.Control
        type="text"
        placeholder="Employee name"
        value={name}
        onChange={handleInputEvent(setName)}
        isInvalid={hasDataChanged && !name}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Phone number"
        value={phone}
        onChange={handleInputEvent(setPhone)}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email ID:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleInputEvent(setEmail)}
      />
    </Form.Group>
    <Button
      variant="primary"
      onClick={updateEmployeeDetails}
      disabled={!hasDataChanged || !name}
      type="submit"
      className="mb-3"
    >
      Save
    </Button>
  </Form>;
};

export default EmployeeData;