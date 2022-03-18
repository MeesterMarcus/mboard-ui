import { IBoard, IBoardColumn, ITaskInterface } from "../models/board.models";

const API_URL = process.env.REACT_APP_API_URL;

enum ENDPOINT {
    BOARD = 'board',
    BOARD_COLUMNS = 'board/columns',
    BOARD_TASKS = 'board/tasks',
};

class BoardService {
    public static async test() {
        let data;
        console.log(API_URL);
        try {
            const result = await fetch(`${API_URL}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async createBoard(board: IBoard) {
        let data;
        try {
            const result = await fetch(
                `${API_URL}/${ENDPOINT.BOARD}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(board),
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async insertColumn(boardId: string, column: IBoardColumn) {
        console.log('boardId: ', boardId);
        console.log('boardColumn: ', column);
        let data;
        try {
            const result = await fetch(
                `${API_URL}/${ENDPOINT.BOARD_COLUMNS}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({boardId: boardId, column: column}),
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async insertTask(boardId: string, columnId: string, task: ITaskInterface) {
        console.log('boardId: ', boardId);
        console.log('columnId: ', columnId);
        console.log('task:', task);
        let data;
        try {
            const result = await fetch(
                `${API_URL}/${ENDPOINT.BOARD_TASKS}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({boardId: boardId, columnId: columnId, task: task}),
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async updateTask(boardId: string, task: ITaskInterface) {
        console.log('task:', task);
        let data;
        try {
            const result = await fetch(
                `${API_URL}/${ENDPOINT.BOARD_TASKS}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({boardId: boardId, task: task}),
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async deleteTask(boardId: string, task: ITaskInterface) {
        console.log('task:', task);
        let data;
        try {
            const result = await fetch(
                `${API_URL}/${ENDPOINT.BOARD_TASKS}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({boardId: boardId, task: task}),
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }

    public static async getBoard(boardId: string) {
        let data;
        try {
            const result = await fetch(`${API_URL}/${ENDPOINT.BOARD}?boardId=${boardId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            data = await result.json();
        } catch (error: any) {
            console.log(error);
        }
        return data;
    }


}

export default BoardService;