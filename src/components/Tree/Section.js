import Card from './Card';

const Section = ({ sectionId, ...props }) => {
  const { sections, employees, roles, handleEmployeeClick } = props;
  const sectionData = sections[sectionId];
  const role = roles[sectionData.role];
  const title = `${role.prefix} ${sectionData.label}`;
  const isMemberRole = sectionData.role === 'member';
  const { members, subSections } = sectionData;
  let sectionMargins = 'mt-1 mb-1';
  let borderRadiusStyles = { borderRadius: '1rem' };

  let backgroundColor = sectionData.color;
  /**
   * Set member card's color to be lighter than team lead card's color
   * Team lead and member sections should appear to be a single section
   */
  if (isMemberRole) {
    const parentSection = sections[sectionData.parent];
    backgroundColor = parentSection.color;
    // No top margin or border radius
    sectionMargins = '';
    borderRadiusStyles = { borderRadius: '0 0 1rem 1rem' };
  } else if (sectionData.role === 'lead') {
    // No bottom margin or border radius
    sectionMargins = 'mt-1';
    borderRadiusStyles = { borderRadius: '1rem 1rem 0 0' };
  }

  return <div>
    <div
      className={`d-flex justify-content-around flex-nowrap p-4 ${sectionMargins} ${isMemberRole && 'flex-column mt-0'}`}
      style={{ background: backgroundColor + 'ad', ...borderRadiusStyles }}
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