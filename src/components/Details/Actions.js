import AddTeam from './AddTeam';
import ChangeTeam from './ChangeTeam';
import Promote from './Promote';
import AddMember from './AddMember';
import RemoveMember from './RemoveMember';

const Actions = ({ dispatch, employeeId, closeDetails, sections, employees, ...props }) => {
  const employee = employees[employeeId];
  const sectionId = employee.section;
  const section = sections[sectionId];

  return <div className="d-flex flex-wrap">
    {section.role !== 'ceo' && (!employee.isVacant) &&
      <Promote
        dispatch={dispatch}
        employeeId={employeeId}
        closeDetails={closeDetails}
        {...props}
      />
    }
    {section.role === 'member' && (!employee.isVacant) &&
      <ChangeTeam
        sectionId={sectionId}
        sections={sections}
        dispatch={dispatch}
        employeeId={employeeId}
        closeDetails={closeDetails}
        {...props}
      />
    }
    {['member', 'lead'].includes(section.role) &&
      <AddMember sectionId={sectionId} section={section} dispatch={dispatch} {...props} />
    }
    {section.role === 'member' &&
      <RemoveMember
        memberId={employeeId}
        dispatch={dispatch}
        closeDetails={closeDetails}
        {...props}
      />
    }
    {section.role === 'head' &&
      <AddTeam
        sectionId={sectionId}
        dispatch={dispatch}
        {...props}
      />
    }
  </div>;
};

export default Actions;