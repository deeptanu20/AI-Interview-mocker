'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

  

const Feedback = ({params}) => {

    const [feedbackList,setFeedbackList]=useState([]);

    const router=useRouter();

    useEffect(()=>{
          GetFeedback()
    },[])

    const GetFeedback =async()=>{
            const result =await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId))
            .orderBy(UserAnswer.id);

            console.log(result)
            setFeedbackList(result);
    }




  return (
    <div className='p-10'>
     
          
          {feedbackList?.length == 0 ?
          <h2 className='font-light text-xl text-gray-500'>No Interview Feedback Record Found</h2>
          
          :

          <>

<h2 className='text-3xl font-medium text-slate-900'>Congratulation!</h2>
<h2 className='text-2xl font-light my-2 text-gray-900'>Here is your interview feedback</h2>


      <h2 className='text-2xl font-light text-cyan-900 my-3'>Your overall interview rating:<strong>3/10</strong></h2>

      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback for improvement</h2>

      {feedbackList && feedbackList.map((item,index)=>(
        <Collapsible key={index} children='mt-7'>
        <CollapsibleTrigger
        className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'
        >{item?.question}
        <ChevronsUpDownIcon className='h-5 w-5'/>
        
        
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div className='flex flex-col gap-2'>
                <h2 className='text-green-700 p-2 border rounded-lg bg-green-100'><strong>Rating :</strong>{item?.rating}</h2>
                <h2 className='text-blue-900 p-2 border rounded-lg bg-blue-100'><strong>Your Answer :</strong>{item?.userAns}</h2>
                <h2 className='text-yellow-900 p-2 border rounded-lg bg-yellow-100'><strong>Correct Answer :</strong>{item?.correctAns}</h2>
                <h2 className='text-purple-900 p-2 border rounded-lg bg-purple-100'><strong>Feedback :</strong>{item?.feedback}</h2>
            </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
      </>}


     <Button
     onClick={()=>router.replace('/dashboard')}
     className='bg-slate-800'>Go Home</Button>
    </div>
  )
}

export default Feedback
