export interface IBoard {
    boardId: string;
    columns: Array<IBoardColumn>;
}

export interface IBoardColumn {
    id: string;
    name: string;
    tasks: Array<any>;
}

export interface ITaskInterface {
    id: number;
    title: string;
    description: string;
    severity: string;
    client: string;
}