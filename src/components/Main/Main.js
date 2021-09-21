import { useState } from 'react';
import HierarchyTree from '../Tree/HierarchyTree';
import Details from '../Details/Details';
import useData from '../../data/useData';
import TopBar from '../TopBar/TopBar';
import Toast from 'react-bootstrap/Toast';

const Main = () => {
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState();
  const [state, dispatch] = useData();
  const { sections, employees, roles } = state || {};
  const [toastContent, setToastContent] = useState();

  const closeDetails = () => {
    setSelectedEmployeeDetails(null);
  };

  const handleEmployeeClick = (id) => {
    setSelectedEmployeeDetails({ id });
  };

  if (!state) {
    return <div>loading...</div>;
  }

  return <>
    <Toast
      show={Boolean(toastContent)}
      onClose={() => setToastContent(null)}
      className="position-absolute m-3"
      style={{ zIndex: 9999 }}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Action Complete</strong>
      </Toast.Header>
      <Toast.Body>{toastContent}</Toast.Body>
    </Toast>
    <TopBar handleEmployeeClick={handleEmployeeClick} employees={employees} />
    <HierarchyTree
      sectionId="root"
      sections={sections}
      employees={employees}
      roles={roles}
      handleEmployeeClick={handleEmployeeClick}
    />
    <Details
      employeeId={selectedEmployeeDetails && selectedEmployeeDetails.id}
      closeDetails={closeDetails}
      employees={employees}
      dispatch={dispatch}
      sections={sections}
      isShown={![null, undefined].includes(selectedEmployeeDetails)}
      addToast={setToastContent}
      roles={roles}
    />
  </>;
};

export default Main;