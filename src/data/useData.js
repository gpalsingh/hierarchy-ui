import { useEffect, useReducer } from "react";

// Used to create colors for each section
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const defaultRoles = {
  "ceo": {
    "label": "CEO",
    "prefix": "CEO of"
  },
  "head": {
    "label": "Head",
    "prefix": "Head of"
  },
  "lead": {
    "label": "Team Lead",
    "prefix": "Team lead of"
  },
  "member": {
    "label": "Team Member",
    "prefix": "Team member of"
  }
};

const defaultSections = {
  "1": {
    "label": "First team",
    "color": "#4A2947",
    "members": [
      6
    ],
    "role": "lead",
    "parent": 3,
    "subSections": [
      9
    ]
  },
  "2": {
    "label": "HR",
    "color": "#4E7DBD",
    "role": "head",
    "members": [
      2
    ],
    "subSections": [
      5,
      7
    ],
    "parent": "root"
  },
  "3": {
    "label": "Engineering",
    "color": "#4F822D",
    "role": "head",
    "members": [
      10
    ],
    "subSections": [
      1
    ],
    "parent": "root"
  },
  "4": {
    "label": "Design",
    "color": "#1D54D2",
    "role": "head",
    "members": [
      4
    ],
    "subSections": [
      10,
      12
    ],
    "parent": "root"
  },
  "5": {
    "label": "Team 1",
    "color": "#09AE03",
    "role": "lead",
    "members": [
      9
    ],
    "subSections": [
      6
    ],
    "parent": 2
  },
  "6": {
    "label": "Team 1",
    "members": [
      5,
      3,
      8
    ],
    "role": "member",
    "parent": 5
  },
  "7": {
    "label": "Team 2",
    "color": "#C4BD0C",
    "role": "lead",
    "members": [
      11
    ],
    "subSections": [
      8
    ],
    "parent": 2
  },
  "8": {
    "label": "Team 2",
    "members": [
      12,
      13
    ],
    "role": "member",
    "parent": 7
  },
  "9": {
    "label": "First team",
    "members": [
      7
    ],
    "role": "member",
    "parent": 1,
    "subSections": []
  },
  "10": {
    "label": "First team",
    "color": "#B1347E",
    "members": [
      14
    ],
    "role": "lead",
    "parent": 4,
    "subSections": [
      11
    ]
  },
  "11": {
    "label": "First team",
    "members": [
      15
    ],
    "role": "member",
    "parent": 10,
    "subSections": []
  },
  "12": {
    "label": "Team Two",
    "color": "#C4BD0C",
    "members": [
      16
    ],
    "role": "lead",
    "parent": 4,
    "subSections": [
      13
    ]
  },
  "13": {
    "label": "Team Two",
    "members": [
      19,
      18,
      17
    ],
    "role": "member",
    "parent": 12,
    "subSections": []
  },
  "root": {
    "label": "Company",
    "color": "#ABBF26",
    "role": "ceo",
    "members": [
      1
    ],
    "subSections": [
      2,
      3,
      4
    ],
    "parent": null
  }
};

const defaultEmployees = {
  "1": {
    "label": "Patrick Holman",
    "section": "root",
    "phone": "",
    "email": ""
  },
  "2": {
    "label": "Sofie Bates",
    "section": 2,
    "phone": "",
    "email": ""
  },
  "3": {
    "label": "Arisha Lambert",
    "section": 6,
    "phone": "",
    "email": ""
  },
  "4": {
    "label": "Abdirahman Barlow",
    "section": 4,
    "phone": "",
    "email": ""
  },
  "5": {
    "label": "Alice Watkins",
    "section": 6,
    "phone": "",
    "email": ""
  },
  "6": {
    "label": "Zeenat Beil",
    "section": 1,
    "phone": "",
    "email": ""
  },
  "7": {
    "label": "Dougie Villanueva",
    "section": 9,
    "phone": "",
    "email": ""
  },
  "8": {
    "label": "Fearne Macias",
    "section": 6,
    "phone": "",
    "email": ""
  },
  "9": {
    "label": "Arwen Fisher",
    "section": 5,
    "phone": "",
    "email": ""
  },
  "10": {
    "label": "Klara Blair",
    "section": 3,
    "phone": "",
    "email": ""
  },
  "11": {
    "label": "Marissa Finch",
    "section": 7,
    "phone": "",
    "email": ""
  },
  "12": {
    "label": "Maja Armitage",
    "section": 8,
    "phone": "",
    "email": ""
  },
  "13": {
    "label": "Humzah Townsend",
    "section": 8,
    "phone": "",
    "email": ""
  },
  "14": {
    "label": "Byron Lindsay",
    "section": 10,
    "phone": "",
    "email": ""
  },
  "15": {
    "label": "Asa Robins",
    "section": 11,
    "phone": "",
    "email": ""
  },
  "16": {
    "label": "Henley Harding",
    "section": 12,
    "phone": "",
    "email": ""
  },
  "17": {
    "label": "Chelsea Marin",
    "section": 13,
    "phone": "",
    "email": ""
  },
  "18": {
    "label": "Pamela Beard",
    "section": 13,
    "phone": "",
    "email": ""
  },
  "19": {
    "label": "Lindsey Mendoza",
    "section": 13,
    "phone": "",
    "email": ""
  }
};

const createEmployeeSlot = (state) => {
  let i = 1;
  while (state.employees[i]) {
    i++;
  }

  const data = {
    isVacant: true,
  };

  return [i, data];
};

const cloneState = (state) => {
  return JSON.parse(JSON.stringify(state));
};

const addMember = (state, payload) => {
  const { sectionId } = payload;

  const newState = cloneState(state);

  const [memberId, memberData] = createEmployeeSlot(state);
  newState.employees[memberId] = memberData;
  memberData.section = sectionId;

  const membersList = newState?.sections[sectionId]?.members;

  if (membersList) {
    membersList.unshift(memberId);
  }

  return newState;
};

const changeTeam = (state, payload) => {
  const { memberId, newSectionId } = payload;
  const newState = cloneState(state);
  const memberData = newState.employees[memberId];
  const prevSectionId = memberData.section;
  const [prevSection, newSection] = [prevSectionId, newSectionId].map(sectionId => {
    return newState.sections[sectionId];
  });

  // Team must have at least one team lead and team member
  if (prevSection.members.length < 2) {
    // Add open position in place
    const [newEmployeeId, newEmployee] = createEmployeeSlot(newState);
    prevSection.members[0] = newEmployeeId;
    newEmployee.section = prevSectionId;
    newState.employees[newEmployeeId] = newEmployee;
  } else {
    // Remove entry from previous team
    const prevMemberIndex = prevSection.members.findIndex(id => id === memberId);
    prevSection.members.splice(prevMemberIndex, 1);
  }

  /**
   * Add entry to new team
   * If there is an open position fill it first
   */
  const openPositionIndex = newSection.members.findIndex(id => newState.employees[id].isVacant);
  if (openPositionIndex >= 0) {
    const openPositionId = newSection.members[openPositionIndex];
    newSection.members[openPositionIndex] = memberId;
    delete newState.employees[openPositionId];
  } else {
    newSection.members.push(memberId);
  }

  // Update employee
  newState.employees[memberId].section = newSectionId;

  return newState;
};

const removeTeamMember = (state, payload) => {
  const { memberId } = payload;
  const newState = cloneState(state);

  // Remove member from team
  const member = newState.employees[memberId];
  const section = newState.sections[member.section];
  // Team must have at least one team lead and team member
  if (section.members.length < 2) {
    // Replace with vacant position
    newState.employees[memberId] = {
      section: newState.employees[memberId].section,
      isVacant: true,
    };
  } else {
    // Remove employee
    const memberIndex = section.members.findIndex(id => id === memberId);
    section.members.splice(memberIndex, 1);
    delete newState.employees[memberId];
  }

  return newState;
};

const updateEmployeeDetails = (state, payload) => {
  const { id, label, phone, email } = payload;
  const newState = cloneState(state);

  newState.employees[id] = {
    ...newState.employees[id],
    label,
    phone,
    email,
    isVacant: false,
  };

  return newState;
};

const addNewTeam = (state, payload) => {
  const { sectionId, name } = payload;
  const newState = cloneState(state);

  // Create IDs for new sections
  let teamSectionId = 1;
  while (newState.sections[teamSectionId]) {
    teamSectionId++;
  }

  let memberSectionId = teamSectionId + 1;
  while (newState.sections[memberSectionId]) {
    memberSectionId++;
  }

  // Create team lead section
  const [teamLeadId, teamLeadData] = createEmployeeSlot(newState);
  teamLeadData.section = teamSectionId;
  newState.employees[teamLeadId] = teamLeadData;
  newState.sections[teamSectionId] = {
    label: name,
    members: [teamLeadId],
    role: 'lead',
    parent: sectionId,
    subSections: [memberSectionId],
    color: getRandomColor(),
  };

  // Add entry to parent section
  const section = newState.sections[sectionId];
  section.subSections.unshift(teamSectionId);

  // Create team member section
  const [memberId, memberData] = createEmployeeSlot(newState);
  newState.employees[memberId] = memberData;
  memberData.section = memberSectionId;

  newState.sections[memberSectionId] = {
    label: newState.sections[teamSectionId].label,
    members: [memberId],
    role: 'member',
    parent: teamSectionId,
    subSections: [],
  };


  return newState;
};

const promoteEmployee = (state, payload) => {
  const { employeeId } = payload;

  if (state.sections.root.members.includes(employeeId)) {
    // CEO cannot be promoted. Make no changes
    return state;
  }

  const newState = cloneState(state);
  const employee = newState.employees[employeeId];
  const lowerSectionId = employee.section;
  const lowerSection = newState.sections[lowerSectionId];
  const upperSection = newState.sections[lowerSection.parent];
  const prevHeadId = upperSection.members[0];

  // Update details with promoted employee
  upperSection.members = [employeeId];
  employee.section = lowerSection.parent;

  // Handle previous position
  const memberIndex = lowerSection.members.findIndex(id => id === employeeId);
  if (lowerSection.role === 'member' && lowerSection.members.length > 1) {
    // Just remove the employee from team
    lowerSection.members.splice(memberIndex, 1);
    // Delete employee who is being replaced
    delete newState.employees[prevHeadId];
  } else {
    /**
     * Replace with an empty employee node to maintain structure
     * ID of the employee being removed can be reused as it is considered deleted
     */
    lowerSection.members[memberIndex] = prevHeadId;
    newState.employees[prevHeadId] = {
      section: lowerSectionId,
      isVacant: true,
    }
  }

  return newState;
};

const parseInitialState = (payload) => {
  if (typeof payload === 'string') {
    return JSON.parse(payload);
  }

  return payload;
};

const updateSectionName = (state, payload) => {
  const { sectionId, newName } = payload;

  const newState = cloneState(state);

  const sectionsAffected = [sectionId];
  const section = newState.sections[sectionId];

  // Lead and member sections should have same label
  if (section.role === 'lead') {
    sectionsAffected.push(section.subSections[0]);
  } else if (section.role === 'member') {
    sectionsAffected.push(section.parent);
  }

  sectionsAffected.forEach(secId => {
    newState.sections[secId].label = newName;
  });

  return newState;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return addMember(state, action.payload);
    case 'CHANGE_TEAM':
      return changeTeam(state, action.payload);
    case 'REMOVE_MEMBER':
      return removeTeamMember(state, action.payload);
    case 'UPDATE_EMPLOYEE_DETAILS':
      return updateEmployeeDetails(state, action.payload);
    case 'ADD_NEW_TEAM':
      return addNewTeam(state, action.payload);
    case 'PROMOTE_EMPLOYEE':
      return promoteEmployee(state, action.payload);
    case 'INITIALIZE':
      return parseInitialState(action.payload);
    case 'UPDATE_SECTION_NAME':
      return updateSectionName(state, action.payload);
    default:
      throw new Error('Unknown action');
  }
};

const useData = () => {
  const [treeState, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    if (!treeState) {
      // Get state from storage
      const savedState = localStorage.getItem('TREE_STATE');
      dispatch({
        type: 'INITIALIZE',
        payload: savedState || {
          roles: defaultRoles,
          sections: defaultSections,
          employees: defaultEmployees,
        },
      })
    } else {
      // Save latest state
      localStorage.setItem('TREE_STATE', JSON.stringify(treeState));
    }
  }, [treeState]);

  return [treeState, dispatch];
};

export default useData;