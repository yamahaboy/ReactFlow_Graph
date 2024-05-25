import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

type CustomSnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertProps['severity'];
  handleClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={5000} 
      onClose={handleClose} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
