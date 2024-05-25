import { Box } from '@mui/material';
import React from 'react';
interface NodeLabelProps {
  id: string;
  action: string
}

const NodeLabel: React.FC<NodeLabelProps> = (props) => {
  const { id, action } = props
  return (
    <Box sx={{
      width: '130px',
      height: '130px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <Box sx={{ fontSize: "10px" }} key={id}>{action}</Box>
    </Box>
  );
};

export default NodeLabel;
