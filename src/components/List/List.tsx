import { useState } from "react";

import {
    Box,
    FormControlLabel,
    Checkbox,
    Collapse,
    IconButton,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const departmentJson = [
    {
        id: 1,
        department: "Agriculture & Fishing",
        sub_departments: [
            "Agriculture",
            "Crops",
            "Farming Animals & Livestock",
            "Fishery & Aquaculture",
            "Ranching",
        ],
    },
    {
        id: 2,
        department: "Business Services",
        sub_departments: [
            "Accounting & Accounting Services",
            "Auctions",
            "Business Services",
            "Call Centers & Business Centers",
            "Career Planning",
            "Commercial Printing",
            "Debt Collection",
        ],
    },
];

function List() {
    const [open, setOpen] = useState<number[]>([]);

    function openHandler(index: number) {
        if (open.includes(index)) {
            const newOpen = open.filter((item) => item !== index);
            setOpen(newOpen);
        } else {
            const newOpen = [...open];
            newOpen.push(index);

            setOpen(newOpen);
        }
    }

    function renderSubDepartments(sub_departments: string[]) {
        return sub_departments.map((sub_department, index) => {
            return (
                <>
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 9,
                        }}>
                        <FormControlLabel
                            label={sub_department}
                            control={
                                <Checkbox
                                    name={sub_department}
                                    value={sub_department}
                                />
                            }
                        />
                    </Box>
                </>
            );
        });
    }

    function renderDepartments() {
        return departmentJson.map((department, index) => {
            return (
                <>
                    <Box key={index} sx={{ m: 4 }}>
                        <IconButton onClick={() => openHandler(index)}>
                            {open.includes(index) ? (
                                <RemoveIcon />
                            ) : (
                                <AddIcon />
                            )}
                        </IconButton>
                        <FormControlLabel
                            label={`${department.department} (${department.sub_departments.length})`}
                            control={
                                <Checkbox
                                    name={department.department}
                                    value={department.department}
                                />
                            }
                        />
                        <Collapse
                            in={open.includes(index)}
                            timeout="auto"
                            unmountOnExit>
                            {renderSubDepartments(department.sub_departments)}
                        </Collapse>
                    </Box>
                </>
            );
        });
    }

    return (
        <Box
            sx={{
                m: 5,
            }}>
            {renderDepartments()}
        </Box>
    );
}

export default List;
