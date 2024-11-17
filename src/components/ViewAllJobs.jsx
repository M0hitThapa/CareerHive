import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllJobs = () => {
  return (
    <>
         <section className="m-auto max-w-60 my-5 px-6">
      <Link
        to="/jobs"
        className=" block bg-teal-700 text-stone-200 text-xl font-black text-center py-3 px-6 rounded-xl shadow-inner shadow-teal-450 hover:bg-teal-600"
        >View All Jobs</Link>
    </section>
    </>
  )
}

export default ViewAllJobs