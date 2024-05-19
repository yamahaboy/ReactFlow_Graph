import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

interface UserActionListProps {
  userActionList: Map<string, string[]>;
}

const UserActionList: React.FC<UserActionListProps> = ({ userActionList }) => {
  return (
    <>
      {userActionList && (
        <Container
          style={{
            position: "absolute",
            right: "-20px",
            top: "-50px",
            width: "500px",
            backgroundColor:"#fff"
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            User Action List
          </Typography>
          <Paper elevation={3} sx={{ height: "auto" }}>
            <List>
              {Array.from(userActionList.entries()).map(
                ([action, _value], index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1} - ${action}`}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UserActionList;
