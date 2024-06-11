import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {

    const router=useRouter();

    const onStart=()=>{
             router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border border-slate-300 shadow-sm rounded-lg p-3'>
     <h2 className='font-medium text-slate-700'>{interview?.jobPosition}</h2>
     <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years Of Experience</h2>
     <h2 className='text-sm text-gray-800'>Created At:{interview?.createdAt}</h2>

     <div className='flex justify-between mt-2 gap-6'>
       
        <Button size='sm' className='bg-slate-800 w-full'
        onClick={onFeedbackPress}
        >Feedback</Button>
        <Button size='sm' variant='ghost' className='border border-cyan-950 w-full'
         onClick={onStart}
        >Start</Button>
     </div>
    </div>
  )
}

export default InterviewItemCard
