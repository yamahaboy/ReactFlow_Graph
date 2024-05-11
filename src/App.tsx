import readCSVFile from "./utils/readCSVFile/readCSVFile";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { setDates } from "./store/reducers/FileReducer/actions";
import groupActionsByUser from "./utils/groupActionsByUser/groupActionsByUser";

function App() {
  const dispatch = useAppDispatch()
  
useEffect(() => {
  async function loadData() {
    try {
      const actions = await readCSVFile('./data/sessions.csv');
      const serializedActions = actions.map(action => ({
        ...action,
        timestamp: new Date(action.timestamp).toISOString() 
      }));
      const groupedActions = groupActionsByUser(serializedActions);
      dispatch(setDates(groupedActions));
    } catch (error) {
      console.error('Error reading data:', error);
    }
  }

  loadData();
}, []);


  return (
    <div>
   
  </div>
  )
}

export default App
