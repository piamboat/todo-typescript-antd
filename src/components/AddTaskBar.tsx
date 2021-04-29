import React from 'react'
import { Form, Input, Button } from 'antd';

const AddTaskBar: React.FC = () => {
    return (
        <Form
            name="basic"
            className="flex"
        >
            <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Button
                className="ml-2 text-white rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600"
            >
                Add Task
            </Button>
        </ Form>
    )
}

export default AddTaskBar;