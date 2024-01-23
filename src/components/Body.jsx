import React,{ useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { TbGridDots, TbX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import Adduser from './Sections/Adduser';
import UserCard from './Sections/UserCard';

const HOST = process.env.REACT_APP_HOST

const Body = () => {
 
  const navigate = useNavigate()

  const [toggle,setToggle] = useState(false)
  const [model,setModel] = useState(false)

  const [dashboardUser,setDashboardUser] = useState([])

  const handleAddUser = async () => {
    setToggle(false);
    setModel(true);
  }
  
  const handleLogout = () => {
    localStorage.removeItem('userFlowAT')
    navigate('/')
  }

  const getDashboardUser = async () => {
    const response = await fetch(`${HOST}/profile/dashuser`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken':localStorage.getItem('userFlowAT')
      }
    })
    const data = await response.json()
    if(response.status===200){
      setDashboardUser(data.user)
    }else{
      window.alert(data.error)
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem('userFlowAT')
    if(!authToken){
      navigate('/login')
    }
    
    getDashboardUser()
    
    // eslint-disable-next-line
  }, [])
  

  return (
    <section className='main_container_1 flex_center sm:flex-row flex-col'>
      {/* desktop and tablet menu */}
      <div className=' flex_between mobile_hide flex-col w-64 h-5/6'>
        <h2 className='heading_2'>UserFlow</h2>
        <div className='w-full h-fit flex_between flex-col'>
          <button onClick={()=>{handleAddUser()}} className='button_3 mb-5'>Add User</button>
        </div>
        <button onClick={handleLogout} className='button_3'>Logout</button>
      </div>

      {/* mobile menu */}
      <div className='flex_between w-full h-20 px-7 sm:hidden'>
        <h2 className='heading_2'>UserFlow</h2>
        <TbGridDots onClick={()=>{setToggle(true)}} className='text-3xl cursor-pointer text-gray-500 hover:text-gray-700' />
        {toggle && (<motion.div
          whileInView={{ x: [200, 0] }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className='fixed top-0 bottom-0 right-0 z-10 p-4 w-3/4 h-screen flex_evenly flex-col bg-white'
        >
          <TbX onClick={()=>{setToggle(false)}} className='text-3xl cursor-pointer text-gray-600' />
          <div className='main_container_1 flex_evenly flex-col shadow-inner'>
            <div className='w-full h-fit flex_between flex-col'>
              <button onClick={()=>{handleAddUser()}} className='button_3 mb-5'>Add User</button>
            </div>
            <button onClick={handleLogout} className='button_3'>Logout</button>
          </div>
          </motion.div>)}
      </div>

      {/* main area to display the user */}
      <div className='flex_center w-full h-full flex-wrap border border-gray-400' style={{backgroundColor:'var(--cloud)'}}>
        {dashboardUser.length===0 && <h1 className='heading_2'>No Data Found</h1>}
        {dashboardUser.length>0 && dashboardUser.map((e)=>{
          return <UserCard key={e?._id} data={e} getDashboardUser={getDashboardUser}/>
        })}
      </div>
      
      {/* popup box */}
      <Adduser model={model} setModel={setModel} getDashboardUser={getDashboardUser}/>
      
    </section>
  )
}

export default Body