import React, { useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
} from "react-flow-renderer";
import { Box } from "@mui/material";
import { useAppSelector } from "../../store/store";
import NodeLabel from "../NodeLabel/NodeLabel";
import "./UserGraph.css";
import { GraphNode, sugiyamaLayout } from "../utils/Sugiyama/Sugiyama";

const UserGraph: React.FC = () => {
  const selectedUser = useAppSelector(
    (state) => state.fileReducer.selectedUser
  );

  const graphNodes: GraphNode[] = useMemo(() => {
    if (!selectedUser) return [];

    const nodes = selectedUser.actions.map((action, index) => ({
      id: `node-${index}`,
      edges: [] as GraphNode[],
      action: action.action,
      timestamp: action.timestamp,
    }));

    if (nodes.length > 1) {
      nodes.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].edges.push(nodes[i + 1]);
      }
    }


    return nodes;
  }, [selectedUser]);

  const positionedNodes = useMemo(() => {
    if (!graphNodes.length) return [];

    const nodes = sugiyamaLayout(graphNodes);

    return nodes.map((node) => ({
      id: node.id,
      type: "custom",
      data: { 
        label: <NodeLabel 
          id={parseInt(node.id.split('-')[1]) + 1} 
          action={node.action} 
        /> 
      },
      position: { x: node.x, y: node.y },
      style: { border: "none", background: "none" },
      className: "react-flow__node custom-node",
    }));
  }, [graphNodes]);

  const edges = useMemo(() => {
    const createdEdges = graphNodes.flatMap((node, index) => {
      return node.edges.map(edge => ({
        id: `edge-${index}-${edge.id.split('-')[1]}`,
        source: node.id,
        target: edge.id,
        type: "straight",
        animated: true,
      }));
    });


    return createdEdges;
  }, [graphNodes]);

  return (
    <Box
      sx={{ flex: 1, width: "100%", minHeight: "500px", minWidth: "1000px" }}
    >
      <ReactFlowProvider>
        <ReactFlow nodes={positionedNodes} edges={edges}>
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  );
};

export default UserGraph;
