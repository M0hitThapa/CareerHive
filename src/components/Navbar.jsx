import React from 'react'
import { Link } from 'react-router-dom'
import JobsImg from '../assets/images/jobslogo.png'

const Navbar = () => {
  return (
    <nav >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            
            <Link className="flex items-center mr-6" to="/">
              <img className="h-14 w-15" src={JobsImg} alt="React Jobs" />
              <span className="hidden md:block text-white text-4xl font-bold ml-3 font-monospace tracking-wide ">CareerHive</span>
            </Link>
            
            <div className="ml-auto">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className=" px-6 py-2 bg-teal-950 border border-white  text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 " 
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="px-6 py-2 bg-teal-950 border border-white  text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                >
                  Jobs
                </Link>
                <Link
                  to="/add-job"
                  className="px-6 py-2 bg-teal-950 border border-white  text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                >
                  Add Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
