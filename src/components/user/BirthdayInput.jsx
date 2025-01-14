import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";

export default function BirthdayInput({ onChange }) {
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
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <TextField
                label="Day"
                variant="outlined"
                value={day}
                onChange={handleDayChange}
                inputProps={{ maxLength: 2 }}
                placeholder="DD"
                style={{ width: "30%" }}
                inputRef={dayRef}
            />
            <TextField
                label="Month"
                variant="outlined"
                value={month}
                onChange={handleMonthChange}
                inputProps={{ maxLength: 2 }}
                placeholder="MM"
                style={{ width: "30%" }}
                inputRef={monthRef}
            />
            <TextField
                label="Year"
                variant="outlined"
                value={year}
                onChange={handleYearChange}
                inputProps={{ maxLength: 4 }}
                placeholder="YYYY"
                style={{ width: "30%" }}
                inputRef={yearRef}
            />
        </div>
    );
}
