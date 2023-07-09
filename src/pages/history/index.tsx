import { api } from "~/utils/api";

import React from "react";
import TableComponent from "./TableComponent";

const index = () => {
  const tableData = api.quote.getQuoteHistory.useQuery();
  return (
    <div className="container items-center justify-center border-2 border-black">
      <div className="flex flex-col justify-center border-2 border-red-500">
        <h1 className="text-center text-xl font-semibold">Table Page</h1>
        <div className="">
          {tableData.data?.quoteList && (
            <TableComponent tableData={tableData.data.quoteList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
