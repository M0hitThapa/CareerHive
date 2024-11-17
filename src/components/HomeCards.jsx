import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
const HomeCards = () => {
  return (
    <>
    
<section className="py-30">
<div className="container-xl lg:container m-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
   <Card><h2 className="text-2xl font-bold text-neutral-200">For Individuals</h2>
      <p className="mt-2 mb-4 text-neutral-200">
      Discover job opportunities and launch your career today
      </p>
      <Link
        to="/jobs"
        className="px-6 py-2 bg-teal-950 border border-white  text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      >
        Find Jobs
      </Link></Card>
      <Card>
      <h2 className="text-2xl text-neutral-200 font-bold">For Recruiters</h2>
      <p className="mt-2 mb-4 text-neutral-200">
      Post a job to connect with the ideal candidate for your team
      </p>
      <Link
        to="/add-job"
        className="px-6 py-2 bg-teal-950 border border-white  text-white rounded-lg font-bold transform hover:-translate transition duration-400 "
      >
        Post Job
      </Link>

      </Card>
    
  </div>
</div>
</section>


    </>
  )
}

export default HomeCards