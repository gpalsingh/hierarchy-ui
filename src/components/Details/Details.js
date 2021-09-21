import Offcanvas from 'react-bootstrap/Offcanvas';
import EmployeeData from './EmployeeData';
import Actions from './Actions';
import EmployeeTitle from './EmployeeTitle';

const Details = ({ employeeId, closeDetails, employees, sections, dispatch, isShown, roles, ...props }) => {
  return <Offcanvas show={isShown} onHide={closeDetails} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Details</Offcanvas.Title>
    </Offcanvas.Header>
    {isShown &&
      <Offcanvas.Body>
        <EmployeeTitle
          sections={sections}
          employees={employees}
          roles={roles}
          employeeId={employeeId}
          dispatch={dispatch}
          {...props}
        />
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