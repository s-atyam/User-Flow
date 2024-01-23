import React, { useState } from 'react'
import profileImg from '../../assets/images/profile.png'
import { TbTrashFilled, TbEdit, TbPhoneCall  } from "react-icons/tb";

import Modal from 'react-modal'; 

Modal.setAppElement('#root')
const HOST = process.env.REACT_APP_HOST

const UserCard = ({data, getDashboardUser}) => {
    const [model,setModel] = useState(false)
    const [userData,setUserData] = useState({name:data.name,email:data.email,phone:data.phone,gender:data.gender,city:data.city,state:data.state});

    const handleEdit = () => { 
        setModel(true)
    }

    const handleDelete = async (name) => {
        let temp = window.confirm(`Do you want to delete user ${name}`)
        if(temp){
           try {
            const response = await fetch(`${HOST}/profile/delete`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'authToken':localStorage.getItem('userFlowAT'),
                    'userid':data._id
                }
            })
            if(response.status===200){
                window.alert('User is Deleted')
                getDashboardUser()
            }else{
                const responceData = await response.json()
                window.alert(responceData.error)
            }
           } catch (error) {
                console.log(error)
           }
        }
    }
    
    const handleClose = () => { 
        setModel(false)
    }

    const handleNameChange = (e) => {
        setUserData({...userData,name:e.target.value})
    }
    const handleEmailChange = (e) => {
        setUserData({...userData,email:e.target.value})
    }
    const handlePhoneChange = (e) => {
        setUserData({...userData,phone:e.target.value})
    }
    const handleGender = (e) => {
        setUserData({...userData,gender:e.target.value})
    }
    const handleCityChange = (e) => {
        setUserData({...userData,city:e.target.value})
    }
    const handleStateChange = (e) => {
        setUserData({...userData,state:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let newContext = userData;

        let pass = e.currentTarget.elements.pass.value
        if(pass!==''){
            let confirmPass = e.currentTarget.elements.confirmPass.value
            if(pass===confirmPass){
                newContext.pass = pass
            }else{
                window.alert('Password and Confirm password should be same.')
                return
            }
        }

        const response = await fetch(`${HOST}/profile/update`,{
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json',
                'authToken':localStorage.getItem('userFlowAT'),
                'userid':data._id
            },
            body: JSON.stringify(newContext)
        })
        if(response.status===200){
            window.alert('User is updated')
            getDashboardUser()
            setModel(false)
        }else{
            const responceData = await response.json()
            window.alert(responceData.error)
        }
    }
    
  return (
    <div id='userCard' className='border flex_between flex-col rounded-xl min-w-56 w-fit p-2 m-4 h-64' style={{boxShadow:  '20px 20px 60px #bebebe,-20px -20px 60px #ffffff',backgroundColor:'var(--cloud)'}}>
        <img className='h-32 w-32' src={profileImg} alt='profile'/>
        <h3 className='text-gray-700 text-sm font-medium'>{data?.name}</h3>
        <h3 className='text-gray-700 text-sm font-medium'>{data?.email}</h3>
        <div className='text-lg flex_center' ><TbPhoneCall className='mx-2 text-blue-500' /><h3 className='text-gray-500 text-sm font-medium'>{data?.phone}</h3></div>
        <div className='h-8 flex_center w-full'>
          <button onClick={handleEdit} className='button_1' ><TbEdit /></button>
          <button onClick={()=>{handleDelete(data?.name)}} className='button_1' ><TbTrashFilled /></button>
        </div>

        {/* A Model for editing the user */}
        <Modal isOpen={model} className='flex_center w-full h-full' style={{overlay:{backgroundColor:'rgba(255,255,255,0.2)',backdropFilter:'blur(3px)'} }} >
            <form onSubmit={handleSubmit} className='flex_evenly w-11/12 lg:w-1/2 p-4 lg:p-8 h-fit md:h-full py-16 flex-col' style={{backgroundColor:'var(--light-gray-color)'}}>
                <h2 className='heading_2 w-full'>Edit User</h2>
                <div className='w-full my-1'>
                  <h3 className='font-bold mb-1 text-sm'>Full Name *</h3>
                  <input id='name' type="text" placeholder='Full name' value={userData.name}  onChange={handleNameChange} className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                </div>
                <div className='w-full my-1'>
                  <h3 className='font-bold mb-1 text-sm'>Email *</h3>
                  <input id='email' type="email" placeholder='Your email' value={userData.email}  onChange={handleEmailChange} className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                </div>
                <div className='flex w-full flex-col md:flex-row my-1'>
                 <div className='w-full md:w-2/5 mr-5'>
                   <h3 className='font-bold mb-1 text-sm'>Phone *</h3>
                   <input id='phone' type="number" placeholder='Your Phone' value={userData.phone}  onChange={handlePhoneChange} className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                 </div>
                 <div className='w-full md:w-[55%] mt-2 md:mt-0 flex flex-wrap'>
                   <h3 className='font-bold text-sm w-full'>Gender *</h3>
                   <label className='mr-3 text-sm flex_center'>
                     <input className='mx-1' type="radio" checked={userData.gender==='male'} onChange={handleGender} value='male'/>
                     Male
                   </label>
                   <label className='mr-3 text-sm flex_center'>
                     <input className='mx-1' type="radio" checked={userData.gender==='female'} onChange={handleGender}  value='female' />
                     Female
                   </label>
                   <label className='mr-3 text-sm flex_center'>
                     <input className='mx-1' type="radio" checked={userData.gender==='other'} onChange={handleGender} value='other' />
                     Other
                   </label>
                 </div>
                </div>
                <div className='flex w-full flex-col md:flex-row my-1'>
                  <div className='w-full md:w-2/5 mr-5'>
                    <h3 className='font-bold mb-1 text-sm'>City *</h3>
                    <input id='city' type="text" placeholder='city' value={userData.city} onChange={handleCityChange} className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                  </div>
                  <div className='w-full md:w-2/5 mt-2 md:mt-0'>
                    <h3 className='font-bold mb-1 text-sm'>State *</h3>
                    <input id='state' type="text" placeholder='state' value={userData.state} onChange={handleStateChange} className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                  </div>
                </div>
                <div className='flex w-full flex-col md:flex-row my-1'>
                  <div className='w-full md:w-2/5 mr-5'>
                    <h3 className='font-bold mb-1 text-sm'>Password</h3>
                    <input id='pass' type="password" placeholder='Password' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                  </div>
                  <div className='w-full md:w-2/5 mt-2 md:mt-0'>
                    <h3 className='font-bold mb-1 text-sm'>Confirm Password</h3>
                    <input id='confirmPass' type="password" placeholder='Retype password' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
                  </div>
                </div>
                <div className='w-full py-3'>
                  <button type='submit' className='button_1'>Update User</button>
                  <button className='button_1' onClick={handleClose}>Cancel</button>
                </div>
                <h3 className='heading_3'>If you don't want to change the <span>password</span> you can leave it blank</h3>
            </form>
        </Modal>
    </div>
  )
}

export default UserCard