
'use client'
import { db } from '@/utils/db.js'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAns from './_components/RecordAns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({params}) => {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();

    },[]);

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
     
       const jsonMockResp=await JSON.parse(result[0].jsonMockResp);
    
       setMockInterviewQuestion(jsonMockResp);
       setInterviewData(result[0]);
       
    }
  return (
    <div>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
      
      <QuestionsSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex ={activeQuestionIndex}
      />

      <RecordAns 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex ={activeQuestionIndex}
            interviewData={interviewData}
      
      />

</div>

        <div className='flex justify-end gap-6 mt-2'>

       {activeQuestionIndex>0 &&
       
       
       <Button className='hover:bg-slate-700' onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button> }


        {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
        
        
        <Button className='bg-purple-950 hover:bg-purple-600' onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex ==mockInterviewQuestion?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        <Button className='bg-green-900 hover:bg-green-600'>End Interview</Button>
        </Link>}
        </div>

    
    </div>
  )
}

export default StartInterview
