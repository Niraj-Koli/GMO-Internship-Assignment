import { useEffect, useState } from "react";

import classes from "./Table.module.css";

import { Box } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

interface TableModel {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function Table() {
    const [tableData, setTableData] = useState<TableModel[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setTableData(data));
    }, []);

    return (
        <div className={classes.table}>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={tableData}
                    columns={[
                        {
                            field: "userId",
                            headerName: "User ID",
                            width: 130,
                            editable: true,
                        },
                        {
                            field: "id",
                            headerName: "ID",
                            width: 100,
                            editable: true,
                        },
                        {
                            field: "title",
                            headerName: "Title",
                            width: 400,
                            editable: true,
                        },
                        {
                            field: "body",
                            headerName: "Body",
                            width: 700,
                            editable: true,
                        },
                    ]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}

export default Table;
