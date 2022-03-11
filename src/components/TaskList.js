import { useEffect } from 'react';
import '../App.css';


function TaskList(props) {

  const openTask = (task) => {
    console.log(task);
  };

  useEffect(() => {

  }, [props.tasks])

 
  return (
    <div style={taskListContainer}>
      {props.tasks?.map((task) => {
        return (
          <div onClick={() => openTask(task)} key={task.id} style={taskContainer}>
            <span style={task}>{task.title}</span>
          </div>
        )
      })}
    </div>
  );
}

// styles
const taskListContainer = { 
  margin: 15,
  backgroundColor: '#EBECF0',
}

const taskContainer = {
  borderWidth: 2, 
  borderRadius: 8,
  borderStyle: 'solid', 
  borderColor: '#EBECF0', 
  backgroundColor: 'white',
  cursor: 'pointer',
  margin: 5,
  padding: 15,
}


export default TaskList;