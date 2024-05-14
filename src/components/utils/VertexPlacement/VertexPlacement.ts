interface LayeredNode {
  id: string;
  layer: number;
}

interface PositionedNode extends LayeredNode {
  x: number;
  y: number;
}
const VertexPlacement = (layers: LayeredNode[]): PositionedNode[] => {
  const layerMap: { [key: number]: LayeredNode[] } = {};

  layers.forEach(node => {
    if (!layerMap[node.layer]) {
      layerMap[node.layer] = [];
    }
    layerMap[node.layer].push(node);
  });

  const positioned: PositionedNode[] = [];
  Object.keys(layerMap).forEach(layer => {
    const nodes = layerMap[+layer];
    nodes.forEach((node, index) => {
      positioned.push({ ...node, x: index * 300, y: node.layer * 200 });
    });
  });

  return positioned;
}


export default VertexPlacement;
