import React from 'react'
import type { QuoteProps } from './QuoteList'
import Link from 'next/link'


const Quote = ({id, gallonsreq, address1, deliveryDate, suggestedPrice, totalDue}:QuoteProps) => {
  return (
    <li >
        
        <div className='mb-3'>
            <div>ID:{id}</div>
            <div>Gallons: {gallonsreq}</div>
            <div>Address:{address1}</div>
            <div>DateDelivered:{deliveryDate}</div>
            <div>Suggested Price:{suggestedPrice}</div>
            <div>Total Due:{totalDue}</div>
        </div>
        <div>
            <Link href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Quote Details
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
        </div>
    </li>
  )
}

export default Quote
