/**
 * 顶部通用通知组件
 */
import {Alert, Snackbar} from "@mui/material";
import React from "react";

export default function NoticeBar({openSnackbar, handleCloseSnackbar, snackbarSeverity, snackbarMessage, autoHideDuration=2000}) {
    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={autoHideDuration}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // 顶部居中显示
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}