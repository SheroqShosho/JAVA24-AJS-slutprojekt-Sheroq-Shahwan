import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../services/firebase';

// Definiera NewMemberForm-komponenten
const NewMemberForm = () => {
  // State för att hantera formulärdata
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ux');
  
  // Hantera formulärinlämning
  const handleSubmit = (e) => {
    e.preventDefault();

    // Referens till 'members' i Firebase-databasen
    const membersRef = ref(database, 'members');
    const newMemberRef = push(membersRef);
    // Sätt värdena för det nya medlemmen
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

  // Rendera formuläret
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

// Exportera NewMemberForm-komponenten som standardexport
export default NewMemberForm;