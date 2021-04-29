import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import DisplayTask from '@/components/DisplayTask'

const AddTaskBar: React.FC = () => {
    const [form] = Form.useForm()
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState<{}[]>([])

    const onSubmitForm = () => {
        const newTask = {
            id: Math.floor(Math.random() * 10000) + 1,
            content: task
        }

        setTasks([newTask, ...tasks])
        console.log(tasks);
        form.resetFields()
      };

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
            <DisplayTask />
        </React.Fragment>
    )
}

export default AddTaskBar;