'use client'; 
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/Db";
import { chatSession } from "@/utils/GeminiAIModel";
import { MockMate } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid"

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [JsonResponse, setJsonResponse] = useState([]);
   
    const router = useRouter();
    const { user } = useUser();
    
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Each entry should have question and answer fields`;
       
        try {
            const result = await chatSession.sendMessage(inputPrompt);
            const responseText = await result.response.text();
            console.log(responseText)
            const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
            const parsedJson = JSON.parse(cleanedResponse);
            console.log("Parsed JSON:", parsedJson);
            setJsonResponse(parsedJson)

            if (parsedJson) {
                const resp = await db.insert(MockMate)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: parsedJson,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-yyyy')

                    }).returning({ mockId: MockMate.mockId })

                console.log("inserted Id", resp)
                if(resp){
                    setOpenDialog(false);
                    router.push('/portal/interview/'+resp[0]?.mockId)
                }
            } else {
                console.log("ERR")
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching interview questions:', error);
        }
    };

    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
                <h2 className="text-lg">+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, job description, and years of experience</h2>
                                    <div className="mt-7 my-3">
                                        <label>Job Role/Job Position</label>
                                        <Input onChange={(event) => setJobPosition(event.target.value)} placeholder="Ex. Full Stack Developer" required />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <label>Job Description / Tech Stack (In Short)</label>
                                        <Textarea onChange={(event) => setJobDesc(event.target.value)} placeholder="Ex. React, NodeJs, Angular, MySql etc" required />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <label>Years of Experience</label>
                                        <Input onChange={(event) => setJobExperience(event.target.value)} placeholder="Ex. 5" type="number" max="50" required />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
