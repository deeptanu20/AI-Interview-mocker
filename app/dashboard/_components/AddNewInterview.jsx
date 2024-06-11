'use client'

import React, { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LoaderCircle, TrendingUpIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from '@/utils/GemeniAIModel';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';




const AddNewInterview = () => {

  const[openDailog,setOpenDailog]=useState(false);
  const[jobPosition,setJobPosition]=useState();
  const[jobDesc,setJobDesc]=useState();
  const[jobExperience,setJobExperience]=useState();
  const[loading,setLoading]=useState(false);
  const[jsonResponse,setJsonResponse]=useState([]);
  const router = useRouter();
  const {user}= useUser();
  
  const onSubmit =async(e)=> {
              setLoading(true);
              e.preventDefault();
              console.log(jobPosition,jobExperience,jobDesc);
             const InputPromt = "Job Position :"+jobPosition+", job Description:"+jobDesc+", Years of Experience :"+jobExperience+", Depends on this information please give us "+process.env.NEXT_PUBLIC_QUESTION_COUNT+" interview questions with answer in JSON Format ,Give Question and answer as field in JSON"
             const result =await chatSession.sendMessage(InputPromt);
             const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');
             //console.log(await JSON.parse(MockJsonResp));

             setJsonResponse(MockJsonResp);
            

              if(MockJsonResp){

              const resp =await db.insert(MockInterview).values({
                mockId:uuidv4(),
                jsonMockResp:MockJsonResp,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD/MM/yyyy')
              }).returning({mockId:MockInterview.mockId})

             console.log('Inserted Id:', resp);
              
              if(resp){
                setOpenDailog(false);
                router.push('/dashboard/interview/'+ resp[0]?.mockId);
              }
            }else{
              console.log('Error');
            }

             setLoading(false);
  }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
       onClick={()=>setOpenDailog(TrendingUpIcon)}>
        <h2 className=' text-lg text-center'>+ Add New</h2>
      </div>
      <AlertDialog open={openDailog}>

  <AlertDialogContent className='max-w-2xl'>
    <AlertDialogHeader>
      <AlertDialogTitle className='text-xl'>Tell us more about your job interview</AlertDialogTitle>
      <AlertDialogDescription>
        <form onSubmit={onSubmit}>
        
       <div>
        <h2>Add Details about your job position/role,Job Description and years of experience</h2>
        <div className='mt-7 mx-3'>
          <label className='text-gray-900 mx-1'>Job Role/Job Position</label>
          <Input placeholder='Full Stack Developer' className='mt-1' required
           onChange={(event)=>setJobPosition(event.target.value)}
           />
        </div>

        <div className='mt-4 mx-3'>
          <label className='text-gray-900 mx-1'>Job Description/Tech Stack</label>
          <Textarea placeholder='Ex-React,Nodejs,Javascript,MongoDb,Nextjs etc' className='mt-1' required
            onChange={(event)=>setJobDesc(event.target.value)}
          />
        </div>

        <div className='mt-4 mx-3'>
          <label className='text-gray-900 mx-1'>Years of Experience</label>
          <Input placeholder='5'type="number" className='mt-1' max='40'required 
            onChange={(event)=>setJobExperience(event.target.value)}
          />
        </div>

        <div className='mt-4 mx-3'>
          <label className='text-gray-900 mx-1'>Upload Resume</label>
          <Input placeholder='5'type="file" className='mt-1'/>
        </div>

        <div className='flex gap-5 justify-end'>
    <AlertDialogFooter className='mt-3'>
      <AlertDialogCancel type='button' className='bg-red-600 text-white' onClick={()=>setOpenDailog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction type='submit' disabled={loading} className=' bg-slate-700'>
        {loading ?
        <>
        <LoaderCircle className='animate-spin '/>'Generating from AI' </>
         : 'Start Interview'}
       </AlertDialogAction>
  
    </AlertDialogFooter>
   
    </div>

       </div>
       </form>
      </AlertDialogDescription>
    </AlertDialogHeader>


    
  </AlertDialogContent>
</AlertDialog>



    </div>
    
 
  )
}

export default AddNewInterview
