export interface GraphNode {
  id: string;
  edges: GraphNode[];
  action: string;
  timestamp: string;
  x?: number;
  y?: number;
  layer?: number;
}

interface GraphLayer {
  nodes: GraphNode[];
}

export const sugiyamaLayout = (nodes: GraphNode[]): GraphNode[] => {
  const layers: GraphLayer[] = [];
  const visited = new Map<string, GraphNode>();

  const assignLayers = (node: GraphNode, currentLayer: number) => {
    if (visited.has(node.id)) {
      node.layer = Math.min(node.layer ?? currentLayer, currentLayer);
      return;
    }
    visited.set(node.id, node);

    if (!layers[currentLayer]) layers[currentLayer] = { nodes: [] };
    layers[currentLayer].nodes.push(node);
    node.layer = currentLayer;

    node.edges.forEach((edge) => assignLayers(edge, currentLayer + 1));
  };

  nodes.forEach((node) => assignLayers(node, 0));

  const minimizeCrossings = () => {
    layers.forEach((layer, index) => {
      if (index === 0) return;

      const orderMap = new Map<GraphNode, number>();

      layer.nodes.forEach(node => {
        const medians = node.edges.map(edge => layers[index - 1].nodes.indexOf(edge)).filter(index => index !== -1);
        const median = medians.length > 0 ? medians.sort()[Math.floor(medians.length / 2)] : -1;
        orderMap.set(node, median);
      });

      layer.nodes.sort((a, b) => (orderMap.get(a) ?? -1) - (orderMap.get(b) ?? -1));
    });
  };

  minimizeCrossings();

  const layerWidths = layers.map((layer) => layer.nodes.length);
  const maxLayerWidth = Math.max(...layerWidths);

  layers.forEach((layer, layerIndex) => {
    const offsetX = (maxLayerWidth - layer.nodes.length) * 100 / 2;
    layer.nodes.forEach((node, nodeIndex) => {
      node.x = offsetX + nodeIndex * 300;
      node.y = layerIndex * 300;
    });
  });

  return nodes;
};

export const buildGraphNodes = (actions: { action: string; timestamp: string }[]): GraphNode[] => {
  const nodesMap = new Map<string, GraphNode>();

  actions.forEach((action, index) => {
    if (!nodesMap.has(action.action)) {
      nodesMap.set(action.action, {
        id: `node-${action.action}`,
        edges: [],
        action: action.action,
        timestamp: action.timestamp,
      });
    }
    if (index > 0) {
      const prevAction = actions[index - 1].action;
      const sourceNode = nodesMap.get(prevAction);
      const targetNode = nodesMap.get(action.action);

      if (sourceNode && targetNode && !sourceNode.edges.includes(targetNode)) {
        sourceNode.edges.push(targetNode);
      }
    }
  });

  return Array.from(nodesMap.values());
};
