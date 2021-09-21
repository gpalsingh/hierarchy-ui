import Offcanvas from 'react-bootstrap/Offcanvas';
import EmployeeData from './EmployeeData';
import Actions from './Actions';

const Details = ({ employeeId, closeDetails, employees, sections, dispatch, isShown, ...props }) => {
  return <Offcanvas show={isShown} onHide={closeDetails} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Details</Offcanvas.Title>
    </Offcanvas.Header>
    {isShown &&
      <Offcanvas.Body>
        <EmployeeData
          employees={employees}
          employeeId={employeeId}
          dispatch={dispatch}
          {...props}
        />
        <Actions
          dispatch={dispatch}
          employeeId={employeeId}
          closeDetails={closeDetails}
          employees={employees}
          sections={sections}
          {...props}
        />
      </Offcanvas.Body>
    }
  </Offcanvas>;
};

export default Details;