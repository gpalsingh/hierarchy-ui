import Card from 'react-bootstrap/Card';

const EmployeeCard = ({ data, title, handleClick, isLast, color, isMemberRole }) => {
  /**
   * Member cards show as light colored versions of team leader cards
   * Vacant positions show as even lighter versions
   */
  const styles = {
    backgroundColor: `${color}${data.isVacant ? '1a' : (isMemberRole ? '80' : '')}`,
    mixBlendMode: 'difference',
    color: 'white',
  };

  if (data.isVacant) {
    styles.borderStyle = 'dotted';
    styles.borderRadius = '0.25rem';
  }

  return <Card
    style={{
      width: '15rem',
      cursor: 'pointer',
      marginBottom: `${isLast ? 0 : 1.5 * 2}rem`
    }}
    onClick={handleClick}
  >
    <Card.Body style={styles}>
      <Card.Title>
        <h6>{data.isVacant ? '[Open Position]' : data.label}</h6>
      </Card.Title>
      <Card.Text>
        {title}
      </Card.Text>
    </Card.Body>
  </Card>;
};

export default EmployeeCard;