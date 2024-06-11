'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db.js'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";



const Interview = ({params}) => {

  const[interviewData,setInterviewData]= useState();
  const [webCamEnable,setWebCamEnable]=useState(false);
    useEffect(()=>{
       console.log(params.interviewId)
            GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
      const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))

     // console.log(result);
      setInterviewData(result[0]);

    }
  return (
    <div className='my-10'>
      <h2 className='font-bold text-xl'>Lets get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2  gap-10'>

    
             <div className=' flex flex-col my-5 gap-5'>
      <div className='flex flex-col my-5 p-5 rounded-lg border border-gray-400 gap-5'>
           <h2 className='text-xl  font-medium'><strong className='text-pink-900'>Job Role/Job Position:</strong>{interviewData?.jobPosition}</h2>
           <h2 className='text-xl font-medium'><strong className='text-pink-900'>Job Description/Tech Stack:</strong>{interviewData?.jobDesc}</h2>
           <h2 className='text-xl font-medium'><strong className='text-pink-900'>Years of Experience:</strong>{interviewData?.jobExperience}</h2>
      </div>

      <div className='p-5 border-2 rounded-lg border-slate-900 bg-slate-300'>


    <h2 className='flex gap-2 items-center text-slate-900'><Lightbulb/><strong>Information</strong></h2>
    <h2 className='text-black'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>


      </div>


      </div>

       <div>
        {webCamEnable ?<Webcam 
        onUserMedia={()=>setWebCamEnable(true)}
        onUserMediaError={()=>setWebCamEnable(false)}
        mirrored={true}
        
        style={{width:300 ,height:300}}/> :
        <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border-2'/>
        <Button onClick={()=>setWebCamEnable(true)} className='mx-3 bg-slate-800'>Enable Web Cam and Microphone</Button>
        </>
}
      </div>
      
      </div>
      <div className='flex justify-end items-end'>
        <Link href ={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button className='bg-pink-700'>Start Interview</Button>
        </Link>
       
        </div>
      
    </div>
    

  )
}

export default Interview
