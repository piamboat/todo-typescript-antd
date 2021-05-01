import React, { useState } from 'react'
import { tasksState, completedTasksState } from '@/components/AtomsState'
import { useRecoilValue } from 'recoil'

import { MdClose } from "react-icons/md"
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
                                    <Card key={task.id} title={task.content} extra={ <MdClose onClick={() => onDeleteTask(task, 'finished') } />} >
                                        {task.time}
                                    </Card>
                                )
                            })
                            :
                            tState.filter(task => task.content.includes(term)).map(filteredTask => {
                                return (
                                    <Card key={filteredTask.id} title={filteredTask.content} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'finished') } />} >
                                        {filteredTask.time}
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
                                    <Card key={task.id} title={task.content} extra={ <MdClose onClick={() => onDeleteTask(task, 'delete') } />} >
                                        {task.time}
                                    </Card>
                                )
                            })
                            :
                            cState.filter(task => task.content.includes(term)).map(filteredTask => {
                                return (
                                    <Card key={filteredTask.id} title={filteredTask.content} extra={ <MdClose onClick={() => onDeleteTask(filteredTask, 'delete') } />} >
                                        {filteredTask.time}
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