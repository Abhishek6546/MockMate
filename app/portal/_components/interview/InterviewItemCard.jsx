import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
   const router=useRouter();

   const onStart=()=>{
    router.push("/portal/interview/"+interview?.mockId)
   }

   const onFeedbackPress=()=>{
    router.push("/portal/interview/"+interview?.mockId+"/feedback")
   }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience} years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At:{interview?.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        
        <Button onClick={onFeedbackPress} className="w-full" size="sm" variant="outline">Feedback</Button>
        <Button onClick={onStart} className="w-full" size="sm">Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard