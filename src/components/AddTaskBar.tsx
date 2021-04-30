import React, { useState } from 'react'
import DisplayTask from '@/components/DisplayTask'
import { tasksState, numOfTasks } from '@/components/AtomsState'

import { Form, Input, Button } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'

const AddTaskBar: React.FC = () => {
    const [form] = Form.useForm()
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useRecoilState(tasksState)
    const totalTasks = useRecoilValue(numOfTasks)

    const onSubmitForm = () => {
        const dateObj = new Date()
        const time = `Added on ${dateObj.getHours()}:${dateObj.getMinutes()}`

        const newTask = {
            id: Math.floor(Math.random() * 10000) + 1,
            content: task,
            time
        }

        setTasks([newTask, ...tasks])
        form.resetFields()
    };

    const onDeleteTask = (id: number) => {
        setTasks( tasks.filter(task => task.id !== id) )
    }

    return (
        <React.Fragment>
            <Form
                name="basic"
                className="flex"
                form={form}
            >
                <Form.Item
                    label="Task"
                    name="task"
                >
                    <Input
                        placeholder="What u r going to do today"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </Form.Item>
                <Button
                    className="ml-2 text-white rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600"
                    onClick={onSubmitForm}
                >
                    Add Task
                </Button>
            </ Form>
            <div className="mb-2">Total Tasks: {totalTasks}</div>
            <DisplayTask onDeleteTask={onDeleteTask} />
        </React.Fragment>
    )
}

export default AddTaskBar;