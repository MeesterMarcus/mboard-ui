import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import TaskList from './TaskList';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


function BoardContainer(props) {

  const [taskCount, setTaskCount] = useState(0);

  const handleAddTask = (column) => {
    console.log("creating a new task for column: ", column.name);
    console.log(column);
    column.tasks.push({
      id: uuidv4(),
      title: "test"
    });
    setTaskCount(prev => prev + 1);
  }

  return (
    <div style={boardContainer}>
      {props.columns.map(function (column, index) {
        return (
          <div key={index} style={boardColumn}>
            <Card sx={{ minWidth: 275 }}>
              <CardHeader style={cardHeader}
                title={column.name}
              />
              <CardContent style={cardContent}>
                <TaskList tasks={column.tasks}/>
              </CardContent>
              <CardActions style={cardActions}>
                <Button size="small" onClick={() => handleAddTask(column)}>ADD TASK</Button>
              </CardActions>
            </Card>
          </div>
        )
      })}
    </div>
  );
}

// styles
const boardContainer = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: "flex-start",
}

const cardHeader = {
  backgroundColor: "#FFB329",
  color: "white",
}

const cardContent = {
  backgroundColor: '#EBECF0',
}

const cardActions = {
  display: 'flex', 
  justifyContent: 'center',
}

const boardColumn = {
  flexDirection: "column",
  margin: 150,
  borderWidth: 2,
  borderRadius: 5,
  height: '100%',
  borderColor: 'lightgrey',
  borderStyle: 'solid',
  width: '100%',
  marginTop: 30,
}

export default BoardContainer;