import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewinterview from './_components/AddNewinterview'
import InterviewList from './_components/InterviewList'

function portal() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Portal</h2>
      <h2 className="text-gray-500" >Create and Start your AI Mockup Interivew</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewinterview/>
      </div>

      {/* previous interview list */}
      <InterviewList/>
    </div>

  )
}

export default portal