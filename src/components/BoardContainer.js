import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import TaskList from './TaskList';


function BoardContainer(props) {

  return (
    <div style={boardContainer}>
      {props.board?.columns?.map(function (column, index) {
        return (
          <div key={index} style={boardColumn}>
            <Card sx={{ minWidth: 275 }}>
              <CardHeader style={cardHeader}
              titleTypographyProps={{variant:'h6' }}
                title={column.name}
              />
              <CardContent style={cardContent}>
                <TaskList board={props.board} column={column}/>
              </CardContent>
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
}

const cardHeader = {
  backgroundColor: "#FFB329",
  color: "white",
}

const cardContent = {
  backgroundColor: '#EBECF0',
}

// const cardActions = {
//   display: 'flex', 
//   justifyContent: 'center',
// }

const boardColumn = {
  flexDirection: "column",
  margin: 50,
  minWidth: 350,
  borderWidth: 2,
  borderRadius: 5,
  height: '100%',
  borderColor: 'lightgrey',
  borderStyle: 'solid',
  marginTop: 30,
}

export default BoardContainer;