import React, { useMemo, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
} from "react-flow-renderer";
import { Box } from "@mui/material";
import { useAppSelector } from "../../store/store";
import NodeLabel from "../NodeLabel/NodeLabel";
import CustomEdge from "../CustomEdge/CustomEdge";
import "./UserGraph.css";
import { buildGraphNodes, sugiyamaLayout } from "../../utils/Sugiyama/Sugiyama";
import UserActionList from "../UserActionList/UserActionList";
import useFetchSVG from "../../hooks/useFetchSVG";
import { createEdges } from "../../utils/EdgeUtils/EdgeUtils";

const edgeTypes = { customCurvedEdge: CustomEdge };

const UserGraph: React.FC = () => {
  const { selectedUser } = useAppSelector((state) => state.fileReducer);
  const [edgeLabels, setEdgeLabels] = useState<Map<string, string[]>>(
    new Map()
  );
  const svgContent = useFetchSVG("/src/assets/svg/custom-markers.svg");

  const graphNodes = useMemo(() => {
    if (!selectedUser) return [];
    return buildGraphNodes(selectedUser.actions);
  }, [selectedUser]);

  const positionedNodes = useMemo(() => {
    if (!graphNodes.length) return [];

    const nodes = sugiyamaLayout(graphNodes);

    return nodes.map((node) => ({
      id: node.id,
      type: "custom",
      data: {
        label: <NodeLabel id={node.id} action={node.action} />,
      },
      position: { x: node.x ?? 0, y: node.y ?? 0 },
      style: { border: "1px solid #000", borderRadius: "50%", padding: "10px" },
      className: "react-flow__node custom-node",
    }));
  }, [graphNodes]);

  const edges = useMemo(() => {
    const edgeLabels = new Map<string, string[]>();
    if (selectedUser) {
      selectedUser.actions.forEach((action, index) => {
        if (index > 0) {
          const prevAction = selectedUser.actions[index - 1].action;
          const edgeKey = `${prevAction}->${action.action}`;
          if (!edgeLabels.has(edgeKey)) {
            edgeLabels.set(edgeKey, []);
          }
          edgeLabels.get(edgeKey)?.push(`${index}`);
        }
      });
      setEdgeLabels(edgeLabels);
      return createEdges(graphNodes, selectedUser);
    }
    return [];
  }, [graphNodes, selectedUser]);

  return (
    <Box
      sx={{  width: "100%", minHeight: "2000px", minWidth: "2000px", zoom:"0.9"}}
    >
      <ReactFlowProvider>
        <ReactFlow nodes={positionedNodes} edges={edges} edgeTypes={edgeTypes}>
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
      <UserActionList userActionList={edgeLabels} />
      <div dangerouslySetInnerHTML={{ __html: svgContent }} /> 
    </Box>
  );
};

export default UserGraph;
