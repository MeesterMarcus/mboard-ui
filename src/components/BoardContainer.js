import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TaskList from './TaskList';

function BoardContainer(props) {

  const handleAddTask = (column) => {
    console.log("creating a new task for column: ", column.name);
  }

  return (
    <div style={boardContainer}>
      {props.columns.map(function (column, index) {
        return (
          <div key={index} style={boardColumn}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {column.name}
                </Typography>
              </CardContent>
              <CardActions style={{display: 'flex', justifyContent:'center'}}>
                <Button size="small" onClick={() => handleAddTask(column)}>ADD TASK</Button>
              </CardActions>
            </Card>
            <TaskList/>
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

const boardColumn = {
  flexDirection: "column",
  margin: 150,
  borderWidth: 2,
  borderRadius: 5,
  borderColor: 'lightgrey',
  borderStyle: 'solid',
  width: '100%',
  marginTop: 30,
}

export default BoardContainer;