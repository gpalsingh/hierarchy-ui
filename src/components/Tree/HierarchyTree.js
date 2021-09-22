import Section from './Section';

const HierarchyTree = (props) => {
  // Show all the sections in a scrollable div
  return <div style={{ overflow: 'scroll', maxHeight: '92vh' }}>
    <div style={{ width: 'fit-content' }}>
      <Section {...props} />
    </div>
  </div>;
};

export default HierarchyTree;