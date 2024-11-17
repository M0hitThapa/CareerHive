import React from 'react'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const JobListing = ({ job }) => {
    const [showFullDescription, setShowFullDescription ] = useState(false);

    let description = job.description;
    if (!showFullDescription) {
        description = description.substring(0, 90) + '...';
    }
  return (
    <>
    <div className="bg-black shadow-md shadow-2xl shadow-neutral-200/20 shadow-neutral-900 rounded-xl relative flex flex-col lg:flex-row">
  {/* Left Section: Details */}
  <div className="p-4 flex-1">
    <div className="mb-6">
      <div className="text-neutral-200 text-xl my-2">{job.type}</div>
      <h3 className="text-3xl text-rose-700 font-black">{job.title}</h3>
    </div>

    <div className="mb-5 text-xl text-neutral-200 font-normal">
      {description}
    </div>
    <button
      onClick={() => setShowFullDescription((prevState) => !prevState)}
      className="text-emerald-500 mb-5 text-xl hover:text-emerald-600"
    >
      {showFullDescription ? 'Less' : 'More'}
    </button>

    <h3 className="text-neutral-200 mb-2">{job.salary}/ Year</h3>

    <div className="border border-stone-500 mb-5"></div>

    <div className="flex flex-col lg:flex-row justify-between mb-4">
      <div className="text-emerald-500 text-xl mb-3">
        <FaMapMarker className="inline text-lg mb-1" />
        {job.location}
      </div>
      <Link
        to={`/job/${job.id}`}
        className="px-6 py-2 bg-teal-950 border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      >
        Read More
      </Link>
    </div>
  </div>

  

    <img
      src={job.imageUrl} 
      alt={`${job.title} image`}
      className="w-full rounded-lg max-w-96 opacity-70 m-2.5 p-2.5 shadow-md shadow-stone-200 "
    />

</div>

    </>
  )
}

export default JobListing