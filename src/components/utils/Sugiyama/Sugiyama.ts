import CoordinateAssignment from "../CoordinateAssignment/CoordinateAssignment";
import CrossingMinimization from "../CrossingMinimization/CrossingMinimization";
import CycleRemoval from "../CycleRemoval/CycleRemoval";
import LayerAssignment from "../LayerAssignment/LayerAssignment";
import VertexPlacement from "../VertexPlacement/VertexPlacement";

export interface GraphNode {
  id: string;
  edges: GraphNode[];
  action: string;
  timestamp: string;
}

interface LayeredNode {
  id: string;
  layer: number;
}

interface PositionedNode extends LayeredNode {
  x: number;
  y: number;
  action: string;
}

export function sugiyamaLayout(graph: GraphNode[]): PositionedNode[] {
  const layered = LayerAssignment(graph);

  const edges = graph.flatMap(node => node.edges.map(edge => ({ source: node.id, target: edge.id })));
  const graphObj = { nodes: graph.map(node => node.id), edges };
  const acyclicGraph = CycleRemoval(graphObj);

  const placed = VertexPlacement(layered).map(node => ({
    ...node,
    action: graph.find(n => n.id === node.id)?.action || "",
  }));

  const minimized = CrossingMinimization(placed, acyclicGraph.edges);

  const positioned = CoordinateAssignment(minimized).map(node => ({
    ...node,
    action: placed.find(n => n.id === node.id)?.action || "",
  }));


  return positioned;
}
