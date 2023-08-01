import { api } from "~/utils/api";

import React from "react";
import { TableComponent } from "~/Components/table/TableComponent";

const index = () => {
  const tableData = api.quote.getQuoteHistory.useQuery();
  return (
    <div className="container mt-10 items-center justify-center">
      <div className="flex flex-col justify-center ">
        <h1 className="mb-4 text-center text-2xl font-semibold text-dark-color">
          Quote History
        </h1>
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
