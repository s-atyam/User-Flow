import React, { useState } from 'react'
import Modal from 'react-modal'; 

Modal.setAppElement('#root')

const HOST = process.env.REACT_APP_HOST

const Adduser = ({model, setModel, getDashboardUser}) => {
    const [gender,setGender] = useState('');

    const handleGender = (e) => {
        setGender(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let name=e.currentTarget.elements.name.value
        let email=e.currentTarget.elements.email.value
        let phone=e.currentTarget.elements.phone.value
        let city=e.currentTarget.elements.city.value
        let state=e.currentTarget.elements.state.value
        let pass=e.currentTarget.elements.pass.value
        let confirmPass=e.currentTarget.elements.confirmPass.value

        if(pass!==confirmPass){
          window.alert('Password does not match')
          return
        }
        const response = await fetch(`${HOST}/profile/adduser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authToken':localStorage.getItem('userFlowAT')
          },
          body:JSON.stringify({name,email,pass,phone,state,gender,city})
        })
        if(response.status===200){
            setGender('')
            window.alert('user added')
            getDashboardUser()
            setModel(false)
        }else{
            const data = await response.json();
            window.alert(data.error)
        }
    }

  return (
    <Modal isOpen={model} className='flex_center w-full h-full'>
      <form onSubmit={handleSubmit} className='flex_evenly w-11/12 lg:w-1/2 p-4 lg:p-8 h-fit md:h-full py-16 flex-col' style={{backgroundColor:'var(--light-gray-color)'}}>
        <h2 className='heading_2 w-full'>Add User</h2>

        <div className='w-full my-1'>
          <h3 className='font-bold mb-1 text-sm'>Full Name *</h3>
          <input id='name' type="text" placeholder='Full name' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
        </div>

        <div className='w-full my-1'>
          <h3 className='font-bold mb-1 text-sm'>Email *</h3>
          <input id='email' type="email" placeholder='Your email' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
        </div>

        <div className='flex w-full flex-col md:flex-row my-1'>
         <div className='w-full md:w-2/5 mr-5'>
           <h3 className='font-bold mb-1 text-sm'>Phone *</h3>
           <input id='phone' type="number" placeholder='Your Phone' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
         </div>
         <div className='w-full md:w-[55%] mt-2 md:mt-0 flex flex-wrap'>
           <h3 className='font-bold text-sm w-full'>Gender *</h3>
           <label className='mr-3 text-sm flex_center'>
             <input className='mx-1' type="radio" checked={gender==='male'} onChange={handleGender} value='male'/>
             Male
           </label>
           <label className='mr-3 text-sm flex_center'>
             <input className='mx-1' type="radio" checked={gender==='female'} onChange={handleGender}  value='female' />
             Female
           </label>
           <label className='mr-3 text-sm flex_center'>
             <input className='mx-1' type="radio" checked={gender==='other'} onChange={handleGender} value='other' />
             Other
           </label>
         </div>
        </div>

        <div className='flex w-full flex-col md:flex-row my-1'>
          <div className='w-full md:w-2/5 mr-5'>
            <h3 className='font-bold mb-1 text-sm'>City *</h3>
            <input id='city' type="text" placeholder='city' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
          </div>
          <div className='w-full md:w-2/5 mt-2 md:mt-0'>
            <h3 className='font-bold mb-1 text-sm'>State *</h3>
            <input id='state' type="text" placeholder='state' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
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
          <button type='submit' className='button_1'>Add user</button>
          <button className='button_1' onClick={()=>{setModel(false)}}>Cancel</button>
        </div>
        <h3 className='heading_3'>* Required Fields</h3>
        </form>

    </Modal>
  )
}

export default Adduser