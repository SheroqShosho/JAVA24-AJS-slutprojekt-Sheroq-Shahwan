import { useEffect, useState } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { database } from '../services/firebase';
import TaskColumn from './TaskColumn';

// Definiera TaskBoard-komponenten
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    member: 'all'
  });
  const [sortOption, setSortOption] = useState('newest');

  // Hämta uppgifter och medlemmar från Firebase-databasen
  useEffect(() => {
    const tasksRef = ref(database, 'tasks');
    const unsubscribeTasks = onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      const tasksList = tasksData ? Object.keys(tasksData).map(key => ({
        id: key,
        ...tasksData[key]
      })) : [];
      setTasks(tasksList);
    });

    // Hämta medlemmar från Firebase-databasen
    const membersRef = ref(database, 'members');
    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const membersData = snapshot.val();
      const membersList = membersData ? Object.keys(membersData).map(key => ({
        id: key,
        ...membersData[key]
      })) : [];
      setMembers(membersList);
    });

    // Rensa upp prenumerationer när komponenten avmonteras
    return () => {
      unsubscribeTasks();
      unsubscribeMembers();
    };
  }, []);

  // Hantera uppgiftsåtgärder
  const handleAssignTask = (taskId, memberId) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    update(taskRef, {
      status: 'in-progress',
      member: memberId
    });
  };

  // Hantera slutförande av uppgifter
  const handleCompleteTask = (taskId) => {
    const taskRef = ref(database, `tasks/${taskId}`);
    update(taskRef, {
      status: 'finished'
    });
  };

  // Hantera radering av uppgifter
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Är du säker på att du vill radera denna uppgift?')) {
      const taskRef = ref(database, `tasks/${taskId}`);
      remove(taskRef);
    }
  };

  // Filtrera och sortera uppgifter baserat på valda filter och sorteringsalternativ
  const filteredTasks = tasks.filter(task => {
    const categoryMatch = filters.category === 'all' || task.category === filters.category;
    const memberMatch = filters.member === 'all' || task.member === filters.member;
    return categoryMatch && memberMatch;
  });

  // Sortera uppgifter baserat på valt sorteringsalternativ
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'newest') return b.createdAt - a.createdAt;
    if (sortOption === 'oldest') return a.createdAt - b.createdAt;
    if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
    if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  // Dela upp uppgifter i olika kolumner baserat på deras status
  const newTasks = sortedTasks.filter(task => task.status === 'new');
  const inProgressTasks = sortedTasks.filter(task => task.status === 'in-progress');
  const finishedTasks = sortedTasks.filter(task => task.status === 'finished');

  // Rendera TaskBoard-komponenten
  return (
    <div className="task-board">
      <div className="filters">
        <select 
          value={filters.category} 
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="all">Alla kategorier</option>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
        
        <select 
          value={filters.member} 
          onChange={(e) => setFilters({...filters, member: e.target.value})}
        >
          <option value="all">Alla medlemmar</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
        
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Nyast först</option>
          <option value="oldest">Äldst först</option>
          <option value="title-asc">Titel (A-Ö)</option>
          <option value="title-desc">Titel (Ö-A)</option>
        </select>
      </div>
      
      <div className="columns">
        <TaskColumn 
          title="Nya" 
          tasks={newTasks} 
          members={members} 
          onAssign={handleAssignTask}
          showCategory
        />
        
        <TaskColumn 
          title="Pågående" 
          tasks={inProgressTasks} 
          members={members}
          onComplete={handleCompleteTask}
          showMember
        />
        
        <TaskColumn 
          title="Avslutade" 
          tasks={finishedTasks} 
          members={members}
          onDelete={handleDeleteTask}
          showMember
        />
      </div>
    </div>
  );
};

// Exportera TaskBoard-komponenten som standardexport
export default TaskBoard;