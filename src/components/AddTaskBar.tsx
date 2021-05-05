import React, { useState } from 'react'
import DisplayTask from '@/components/DisplayTask'
import { tasksState, completedTasksState, numOfTasks } from '@/components/AtomsState'
import { Task } from '@/components/Type'

import { Form, Input, Button, Alert, message } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'

const AddTaskBar: React.FC = () => {
    const [form] = Form.useForm()
    const [task, setTask] = useState('')
    const [completedTasks, setCompletedTasks] = useRecoilState(completedTasksState)
    const [tasks, setTasks] = useRecoilState(tasksState)
    const totalTasks = useRecoilValue(numOfTasks)

    const onSubmitForm = () => {
        if (task.length > 0) {
            const dateObj = new Date()
            const time = `Added on ${dateObj.getHours()}:${dateObj.getMinutes()}`
    
            const newTask = {
                id: Math.floor(Math.random() * 10000) + 1,
                content: task,
                time
            }
    
            setTasks([newTask, ...tasks])
            form.resetFields()
        }
        else
        {
            message.error('Please add a task')
        }
    };

    const onEditContent = (editId: number, content: string, type:string) => {
        if (type === 'finished') {
            // setTasks
            let newTasks: Task[] = JSON.parse(JSON.stringify([...tasks]))
            newTasks.map(task => {
            if (task.id === editId) {
                task.content = content
            }
            });

            setTasks(newTasks);
        }
        else if (type === 'delete') {
            // set completedTasks
            let newTasks: Task[] = JSON.parse(JSON.stringify([...completedTasks]))
            newTasks.map(task => {
            if (task.id === editId) {
                task.content = content
            }
            });

            setCompletedTasks(newTasks);
        }
    }

    const onDeleteTask = (deletedTask: Task, type: string) => {
        if (type === 'finished') {
            setTasks( tasks.filter(task => task.id !== deletedTask.id) )
            setCompletedTasks([deletedTask, ...completedTasks])
        }
        else if (type === 'delete') {
            setCompletedTasks( completedTasks.filter(completedTask => completedTask.id !== deletedTask.id) )
        }
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
            <Alert message={`Total Uncompleted Taks: ${totalTasks}`} type="info" />
            <DisplayTask onDeleteTask={onDeleteTask} onEditContent={onEditContent} />
        </React.Fragment>
    )
}

export default AddTaskBar;