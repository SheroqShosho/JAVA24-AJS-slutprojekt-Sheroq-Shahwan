import { useState } from 'react';
import NewTaskForm from '../components/NewTaskForm';
import NewMemberForm from '../components/NewMemberForm';
import TaskBoard from '../components/TaskBoard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="dashboard">
      <div className="tabs">
        <button onClick={() => setActiveTab('tasks')}>Tasks</button>
        <button onClick={() => setActiveTab('members')}>Team Members</button>
      </div>
      
      {activeTab === 'tasks' && (
        <>
          <NewTaskForm />
          <TaskBoard />
        </>
      )}
      
      {activeTab === 'members' && (
        <NewMemberForm />
      )}
    </div>
  );
};

export default Dashboard;