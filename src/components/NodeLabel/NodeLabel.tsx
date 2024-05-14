import { Box } from '@mui/material';
import React from 'react';
interface NodeLabelProps {
  id: number;
  action:string
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
      border: '2px solid black',
      borderRadius: '50%', 
      backgroundColor: 'white',
      transition: 'background-color 0.3s ease', 
      ':hover': {
        backgroundColor: '#f5f5f5' 
      },
      ':focus-visible': {
        backgroundColor: '#e0e0e0', 
        outline: 'none' 
      }
    }}>
      <Box sx={{fontSize:"24px"}}>{id}</Box>
      <Box sx={{fontSize:"10px"}}>{action}</Box>
    </Box>
  );
};

export default NodeLabel;
