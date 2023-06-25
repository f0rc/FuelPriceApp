import type { InferGetStaticPropsType, GetStaticProps } from "next";
import path from "path";
import fs from "fs/promises";
import QuoteList, {
  type QuoteProps,
  type QuotesListProps,
} from "~/Components/QuoteList";

const index = ({
  quotings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <QuoteList quotes={quotings} />;
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
