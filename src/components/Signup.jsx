import React,{ useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const HOST = process.env.REACT_APP_HOST

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      gender:'',
      howHeard: [],
      city: 'Mumbai'
    });

    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      const isChecked = event.target.checked;
  
      setFormData((prevData) => {
        if (isChecked) {
          return { ...prevData, howHeard: [...prevData.howHeard, value] };
        } else {
          return {
            ...prevData,
            howHeard: prevData.howHeard.filter((item) => item !== value),
          };
        }
      });
      console.log(formData.howHeard)
    };

    const handleGender = (e) =>{
      setFormData({...formData,gender:e.target.value})
    }

    const handleDropdownChange = (event) => {
      setFormData({ ...formData, city: event.target.value });
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault()
      let name=e.currentTarget.elements.name.value
      let email=e.currentTarget.elements.email.value
      let phone=e.currentTarget.elements.phone.value
      let state=e.currentTarget.elements.state.value
      let pass=e.currentTarget.elements.pass.value
      let confirmPass=e.currentTarget.elements.confirmPass.value

      if(pass!==confirmPass){
        window.alert('Password does not match')
        return
      }

      const response = await fetch(`${HOST}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,email,pass,phone,state,gender:formData.gender,source:formData.howHeard,city:formData.city})
      })
      const data = await response.json();
      if('error' in data){
        window.alert(data.error)
        return
      }else{
        localStorage.setItem('userFlowAT',data.authToken)
        navigate('/user')
      }
    }

  return (
    <section className='main_container_1 flex_center flex-col'>
      <div className='main_container_2 flex_center'>
        <div className='flex_evenly mobile_hide w-1/2 h-full flex-col' style={{backgroundColor:'var(--purple-gray)'}}>
          <h1 className='heading_1' style={{fontWeight:'500',color:'white'}}>SIGNUP</h1>
          <h1 className='heading_1 text-center' style={{color:'gray'}}>Start your journey <br/> <span>Today</span> </h1>
        </div>
        <form onSubmit={handleSubmit} className='flex_evenly w-11/12 lg:w-1/2 p-4 lg:p-8 h-fit md:h-full py-16 flex-col' style={{backgroundColor:'var(--light-gray-color)'}}>
          <h2 className='heading_2 w-full'>Create an account</h2>
          <div className='w-full my-1'>
            <h3 className='font-bold mb-1 text-sm'>Full Name</h3>
            <input id='name' type="text" placeholder='Full name' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
          </div>
          <div className='w-full my-1'>
            <h3 className='font-bold mb-1 text-sm'>Your Email</h3>
            <input id='email' type="email" placeholder='Your email' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
          </div>
          <div className='flex w-full flex-col md:flex-row my-1'>
           <div className='w-full md:w-2/5 mr-5'>
             <h3 className='font-bold mb-1 text-sm'>Your Phone</h3>
             <input id='phone' type="number" placeholder='Your Phone' className='p-2 w-full rounded-lg outline-none text-sm text-gray-300 font-medium' style={{backgroundColor:'var(--purple-gray)'}} />
           </div>
           <div className='w-full md:w-[55%] mt-2 md:mt-0 flex flex-wrap'>
             <h3 className='font-bold text-sm w-full'>Gender</h3>
             <label className='mr-3 text-sm flex_center'>
               <input className='mx-1' type="radio" checked={formData.gender==='male'} onChange={handleGender} value='male'/>
               Male
             </label>
             <label className='mr-3 text-sm flex_center'>
               <input className='mx-1' type="radio" checked={formData.gender==='female'} onChange={handleGender}  value='female' />
               Female
             </label>
             <label className='mr-3 text-sm flex_center'>
               <input className='mx-1' type="radio" checked={formData.gender==='other'} onChange={handleGender} value='other' />
               Other
             </label>
           </div>
          </div>
          <div className='w-full my-2'>
            <h3 className='font-bold mb-1 text-sm'>How did you hear about this?</h3>
            <div className='flex flex-wrap'>
              <label className='mr-3 text-sm flex_center'>
                <input className='mx-1' type="checkbox" value="LinkedIn" checked={formData.howHeard.includes('LinkedIn')} onChange={handleCheckboxChange} />
                LinkedIn
              </label>
              <label className='mr-3 text-sm flex_center'>
                <input className='mx-1' type="checkbox" value="Friends" checked={formData.howHeard.includes('Friends')} onChange={handleCheckboxChange} />
                Friends
              </label>
              <label className='mr-3 text-sm flex_center'>
                <input className='mx-1' type="checkbox" value="Job Portal" checked={formData.howHeard.includes('Job Portal')} onChange={handleCheckboxChange}/>
                Job Portal
              </label>
              <label className='mr-3 text-sm flex_center'>
                <input className='mx-1' type="checkbox" value="Others" checked={formData.howHeard.includes('Others')} onChange={handleCheckboxChange}/>
                Others
              </label>
            </div>
          </div>
          <div className='flex w-full flex-col md:flex-row my-1'>
            <div className='w-full md:w-2/5 mr-5'>
              <h3 className='font-bold mb-1 text-sm'>City</h3>
              <select className='rounded-lg w-full outline-none text-gray-300 text-sm p-2' value={formData.city} onChange={handleDropdownChange} style={{backgroundColor:'var(--purple-gray)'}}>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
            <div className='w-full md:w-2/5 mt-2 md:mt-0'>
              <h3 className='font-bold mb-1 text-sm'>State</h3>
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
            <button type='submit' className='button_1'>Save</button>
            <Link to='/' className='button_1'>Back</Link>
          </div>
          <h2 className='text-sm sm:text-base'>Already have an account? <Link to='/login'><span>Login here</span></Link></h2>
        </form>
      </div>
    </section>
  )
}

export default Signup