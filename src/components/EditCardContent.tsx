import React, { useState } from 'react';
import { Button } from 'antd';

interface Task {
    id: number;
    content: string;
    time: string;
}

interface CurrEdit {
    currTask: Task;
    type: string;
}

interface EditCardContentProps {
    currEdit: CurrEdit;
    onEditContent: (editId: number, content: string, type: string) => void;
}

const EditCardContent: React.FC<EditCardContentProps> = ({ currEdit, onEditContent }) => {
    const [cardContent, setCardContent] = useState(currEdit.currTask.content);

    return (
        <div>
            <h2 className="text-xl mb-2">Edit to do activity</h2>
            <div className="flex">
                <div className="flex-1 mr-1">
                    <input
                        type="text"
                        className="w-full px-2.5 py-1 focus:outline-none rounded-md"
                        placeholder="Enter text"
                        value={cardContent}
                        onChange={ e => setCardContent(e.target.value) }
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={ () => onEditContent(currEdit.currTask.id, cardContent, currEdit.type) }
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditCardContent;