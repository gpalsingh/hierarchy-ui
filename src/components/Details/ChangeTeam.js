import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const ChangeTeam = ({ sectionId, sections: allSections, dispatch, employeeId, closeDetails, addToast }) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    const section = allSections[sectionId];
    const teamLead = allSections[section.parent];
    const department = allSections[teamLead.parent];
    setOptions(department.subSections.filter(id => id !== section.parent).map(teamId => {
      const team = allSections[teamId];
      return {
        label: team.label,
        value: team.subSections[0],
      };
    }));
  }, [allSections, sectionId]);

  const changeTeam = (newSectionId, teamName) => {
    dispatch({
      type: 'CHANGE_TEAM',
      payload: {
        memberId: employeeId,
        newSectionId,
      },
    });

    addToast('Employee moved to ' + teamName);
    closeDetails();
  };

  return <Dropdown>
    <Dropdown.Toggle
      id="dropdown-basic"
      variant="primary"
      className="text-nowrap m-1"
    >
      Change Team
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {((!options) || options.length === 0) ?
        <Dropdown.Item>
          No other teams available
        </Dropdown.Item> :
        <>
          {options.map(option => {
            return <Dropdown.Item key={option.value} onClick={() => { changeTeam(option.value, option.label) }}>
              {option.label}
            </Dropdown.Item>;
          })}
        </>
      }
    </Dropdown.Menu>
  </Dropdown>;
};

export default ChangeTeam;