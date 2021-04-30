import React, { useState } from 'react'
import { tasksState, completedTasksState } from '@/components/AtomsState'
import { useRecoilValue } from 'recoil'

import { MdClose } from "react-icons/md"
import { Tabs, Card, Empty, Input } from 'antd'

interface DisplayTaskProps {
    onDeleteTask: (deletedTask: {}, type: string) => void
}

const DisplayTask: React.FC<DisplayTaskProps> = ({ onDeleteTask }) => {
    const TabPane = Tabs.TabPane
    const Search = Input.Search;
    const tasks = useRecoilValue(tasksState)
    const completedTasks = useRecoilValue(completedTasksState)
    const [key, setKey] = useState('1')
    const [activeSearch, setActiveSearch] = useState(false)
    const [searchTasks, setSearchTasks] = useState<JSX.Element[]>([])
    const [searchCompletedTasks, setSearchCompletedTasks] = useState<JSX.Element[]>([])

    // create cards of tasks
    const taskList = tasks.map(task => {
        return (
            <Card key={task.id} title={task.content} extra={ <MdClose onClick={() => onDeleteTask(task, 'finished') } />} >
                {task.time}
            </Card>
        )
    })

    // create cards of finished tasks
    const finishedTasks = completedTasks.map(completedTask => {
        return (
            <Card key={completedTask.id} title={completedTask.content} extra={ <MdClose onClick={() => onDeleteTask(completedTask, 'delete') } />} >
                {completedTask.time}
            </Card>
        )
    })

    const onTabPress = (key: string) => {
        setKey(key);
        setActiveSearch(false);
    }

    const onSearchToDo = (term: string) => {
        if (key === '1') {
            setSearchTasks( tasks.filter(task => task.content.includes(term)).map(filteredTask => {
                return (
                    <Card key={filteredTask.id} title={filteredTask.content} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'finished') } />} >
                        {filteredTask.time}
                    </Card>
                )
            }) )
        }
        else if (key === '2') {
            setSearchCompletedTasks( completedTasks.filter(task => task.content.includes(term)).map(filteredTask => {
                return (
                    <Card key={filteredTask.id} title={filteredTask.content} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'delete') } />} >
                        {filteredTask.time}
                    </Card>
                )
            }) )
        }

        setActiveSearch(true)
    }

    return (
        <React.Fragment>
            <Search
                placeholder="input search text"
                onSearch={value => onSearchToDo(value)}
                enterButton
            />
            <Tabs defaultActiveKey="1" onChange={onTabPress}>
                <TabPane tab="To-do-list" key="1">
                    { activeSearch ? searchTasks : taskList }
                </TabPane>
                <TabPane tab="Completed Tasks" key="2">
                    { completedTasks.length > 0 ? (activeSearch ? searchCompletedTasks : finishedTasks) : <Empty /> }
                </TabPane>
            </Tabs>
        </React.Fragment>
    )
}

export default DisplayTask;