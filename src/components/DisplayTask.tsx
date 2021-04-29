import { Card, Button } from 'antd';
import React from 'react'
import { MdClose } from "react-icons/md";

const DisplayTask: React.FC = () => {
    return (
        <Card title="Read a book" extra={<MdClose onClick={() => console.log('delete task')} />} >
            Added on April 30, 21 2:30 PM
        </Card>
    )
}

export default DisplayTask;