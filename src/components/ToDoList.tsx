import React from 'react'
import AddTaskBar from '@/components/AddTaskBar'
import DisplayTask from '@/components/DisplayTask'

const ToDoList: React.FC = () => {
    return (
        <React.Fragment>
            <AddTaskBar />
            <DisplayTask />
        </React.Fragment>
    )
}

export default ToDoList;

