import React, { useState } from 'react'

const FaqSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const [isOpen1, setIsOpen1] = useState(false);
    const toggleAccordion1 = () => {
        setIsOpen1(!isOpen1);
    };

    const [isOpen2, setIsOpen2] = useState(false);
    const toggleAccordion2 = () => {
        setIsOpen2(!isOpen2);
    };  
  return (
    <section className="bg-black text-white px-0 md:px-14 xl:px-28 mt-20">
    <div className="container  py-10 mx-auto">
        <h1 className="text-2xl font-semibold  text-white lg:text-3xl">Frequently asked questions</h1>

        <div className="mt-12 space-y-4">
            <div className="border-2 border-gray-100 rounded-lg">
                <button className="flex items-center justify-between w-full px-8 py-4" onClick={toggleAccordion}>
                    <h1 className="font-semibold text-gray-200 text-lg">How can I purchase gym subscription?</h1>

                    <span className="text-gray-300  rounded-full">
                        {isOpen ? (

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        )}
                    </span>
                </button>

                <div className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <hr className="border-gray-200" />

                    <p className="px-8 py-4  text-gray-300">
                        You can purchase your subscription directly through our website. Simply navigate to the book offline gym you're interested in, select the type of subscription you need, and proceed to checkout.
                    </p>
                </div>
            </div>
            <div className="mt-12 space-y-8">
                <div className="border-2 border-gray-100 rounded-lg">
                    <button className="flex items-center justify-between w-full px-8 py-4" onClick={toggleAccordion1}>
                        <h1 className="font-semibold text-gray-200 text-lg">Do I need to print my subscription?</h1>

                        <span className="text-gray-300  rounded-full">
                            {isOpen1 ? (

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            )}
                        </span>
                    </button>

                    <div className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${isOpen1 ? 'max-h-96' : 'max-h-0'}`}>
                        <hr className="border-gray-200" />

                        <p className="px-8 py-4  text-gray-300">
                            In most cases, electronic or mobile subscriptions are accepted. Once you complete your purchase, you'll receive an email confirmation with your subscription details. You can present the digital subscription on your phone or a printed copy at the gym.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-12 space-y-8">
                <div className="border-2 border-gray-100 rounded-lg">
                    <button className="flex items-center justify-between w-full px-8 py-4" onClick={toggleAccordion2}>
                        <h1 className="font-semibold text-gray-200 text-lg">Is my payment information secure?</h1>

                        <span className="text-gray-400  rounded-full">
                            {isOpen2 ? (

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            )}
                        </span>
                    </button>

                    <div className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${isOpen2 ? 'max-h-96' : 'max-h-0'}`}>
                        <hr className="border-gray-200" />

                        <p className="px-8 py-4  text-gray-400">
                            Yes, we prioritize the security of your payment information. We use industry-standard encryption and security measures to ensure your data remains safe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default FaqSection