import React from 'react'
import AddTaskBar from '@/components/AddTaskBar';

import { PageHeader } from 'antd';

export default function Home() {
  return (
    <div className="align-middle">
        <div className="p-5">
            <div className="w-full px-2.5 py-1 border focus:outline-none rounded-md min-h-screen">
              <PageHeader
                className="mb-2"
                title="DayTech"
                subTitle="To do list"
              />
              <div className="p-5">
                  <AddTaskBar />
              </div>
            </div>
        </div>
    </div>
  );
}