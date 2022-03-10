import { flexbox } from '@mui/system';
import '../App.css';


function BoardContainer(props) {


  return (
    <div style={boardContainer}>
      {props.columns.map(function(column, index) {
          return <div key={index} style={boardColumn}>{column.name}</div>
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
  borderColor: 'black',
  borderStyle: 'solid',
  width: '100%',
}

export default BoardContainer;