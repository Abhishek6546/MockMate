'use client'
import { db } from '@/utils/Db'
import { MockMate } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from "./_components/QuestionSection"
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
  const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockMate).where(eq(MockMate.mockId, params.interviewId));
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setmockInterviewQuestion(jsonMockResp)
      setInterviewData(result[0])
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        {console.log(mockInterviewQuestion)}
        {<QuestionSection mockInterviewQuestion={mockInterviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
        />}

        {/* video/audio  recording*/}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {ActiveQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(ActiveQuestionIndex - 1)}>Previous Question</Button>}
        {ActiveQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(ActiveQuestionIndex + 1)}>Next Question</Button>}
        {ActiveQuestionIndex == mockInterviewQuestion?.interview_questions?.length - 1 && <Link href={'/portal/interview/' + interviewData?.mockId + '/feedback'}>
          <Button>End Interview</Button>
        </Link>}
      </div>
    </div>
  );
}

export default StartInterview;
