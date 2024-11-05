'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/Db';
import { MockMate } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState([]); // Initialize as an empty array
    const [webCamEnabled, setWebCamEnabled] = useState(false);


    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            // Fetch interview details from the database
            const result = await db.select().from(MockMate).where(eq(MockMate.mockId, params.interviewId));
            const rawData = result[0];
             
            setInterviewData(rawData)
            // Log raw data to inspect its format
            console.log("Raw Data from DB:", rawData);

            // Parse the cleaned data as JSON
           //   const interviewDetails = JSON.parse(rawData || "[]"); // Fallback to empty array if rawData is undefined

            // Set the parsed data to state
            // setInterviewData(interviewDetails);
        } catch (error) {
            console.error('Error fetching interview details:', error.message);
        } 
    };

    console.log("interview55 data:", interviewData);
    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             
                    <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
                        <div className="flex flex-col my-5 gap-5">
                            <h2 className="text-lg">
                                <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Job Description/Job Tech Stack:</strong> {interviewData.jobDesc}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Years of Experience:</strong> {interviewData.jobExperience}
                            </h2>
                        </div>

                        {/* Displaying the interview questions and answers */}
                        {/* {interviewData.map((item, index) => (
                            <div key={index} className="p-5 border rounded-lg bg-gray-100">
                                <h3 className="font-semibold">Question {index + 1}:</h3>
                                <p>{item.question}</p>
                                <h4 className="mt-2 font-semibold">Answer:</h4>
                                <p>{item.answer}</p>
                            </div>
                        ))} */}

                        <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                            <h2 className="flex gap-2 items-center text-yellow-500">
                                <Lightbulb /> <strong>Information</strong>
                            </h2>
                            <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </div>
                    </div>
                

                <div className="flex justify-center flex-col">
                    {webCamEnabled ? (
                        <Webcam
                            style={{ height: 300, width: 300 }}
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-end items-end">
                <Link href={`/portal/interview/${params.interviewId}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
