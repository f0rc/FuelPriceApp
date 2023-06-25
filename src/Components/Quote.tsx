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
        
    </li>
  )
}

export default Quote