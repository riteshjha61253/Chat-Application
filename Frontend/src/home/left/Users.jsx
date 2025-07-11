import React from 'react'
import './User.css'
import Left from './Left';
import User from './user';
import useGetAllUsers from '../../context/useGetAllUsers';

function Users() {
  const[allUsers,loading]=useGetAllUsers();
  console.log("This user inside user",allUsers);
  return (
    <div>
        <h1 className="px-8 py-2 text-white text-2xl font-bold">Messages</h1>
        <div className=' py-2 flex-1 overflow-y-auto' style={{maxHeight:"calc(84vh-10vh)"}}>
          {allUsers.map((user,index)=>(
            <User key={index} user={user}/> 
          ))}
          </div>
      
    </div>
  )
}

export default Users;
