"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";

const OverdueTask = ({ exceedance }) => {
  const rowData = JSON.parse(exceedance.exceedanceValues);
  const data = rowData.map((row, index) => ({ id: index, ...row }));
  const paginatorLeft = (
    <Button size="icon" variant="ghost" className="group">
      <Icon icon="material-symbols-light:refresh" className=" h-6 w-6 " />
    </Button>
  );
  const paginatorRight = (
    <Button size="icon" variant="ghost" className="group">
      <Icon icon="material-symbols:download" className=" h-6 w-6 " />
    </Button>
  );

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-0">
        <CardTitle>Exceedance Table</CardTitle>
      </CardHeader>
      <CardContent className="p-2 overflow-x-auto">
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "20rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
        >
          <Column field="time" header="Time" style={{ width: "50%" }}></Column>
          <Column
            field="value"
            header="Parameter Value"
            style={{ width: "50%" }}
          ></Column>
        </DataTable>
      </CardContent>
    </Card>
  );
};

export default OverdueTask;
