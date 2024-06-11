import { LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion,activeQuestionIndex}) => {

  const textToSpeach =(text)=>{
    if('speechSynthesis' in window){
       const speech =new SpeechSynthesisUtterance(text)
       window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry, Your browser doesnot support text to speech')
    }
  }





  return mockInterviewQuestion&&(
    <div className='p-5 rounded-lg border-2 border-cyan-800 my-12'>
     <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>{
            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestionIndex == index && 'bg-primary text-white'}`}
                
            >Question{index+1}</h2>

        })} 

     </div>
    
     
     <h2 className='my-6 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.Question || mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

     <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.Question || mockInterviewQuestion[activeQuestionIndex]?.question)}/>
     
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-800'>
            <LightbulbIcon/>
            <strong>Note:</strong>
        </h2>
        <h1 className='text-sm text-blue-800 my-3'>{process.env.NEXT_PUBLIC_IMP}</h1>
        <h2 className='text-sm text-blue-700 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  )
}

export default QuestionsSection
