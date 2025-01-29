import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function FileUploadBox({ handleFile, type, name }) {
    const [fileUrl, setFileUrl] = useState(null);
    const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file, type);
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setFileInfo({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + " MB",
            });
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <Box sx={{ width: 400, textAlign: "left" }}>
            <Box
                onClick={handleClick}
                sx={{
                    width: 400,
                    height: 250,
                    border: "2px dashed #888",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    backgroundColor: "#f8f8f8",
                    position: "relative",
                }}
            >
                {/* 文件预览 */}
                {fileUrl ? (
                    type === 0 ? (
                        <video
                            src={fileUrl}
                            controls
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <Box
                            component="img"
                            src={fileUrl}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    )
                ) : (
                    <Typography sx={{ fontSize: "30px", color: "#aaa" }}>{name}</Typography>
                )}

                {/* 文件选择框 */}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </Box>

            {/* 文件名称和大小显示在上传框外面 */}
            {fileInfo.name && (
                <Box
                    sx={{
                        marginTop: 5,
                        marginLeft: 5,
                        fontSize: "14px",
                        color: "#333",
                    }}
                >
                    <Typography>[文件名称]：{fileInfo.name}</Typography>
                    <Typography>[文件大小]：{fileInfo.size}</Typography>
                </Box>
            )}
        </Box>
    );
}
