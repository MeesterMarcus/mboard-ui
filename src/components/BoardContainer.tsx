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
import BoardService from '../services/BoardService';

interface IBoardContainerProps {
  board: IBoard
  boardChanged: Function,
}

function BoardContainer(props: IBoardContainerProps) {

  const toUpper = (text) => {
    if (text) {
      return text.toString().toUpperCase();
    }
  }

  const saveTask = async (task) => {
    const result = await BoardService.updateTask(props.board.boardId, task);
    props.boardChanged();
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
                <TaskList saveTask={saveTask} board={props.board} column={column} boardChanged={props.boardChanged}/>
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