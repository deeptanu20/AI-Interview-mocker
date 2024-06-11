'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GemeniAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


const RecordAns = ({mockInterviewQuestion,activeQuestionIndex,interviewData}) => {

    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
   
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous:false,
        useLegacyResults: false
      });

    
      useEffect(()=>{
        results?.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))

      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer?.length>10){

               UpdatedUserAnswer();

        }
      },[userAnswer])



        const StartStopRecording=async()=>{

        if(isRecording){
            stopSpeechToText();
        }
        else{
            startSpeechToText();
        }
      }

        const UpdatedUserAnswer=async()=>{
            //console.log(userAnswer);

            setLoading(true)


            const feedbackPromt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"
            +userAnswer+",Depends on question and user answer for given interview question"+
            "please give us rating for answer and feedback as area of improvement if any"+
            "in just 3 to 5 line to improve it in JSON format with rating field and feedback field";


                        
          const result =await chatSession.sendMessage(feedbackPromt);
          const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

         // console.log(mockJsonResp);

          const JsonFeedbackResp=JSON.parse(mockJsonResp);

          //console.log(mockInterviewQuestion(activeQuestionIndex)?.question)
         
          const resp =await db.insert(UserAnswer).values({
           mockIdRef:interviewData?.mockId,
           question: mockInterviewQuestion[activeQuestionIndex]?.question,
           correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
           userAns:userAnswer,
           feedback:JsonFeedbackResp?.feedback,
           rating:JsonFeedbackResp?.rating,
           userEmail:user?.primaryEmailAddress?.emailAddress,
           createdAt:moment().format('DD-MM-yyyy')

          })
          if (resp){
            toast('User Answer Recorded Successfully');
            setUserAnswer('');
            setResults([]);
            
          }

          setResults([]);
          setLoading(false);



          }


       
          




        
      

      

    


  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col mt-40 justify-center items-center rounded-lg p-5'>
        <Image src={'/webcam.jpg'} width={400} height={400} className='absolute'/>
     <Webcam 
     mirrored={true}
      style={{
      
        height:300,
        width:'100%',
        zIndex:10,
      }}
     />
    </div>

    <Button 
    disabled={loading}
    className='mt-10 bg-pink-700'
      onClick={StartStopRecording}
    >
    
    {isRecording?
        <h2 className='text-white animate-pulse flex gap-2 items-center'>
            <StopCircle/> Stop Recording
        </h2>
        :
   
      <h2 className='text-white flex gap-2 items-center'><Mic/>Record Answer</h2>}</Button>
   
    

    </div>
  )
}

export default RecordAns
