import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../services/firebase';

const NewTaskForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ux');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const tasksRef = ref(database, 'tasks');
    const newTaskRef = push(tasksRef);
    
    set(newTaskRef, {
      title,
      category,
      status: 'new',
      createdAt: Date.now(),
      member: null
    }).then(() => {
      setTitle('');
      setCategory('ux');
    }).catch(error => {
      console.error("Error adding task: ", error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2 className='form__title'>Add New Task</h2>

      <div className='form__group'>
        <label className='form__label'>Task Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className='form__input'
          required 
        />
      </div>
      <div className='form__group'>
        <label className='form__label'>Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className='form__select'>

          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
      <button type="submit" className='form__button'>Add Task</button>
    </form>
  );
};

export default NewTaskForm;