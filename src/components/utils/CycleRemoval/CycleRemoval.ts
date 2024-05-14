interface Edge {
  source: string;
  target: string;
}

interface Graph {
  nodes: string[];
  edges: Edge[];
}

const CycleRemoval = (graph: Graph): Graph => {
  const result: Edge[] = [];
  const visited: { [key: string]: boolean } = {};
  const stack: { [key: string]: boolean } = {};

  const visit = (node: string): boolean => {
    if (stack[node]) return false;
    if (visited[node]) return true;

    visited[node] = true;
    stack[node] = true;

    for (const edge of graph.edges) {
      if (edge.source === node) {
        if (!visit(edge.target)) {
          result.push({ source: edge.target, target: edge.source });
        } else {
          result.push(edge);
        }
      }
    }

    stack[node] = false;
    return true;
  }

  graph.nodes.forEach((node) => {
    if (!visited[node]) visit(node);
  });

  return { nodes: graph.nodes, edges: result };
}

export default CycleRemoval;
