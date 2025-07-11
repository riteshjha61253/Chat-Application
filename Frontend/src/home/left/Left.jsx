import React from 'react'
import Search from './Search'
import User from './Users'
import Users from './Users'

function Left() {
  return (
    <div className="w-[30%] border border-black bg-black text-white ">
      <Search />
      <div className='flex-1 overflo-y-scroll' style={{minHeight:"calc(84vh-10vh)",maxHeight:"85vh",overflowY:"scroll"}}>
       <Users />
      </div>
      
    </div>
  )
}

export default Left