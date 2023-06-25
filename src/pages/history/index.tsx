import type { InferGetStaticPropsType, GetStaticProps } from "next";
import path from "path";
import fs from "fs/promises";
import { type QuoteProps, type QuotesListProps } from "~/Components/QuoteList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const index = ({
  quotings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Table>
      <TableCaption
        className="mb-4 text-xl">
        A list of your Past Quotes
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Gallons</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>DateDelivered</TableHead>
          <TableHead>Suggested Price</TableHead>
          <TableHead className="text-center">Total Due Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotings.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell className="text-center font-medium">
              {quote.id}
            </TableCell>
            <TableCell className="text-center">{quote.gallonsreq}</TableCell>
            <TableCell className="text-center">{quote.address1}</TableCell>
            <TableCell className="text-center">{quote.deliveryDate}</TableCell>
            <TableCell className="text-center">
              {quote.suggestedPrice}
            </TableCell>
            <TableCell className="text-center">{quote.totalDue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const getStaticProps: GetStaticProps<{
  quotings: QuoteProps[];
}> = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "dummy_quotes.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as QuotesListProps;
  console.log(data.quotes);

  return { props: { quotings: data.quotes } };
};

export default index;
