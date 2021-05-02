export interface Task {
    id: number;
    content: string;
    time: string;
}

export interface CurrEdit {
    currTask: Task;
    type: string;
}