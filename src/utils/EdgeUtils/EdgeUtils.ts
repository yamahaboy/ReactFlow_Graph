import { Edge, MarkerType } from "react-flow-renderer";
import { GraphNode } from "../Sugiyama/Sugiyama";
import { UserActionGroup } from "../../models/IUserActionProps";

export const createEdges = (graphNodes: GraphNode[], selectedUser: UserActionGroup): Edge<any>[] => {

  return graphNodes.flatMap((node) => {
    return node.edges.flatMap((edge) => {
      const edgeId = `edge-${node.id}-${edge.id}`;
      const currentIndex = selectedUser?.actions.findIndex((action: any) => `node-${action.action}` === node.id);
      const targetIndex = selectedUser?.actions.findIndex((action: any) => `node-${action.action}` === edge.id);

      if (currentIndex === undefined || targetIndex === undefined) return [];

      const isReverseEdge = targetIndex < currentIndex;

      const normalEdge: Edge<any> = {
        id: edgeId,
        source: node.id,
        target: edge.id,
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#000",
        },
        labelBgStyle: { fill: 'white', fillOpacity: 0.85 },
        style: { stroke: "#000" },
      };

      if (isReverseEdge) {
        const reverseEdge: Edge<any> = {
            id: `${edgeId}-reverse`,
            source: edge.id,
            target: node.id,
            type: "customCurvedEdge",
            animated: false,
            labelBgStyle: { fill: 'white', fillOpacity: 0.85 },
            style: { stroke: "#0000FF", markerStart: "url(#redArrow)" },
            data: { angle: 135 }
          };
        return [reverseEdge, normalEdge];
      }

      return [normalEdge];
    });
  });
};
