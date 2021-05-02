import React, { useState } from 'react'
import { tasksState, completedTasksState } from '@/components/AtomsState'
import { Task } from '@/components/Type'
import Modal from '@/components/Modal'
import { useRecoilValue } from 'recoil'

import { MdClose, MdEdit } from "react-icons/md"
import { Tabs, Card, Empty, Input } from 'antd'
import EditCardContent from '@/components/EditCardContent'

interface DisplayTaskProps {
    onDeleteTask: (deletedTask: Task, type: string) => void;
    onEditContent: (editId: number, content: string, type:string) => void
}

const DisplayTask: React.FC<DisplayTaskProps> = ({ onDeleteTask, onEditContent }) => {
    const TabPane = Tabs.TabPane
    const Search = Input.Search;
    const tState = useRecoilValue(tasksState)
    const cState = useRecoilValue(completedTasksState)
    const [term, setTerm] = useState('')
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const [tab, setTab] = useState('1')
    
    const onTabPress = (key: string) => {
        setTab(key)
    }

    const onEditSubmit = (currTask: Task, type: string) => {
        const currEdit = {
            currTask,
            type
        }

        setModalContent(
            <EditCardContent currEdit={currEdit} onEditContent={onEditContent} onModalSubmit={() => setModalActive(false)} />
        )
        setModalActive(true)
    }

    const onClearSearch = (term: string) => {
        setTerm('')
    }

    return (
        <React.Fragment>
            {modalActive && (
                <Modal onCancel={() => setModalActive(false)}>
                    {modalContent}
                </Modal>
            )}
            {!modalActive && (
                <React.Fragment>
                    <Search
                        className="flex"
                        placeholder="Searching task..."
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        enterButton="Clear"
                        size="large"
                        onSearch={term => onClearSearch(term)}
                    />
                    <Tabs defaultActiveKey={tab} onChange={onTabPress}>
                        <TabPane tab="To-do-list" key="1">
                            { tState.length > 0 ?
                                (
                                    term.length === 0 ?
                                    tState.map(task => {
                                        return (
                                            <Card key={task.id} title={task.time} extra={ <MdClose onClick={() => onDeleteTask(task, 'finished') } />} >
                                                <div className='flex items-center'>
                                                    {task.content}
                                                    <MdEdit onClick={() => onEditSubmit(task, 'finished')} />
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
                                                    <MdEdit onClick={() => onEditSubmit(filteredTask, 'finished')} />
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
                                                    <MdEdit onClick={() => onEditSubmit(task, 'delete')} />
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
                                                    <MdEdit onClick={() => onEditSubmit(filteredTask, 'delete')} />
                                                </div>
                                            </Card>
                                        )
                                    })
                                )
                                : <Empty /> }
                        </TabPane>
                    </Tabs>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default DisplayTask;