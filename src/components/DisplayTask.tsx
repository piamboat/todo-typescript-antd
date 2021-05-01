import React, { useState } from 'react'
import { tasksState, completedTasksState } from '@/components/AtomsState'
import { useRecoilValue } from 'recoil'

import { MdClose, MdEdit } from "react-icons/md"
import { Tabs, Card, Empty, Input } from 'antd'

interface Task {
    id: number;
    content: string;
    time: string;
}

interface DisplayTaskProps {
    onDeleteTask: (deletedTask: Task, type: string) => void
}

const DisplayTask: React.FC<DisplayTaskProps> = ({ onDeleteTask }) => {
    const TabPane = Tabs.TabPane
    const Search = Input.Search;
    const tState = useRecoilValue(tasksState)
    const cState = useRecoilValue(completedTasksState)
    const [term, setTerm] = useState('')

    const onTabPress = (key: string) => {
        // do something when tab is pressed
    }

    const onClearSearch = (term: string) => {
        setTerm('')
    }

    const onEditContent = (id: number, content: string, type: string) => {
        console.log('edit content')
    }

    return (
        <React.Fragment>
            <Search
                className="flex"
                placeholder="input search text"
                value={term}
                onChange={e => setTerm(e.target.value)}
                enterButton="Clear"
                size="large"
                onSearch={term => onClearSearch(term)}
            />
            <Tabs defaultActiveKey="1" onChange={onTabPress}>
                <TabPane tab="To-do-list" key="1">
                    { tState.length > 0 ?
                        (
                            term.length === 0 ?
                            tState.map(task => {
                                return (
                                    <Card key={task.id} title={task.time} extra={ <MdClose onClick={() => onDeleteTask(task, 'finished') } />} >
                                        <div className='flex items-center'>
                                            {task.content}
                                            <MdEdit onClick={() => onEditContent(task.id, task.content, 'task')} />
                                        </div>
                                    </Card>
                                )
                            })
                            :
                            tState.filter(task => task.content.includes(term)).map(filteredTask => {
                                return (
                                    <Card key={filteredTask.id} title={filteredTask.time} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'finished') } />} >
                                        <div className='flex items-center'>
                                            {filteredTask.content}
                                            <MdEdit onClick={() => onEditContent(filteredTask.id, filteredTask.content, 'task')} />
                                        </div>
                                    </Card>
                                )
                            })

                        )
                        : <Empty /> }
                </TabPane>
                <TabPane tab="Completed Tasks" key="2">
                    { cState.length > 0 ?
                        (
                            term.length === 0 ?
                            cState.map(task => {
                                return (
                                    <Card key={task.id} title={task.time} extra={ <MdClose onClick={() => onDeleteTask(task, 'delete') } />} >
                                        <div className='flex items-center'>
                                            {task.content}
                                            <MdEdit onClick={() => onEditContent(task.id, task.content, 'done')} />
                                        </div>
                                    </Card>
                                )
                            })
                            :
                            cState.filter(task => task.content.includes(term)).map(filteredTask => {
                                return (
                                    <Card key={filteredTask.id} title={filteredTask.time} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'delete') } />} >
                                        <div className='flex items-center'>
                                            {filteredTask.content}
                                            <MdEdit onClick={() => onEditContent(filteredTask.id, filteredTask.content, 'done')} />
                                        </div>
                                    </Card>
                                )
                            })
                        )
                        : <Empty /> }
                </TabPane>
            </Tabs>
        </React.Fragment>
    )
}

export default DisplayTask;