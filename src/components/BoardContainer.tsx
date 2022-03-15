//Third-party
import React from 'react';
import { CSSProperties } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent 
} from '@mui/material';

//First-party
import '../App.css';
import TaskList from './TaskList';
import { IBoard } from '../models/board.models';

interface IBoardContainerProps {
  board: IBoard
}

function BoardContainer(props: IBoardContainerProps) {

  const toUpper = (text) => {
    if (text) {
      console.log(text);
      return text.toString().toUpperCase();
    }
  }

  const saveTask = (task) => {
    //we need to do a query to save task updates to db
  }

  return (
    <div style={boardContainer}>
      {props.board?.columns?.map(function (column, index) {
        return (
          <div key={index} style={boardColumn}>
            <Card sx={{ minWidth: 275 }}>
              <CardHeader style={cardHeader}
              titleTypographyProps={{variant:'h6' }}
                title={toUpper(column.name)}
              />
              <CardContent style={cardContent}>
                <TaskList saveTask={saveTask} board={props.board} column={column}/>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  );
}

// styles
const boardContainer: CSSProperties = {
  display: 'flex',
}

const cardHeader: CSSProperties = {
  backgroundColor: "#FFB329",
  color: "white",
}

const cardContent: CSSProperties = {
  backgroundColor: '#EBECF0',
}

const boardColumn: CSSProperties = {
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