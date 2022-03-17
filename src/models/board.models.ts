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
    status: any;
    title: string;
    description: string;
    severity: string;
    client: string;
}