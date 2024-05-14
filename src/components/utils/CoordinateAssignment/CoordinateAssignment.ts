
interface PositionedNode {
  id: string;
  layer: number;
  x: number;
  y: number;
}

const CoordinateAssignment = (nodes: PositionedNode[]): PositionedNode[] => {
  return nodes.map(node => ({
    ...node,
    y: node.layer * 200,
    x: node.x * 200
  }));
}

export default CoordinateAssignment;
