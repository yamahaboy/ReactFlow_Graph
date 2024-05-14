interface Edge {
  source: string;
  target: string;
}

interface PositionedNode {
  id: string;
  layer: number;
  x: number;
  y: number;
}

export function minimizeCrossings(nodes: PositionedNode[], edges: Edge[]): PositionedNode[] {
  const layerMap: { [key: number]: PositionedNode[] } = {};

  nodes.forEach(node => {
    if (!layerMap[node.layer]) {
      layerMap[node.layer] = [];
    }
    layerMap[node.layer].push(node);
  });

  Object.keys(layerMap).forEach(layer => {
    layerMap[+layer].sort((a, b) => {
      const aEdges = edges.filter(edge => edge.source === a.id || edge.target === a.id).length;
      const bEdges = edges.filter(edge => edge.source === b.id || edge.target === b.id).length;
      return aEdges - bEdges;
    });
  });

  const positioned: PositionedNode[] = [];

  Object.keys(layerMap).forEach(layer => {
    layerMap[+layer].forEach((node, index) => {
      positioned.push({ ...node, x: index, y: node.layer * 100 });
    });
  });

  return positioned;
}

export default minimizeCrossings;
