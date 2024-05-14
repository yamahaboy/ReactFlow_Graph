interface GraphNode {
  id: string;
  edges: GraphNode[];
}

interface LayeredNode {
  id: string;
  layer: number;
}

const LayerAssignment = (nodes: GraphNode[]): LayeredNode[] => {
  const inDegree: { [key: string]: number } = {};
  const layers: LayeredNode[] = [];
  const queue: GraphNode[] = [];

  nodes.forEach(node => {
    inDegree[node.id] = 0;
  });

  nodes.forEach(node => {
    node.edges.forEach(edge => {
      inDegree[edge.id]++;
    });
  });

  nodes.forEach(node => {
    if (inDegree[node.id] === 0) {
      queue.push(node);
    }
  });

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) continue;

    const layer = layers.find(n => n.id === node.id)?.layer || 0;
    layers.push({ id: node.id, layer });

    node.edges.forEach(edge => {
      inDegree[edge.id]--;
      if (inDegree[edge.id] === 0) {
        queue.push(edge);
        layers.push({ id: edge.id, layer: layer + 1 });
      }
    });
  }

  return layers;
}

export default LayerAssignment;
