import { atom, selector } from 'recoil'
import { Task } from '@/components/Type'

export const tasksState = atom({
    key: 'tasksState',
    default: <Task[]>[]
})

export const completedTasksState = atom({
    key: 'completedTasksState',
    default: <Task[]>[]
})

// use when we want to calculate one or more state to get the result
export const numOfTasks = selector({
    key: 'numOfTasks',
    get: ({get}) => {
        const tasks = get(tasksState);
        return tasks.length
    }
})