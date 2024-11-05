import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({ mockInterviewQuestion,ActiveQuestionIndex }) {
     
    const textToSpeech=(text)=>{
      if('speechSynthesis' in window){
          const speech=new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(speech)
      }
      else{
        alert("Sorry ,Your browser does not support text to speech")
      }
    }
   
    return mockInterviewQuestion&& (
        <div className="p-5 border rounded-lg my-10">
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.interview_questions.map((question, index) => (
                    <h2 key={index} className={`p-2  rounded-full  text-xs md:text-sm text-center cursor-pointer ${ActiveQuestionIndex==index ? "bg-blue-600 text-white":"bg-secondary"}`}>
                        Question #{index + 1}
                    </h2>
                ))}
            </div>
            <h2>{mockInterviewQuestion.interview_questions[ActiveQuestionIndex]?.question.question}</h2>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion.interview_questions[ActiveQuestionIndex]?.question}</h2>
            <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion.interview_questions[ActiveQuestionIndex]?.question)}/>
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
               <h2 className='flex gap-2 items-center text-blue-700'>
                <Lightbulb/>
                <strong>Note:</strong>
               </h2>
               <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>

        </div>
    )
}

export default QuestionSection