import React from 'react'
import JobListing from './JobListing'
import jobs from '../jobs.json'


const JobListings = ({isHome = false}) => {
  const jobListings = isHome ? jobs.slice(0,9): jobs;
    
  return (
    <>
     <section className=" px-4 py-10 max-w-fit m-auto ">
      <div className="max-w-5xl m-auto ">
        <h2 className="text-4xl font-black text-stone-50 mb-6 mt-6 text-center">
          { isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <div className="grid grid-rows-1 md:grid-rows-3 gap-8">
            {jobListings.map((job) => (
              <JobListing key={job.id} job={job} />
 
            ))}

         
          </div>
          </div>
          </section>
     
    </>
  )
}

export default JobListings