import { api } from "~/utils/api";

import React from "react";
import TableComponent from "./TableComponent";

const index = () => {
  const tableData = api.quote.getQuoteHistory.useQuery();
  return (
    <div>
      <div>
        <h1>Table Page</h1>
        {tableData.data?.quoteList && (
          <TableComponent tableData={tableData.data.quoteList} />
        )}
      </div>
    </div>
  );
};

export default index;
