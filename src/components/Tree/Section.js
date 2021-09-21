import Card from './Card';

const Section = ({ sectionId, ...props }) => {
  const { sections, employees, roles, handleEmployeeClick } = props;
  const sectionData = sections[sectionId];
  const role = roles[sectionData.role];
  const title = `${role.prefix} ${sectionData.label}`;
  const isMemberRole = sectionData.role === 'member';
  const { members, subSections } = sectionData;

  let backgroundColor = sectionData.color;
  // Set member card color to be lighter than team lead card's color
  if (isMemberRole) {
    const parentSection = sections[sectionData.parent];
    backgroundColor = parentSection.color;
  }

  return <div>
    <div
      className={`d-flex justify-content-space-between flex-nowrap p-4 ${isMemberRole && 'flex-column'}`}
    >
      {members && members.map((memberId, index) => {
        const memberData = employees[memberId];
        return <Card
          title={title}
          key={memberId}
          data={memberData}
          handleClick={() => { handleEmployeeClick(memberId) }}
          isLast={index + 1 === members.length}
          color={backgroundColor}
          isMemberRole={isMemberRole}
        />;
      })}
    </div>
    <div className="d-flex justify-content-around flex-nowrap">
      {subSections && subSections.map(subSectionId => {
        return <Section sectionId={subSectionId} key={subSectionId} {...props} />
      })}
    </div>
  </div>;
};

export default Section;