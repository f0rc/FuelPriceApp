import Quote from "./quote";

export interface QuoteProps {
    id: string,
    gallonsreq: string,
    address1: string,
    deliveryDate: string,
    suggestedPrice: string,
    totalDue: string,
}

export interface QuotesListProps {
    quotes:QuoteProps[]
}

const QuoteList = ({quotes}:QuotesListProps) => {
  return (
    
    <ul className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {quotes.map(quote => 
        <Quote key={quote.id}
        id={quote.id}
            gallonsreq={quote.gallonsreq}
            address1={quote.address1}
            deliveryDate={quote.deliveryDate}
            suggestedPrice={quote.suggestedPrice}
            totalDue={quote.totalDue}
        />
        )}
    </ul>
  )
}

export default QuoteList