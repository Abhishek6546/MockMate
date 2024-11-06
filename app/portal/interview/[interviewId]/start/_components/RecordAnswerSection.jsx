"use client";
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/Db';
import { UserAnswer } from "@/utils/schema";
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, ActiveQuestionIndex,setActiveQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer((prevAns) => prevAns + result?.transcript);
        });
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer, isRecording]);

    const StartStopRecording = () => {
        isRecording ? stopSpeechToText() : startSpeechToText();
    };

    const UpdateUserAnswer = async () => {
        const ques = mockInterviewQuestion?.interview_questions?.[ActiveQuestionIndex]?.question;
        const ans = mockInterviewQuestion?.interview_questions?.[ActiveQuestionIndex]?.answer;

        if (!ques) {
            console.error("Question is undefined");
            toast.error("Failed to save answer: question is missing.");
            return;
        }

        setLoading(true);

        const feedbackPrompt = `Question: ${ques}, User Answer: ${userAnswer}. Please provide a rating for this answer and feedback for improvement in JSON format, with 'rating' and 'feedback' fields.`;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = result.response.text().replace("```json", '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: ques,
                correctAns: ans,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
            });

            if (resp) {
                toast("User Answer recorded successfully");
                setUserAnswer('');
                setResults([]);
            }
            setResults([]);
            setActiveQuestionIndex(ActiveQuestionIndex+1)
        } catch (error) {
            console.error("Error saving answer:", error);
            toast.error("Failed to save answer due to an error.");
        } finally {
            setLoading(false);
        }
    };

    return mockInterviewQuestion && (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20'>
                <Image src="/webcam.png" width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            <Button disabled={loading} className="my-10" variant="outline" onClick={StartStopRecording}>
                <h2 className={`flex gap-2 ${isRecording ? 'text-red-600' : 'text-blue-600'}`}>
                    <Mic /> {isRecording ? "Stop Recording" : "Record Answer"}
                </h2>
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
