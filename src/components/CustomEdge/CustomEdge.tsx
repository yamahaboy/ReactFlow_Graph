import React from 'react';
import { EdgeProps } from 'react-flow-renderer';

interface CustomEdgeProps extends EdgeProps {
  angle?: number;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
  angle = 130, 
}) => {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const rad = (angle * Math.PI) / 180;
  const controlX = midX + distance * Math.cos(rad) * 0.5;
  const controlY = midY + distance * Math.sin(rad) * 0.5;

  const edgePath = `
    M${sourceX},${sourceY}
    Q${controlX},${controlY} ${targetX},${targetY}
  `;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default CustomEdge;
