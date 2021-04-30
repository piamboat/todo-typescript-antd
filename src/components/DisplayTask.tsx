import React from 'react'
import { tasksState } from '@/components/AtomsState'
import { useRecoilValue } from 'recoil'

import { MdClose } from "react-icons/md"
import { Card } from 'antd'

const DisplayTask: React.FC = ({ onDeleteTask }) => {
    const tasks = useRecoilValue(tasksState)

    const taskList = tasks.map(task => {
        return (
            <Card key={task.id} title={task.content} extra={ <MdClose onClick={() => onDeleteTask(task.id) } />} >
                {task.time}
            </Card>
        )
    })

    return (
        <React.Fragment>
            {taskList}
        </React.Fragment>
    )
}

export default DisplayTask;