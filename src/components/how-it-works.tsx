import React from 'react';
import { FaCar, FaHandshake, FaUsers } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
    return (
        <>
      <section className=" bg-white px-6">
      <h2 className="text-3xl font-semibold text-center mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div>
          <FaCar className="text-8xl mx-auto text-silverGray" />
          <h3 className="text-xl font-semibold mt-3">Find Your Car</h3>
          <p className='text-neutral-500 font-light'>Browse thousands of listings from verified sellers.</p>
        </div>
        <div>
          <FaUsers className="text-8xl mx-auto text-silverGray" />
          <h3 className="text-xl font-semibold mt-3">Connect with Owners</h3>
          <p className='text-neutral-500 font-light'>Chat with owners directly and negotiate terms.</p>
        </div>
        <div>
          <FaHandshake className="text-8xl mx-auto text-silverGray" />
          <h3 className="text-xl font-semibold mt-3">Make the Deal</h3>
          <p className='text-neutral-500 font-light'>Finalize your purchase or rental agreement seamlessly.</p>
        </div>
      </div>
    </section>
    </>
    );
};

export default HowItWorks;