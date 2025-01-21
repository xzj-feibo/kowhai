import React, { useState, useRef } from "react";
import {styled, TextField} from "@mui/material";
import theme from "../../theme";

export default function BirthdayInput({ onChange, onKeyDown }) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const dayRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const handleDayChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
            setDay(value);
            if (value.length === 2) {
                monthRef.current.focus();
            }
            onChange({ day: value, month, year });
        }
    };

    const handleMonthChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
            setMonth(value);
            if (value.length === 2) {
                yearRef.current.focus();
            }
            onChange({ day, month: value, year });
        }
    };

    const handleYearChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setYear(value);
            onChange({ day, month, year: value });
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: theme.spacing(2.5) }}>
            <StyledTextField
                label="Day"
                variant="outlined"
                value={day}
                onChange={handleDayChange}
                inputProps={{ maxLength: 2 }}
                placeholder="DD"
                inputRef={dayRef}
            />
            <StyledTextField
                label="Month"
                variant="outlined"
                value={month}
                onChange={handleMonthChange}
                inputProps={{ maxLength: 2 }}
                placeholder="MM"
                inputRef={monthRef}
            />
            <StyledTextField
                label="Year"
                variant="outlined"
                value={year}
                onChange={handleYearChange}
                inputProps={{ maxLength: 4 }}
                placeholder="YYYY"
                inputRef={yearRef}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

//样式
const StyledTextField = styled(TextField)`
    width: 30%
`