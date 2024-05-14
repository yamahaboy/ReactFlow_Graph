import { Box } from "@mui/material"
import UserList from "../../components/UserList/UserList"
import UserGraph from "../../components/UserGraph/UserGraph"

const UsersGraphPage:React.FC = () => {
    return(
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <UserList/>
            <UserGraph/>
        </Box>
    )
}

export default UsersGraphPage