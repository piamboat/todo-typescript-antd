import React, { useState } from 'react'
import DisplayTask from '@/components/DisplayTask'
import { tasksState } from '@/components/AtomsState'

import { Form, Input, Button } from 'antd'
import { useRecoilState } from 'recoil'

const AddTaskBar: React.FC = () => {
    const [form] = Form.useForm()
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useRecoilState(tasksState)

    const onSubmitForm = () => {
        const newTask = {
            id: Math.floor(Math.random() * 10000) + 1,
            content: task
        }

        setTasks([newTask, ...tasks])
        form.resetFields()
    };

    const onDeleteTask = (id) => {
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
            <DisplayTask onDeleteTask={onDeleteTask} />
        </React.Fragment>
    )
}

export default AddTaskBar;