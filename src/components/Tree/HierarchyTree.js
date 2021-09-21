import Section from './Section';

const HierarchyTree = (props) => {
  return <div style={{ overflow: 'scroll', maxHeight: '92vh' }}>
    <div style={{ width: 'fit-content' }}>
      <Section {...props} />
    </div>
  </div>;
};

export default HierarchyTree;