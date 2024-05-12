import { useAppSelector } from "../../store/store"

const UserList: React.FC = () => {
    const { dates } => useAppSelector((state) => state.fileReducer)
return (
    <Box sx={{ width: '100%', height: '400px', overflowY: 'auto' }}>
        <List dense>
            {dates.map((user: User) => (
                <ListItem key={user.userId}>
                    <ListItemText primary={user.userName} secondary={`Session ID: ${user.sessionId}`} />
                </ListItem>
            ))}
        </List>
    </Box>
)
}

export default UserList