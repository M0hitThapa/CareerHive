import React from 'react'

const Hero = ({
    title= 'Unlock Your Career Potential',
    subtitle = 'Discover the Perfect Job for Your Unique Skill Set',
}) => {
  return (
  <>
  
  <section className="bg-teal-950 py-20 mb-1 m-auto bg-opacity-50  max-w-2xl min-h-1.5 rounded-xl">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          <p className="my-4 text-xl text-white">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  </>
  )
}

export default Hero