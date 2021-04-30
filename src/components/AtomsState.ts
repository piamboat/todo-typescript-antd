import { atom, selector } from 'recoil'

export const tasksState = atom({
    key: 'tasksState',
    default: <{}[]>[]
})

export const completedTasksState = atom({
    key: 'completedTasksState',
    default: <{}[]>[]
})

// use when we want to calculate one or more state to get the result
export const numOfTasks = selector({
    key: 'numOfTasks',
    get: ({get}) => {
        const tasks = get(tasksState);
        return tasks.length
    }
})