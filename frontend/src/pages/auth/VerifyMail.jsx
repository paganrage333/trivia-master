import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { get, post } from '../../utils/axios'
import { notifyError, notifySuccess } from '../../utils/alerts'


function VerifyMail() {
   let location = useLocation()
   let navigate = useNavigate()
//    0=nothing 1 = success 2 expired 3 not found
   const [success,setSuccess] = useState(0)
   let token = location.pathname.split('/').pop()
   let verify = ()=>{
    get(`/auth/VerifyMail/${token}`).then((res)=>{
        if(res.success){
            console.log('1')
            setSuccess(1)
             notifySuccess(res.msg)
             return navigate("/signin")

            
        }else{
            if(res.Expired ){
                console.log('2')
                setSuccess(2)
                // return notifyError(res.msg)
                
                
            }else{
                console.log('3')

                setSuccess(3)
                // return notifyError(res.msg)
            }
        }
    })
   }
   useEffect(()=>{
        verify()
   },[])

   const sendMail = ()=>{
    get(`/auth/reSendMail/${token}`).then((res)=>{
        if(res.success){
            
           notifySuccess(res.msg)
        }else{
            notifyError(res.msg)
        }
    })
   }
  return (
  <>
  {
    success == 0 ? 
  <div id="loader" class="absolute bg-transparent flex items-center justify-center w-full h-[100vh] text-gray-900 ">
  <div class="">
    <h1 class=" text-xl md:text-3xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
        viewBox="0 0 24 24" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
        </path>
      </svg> ading . . .</h1>
  </div>
</div>:
    <div className='flex justify-center h-screen items-center'>
        {
            success == 1 ? 
        <div className='h-[300px] '>

    <img src="/images/veried_email.jpg" alt="" className='h-full w-full' />

        <h3 className='text-center text-3xl'>Email Verifed</h3>
        </div>
        :
        <div className='h-[100px] '>

    <img src="/images/verification_failed.png" alt="" className='h-full w-full' />

        <h3 className='text-center text-3xl mt-3'> Token Expired</h3>
        <p className='text-center text-lg'>
            <span onClick={sendMail} className='hover:underline cursor-pointer text-blue-700'>Click here</span> for resend mail
        </p>
        </div>
        }
    </div>
}
  </>
  )
}

export default VerifyMail