import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  Box,
  List,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { UserActionGroup } from "../../models/IUserActionProps";
import { setSelectedUser } from "../../store/reducers/FileReducer/actions";
import CloseIcon from '@mui/icons-material/Close';


const UserList: React.FC = () => {
  const { dates } = useAppSelector((state) => state.fileReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const filteredUsers = useMemo(() => {
    setLoading(true);
    const filtered = Array.isArray(dates) ? dates.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    setLoading(false);
    return filtered;
  }, [dates, searchTerm]);

  const onUserSelect = (user: UserActionGroup) => {
    dispatch(setSelectedUser(user));
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  return (
    <Box
      sx={{
        width: "300px",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#f4f4f8",
        padding: "8px",
      }}
    >
      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "10px" }}
        InputProps={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClearSearch}
                edge="end"
                sx={{
                  "&:focus": {
                    outline: "none",
                    border: "none",
                    boxShadow: "none"
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List dense>
        {loading ? (
          <CircularProgress />
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user: UserActionGroup) => (
            <Card
              key={user.userId}
              sx={{ marginBottom: "8px",   cursor:"pointer"}}
              onClick={() => onUserSelect(user)}
            
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.userName}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="textSecondary" sx={{display:"flex", justifyContent:'center'}}>No users found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default UserList;
