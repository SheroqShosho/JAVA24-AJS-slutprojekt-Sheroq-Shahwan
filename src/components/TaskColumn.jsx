import React, { useState } from 'react';

const TaskColumn = ({ title, tasks, members = [], onAssign, onComplete, onDelete, showCategory, showMember }) => {
  const [selectedMember, setSelectedMember] = useState('');

  return (
    <div className="task-column">
      <h3>{title} ({tasks.length})</h3>
      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <p>Skapad: {new Date(task.createdAt).toLocaleString()}</p>
            
            {showCategory && <p>Kategori: {task.category}</p>}
            
            {title === 'Nya' && members.length > 0 && (
              <div className="assign-controls">
                <select 
                  value={selectedMember} 
                  onChange={(e) => setSelectedMember(e.target.value)}
                >
                  <option value="">Välj medlem</option>
                  {members
                    .filter(member => member.category === task.category)
                    .map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                </select>
                <button 
                  onClick={() => {
                    onAssign(task.id, selectedMember);
                    setSelectedMember('');
                  }}
                  disabled={!selectedMember}
                >
                  Tilldela
                </button>
              </div>
            )}
            
            {showMember && task.member && (
              <p>Tilldelad: {members.find(m => m.id === task.member)?.name || 'Okänd'}</p>
            )}
            
            {title === 'Pågående' && (
              <button 
                className="complete-btn"
                onClick={() => onComplete(task.id)}
              >
                Markera som klar
              </button>
            )}
            
            {title === 'Avslutade' && (
              <button 
                className="delete-btn"
                onClick={() => onDelete(task.id)}
              >
                Radera uppgift
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;