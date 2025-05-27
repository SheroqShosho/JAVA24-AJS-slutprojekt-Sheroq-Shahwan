import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../services/firebase';

const NewMemberForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ux');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const membersRef = ref(database, 'members');
    const newMemberRef = push(membersRef);
    
    set(newMemberRef, {
      name,
      category
    }).then(() => {
      setName('');
      setCategory('ux');
    }).catch(error => {
      console.error("Error adding member: ", error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2 className='form__title'>Add New Team Member</h2>
      
      <div className='form__group'>
        <label className='form__label'>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className='form__input'
        />
      </div>
      <div className='form__group'>
        <label className='form__label'>Role:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='form__select'>
          <option value="UX">UX Designer</option>
          <option value="Frontend">Frontend Developer</option>
          <option value="Backend">Backend Developer</option>
        </select>
      </div>
      <button type="submit" className='form__button'>Add Member</button>
    </form>
  );
};

export default NewMemberForm;