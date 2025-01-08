import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user";
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //列名数组
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 60
        },
        {
            field: 'name', headerName: 'NAME', width: 100
        },
        {
            field: 'gender', headerName: 'GENDER', width: 100
        },
        {
            field: 'birth', headerName: 'BIRTH', width: 100
        },
        {
            field: 'password', headerName: 'PASSWORD',width: 150
        },
        {
            field: 'email', headerName: 'EMAIL', width: 150
        },
        {
            field: 'phone', headerName: 'PHONE', width: 120
        },
        {
            field: 'followers', headerName: 'FOLLOWERS', width: 130
        },
        {
            field: 'following', headerName: 'FOLLOWING', width: 130
        },
        {
            field: 'last_login', headerName: 'LAST_LOGIN', width: 250
        },
        {
            field: 'avatar', headerName: 'AVATAR', width: 100
        },
        {
            field: 'state', headerName: 'STATE', width: 100
        },
        {
            field: 'create_time',
            headerName: 'CREATE_TIME',
            width: 250,
            valueGetter: (value,row) => row.audit.create_time
        },
        {
            field: 'update_time',
            headerName: 'UPDATE_TIME',
            width: 250,
            valueGetter: (value, row) => row.audit.update_time
        }

    ]
    //分页对象
    const paginationModel = {page: 0, pageSize: 10}

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUserData();
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <Paper sx={{ height: 620, width: '100%', backgroundColor: 'black' }}>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                    border: 0,
                    color: 'white',
                    '& .MuiDataGrid-cell': { color: 'white' },
                    '& .MuiDataGrid-columnHeader': { backgroundColor: '#333', color: 'white' },
                    '& .MuiDataGrid-footerContainer': { backgroundColor: '#333', color: 'white' },
                    '& .MuiCheckbox-root': {
                        color: 'white', // 修改复选框的颜色
                    },
                    '& .MuiCheckbox-root.Mui-checked': {
                        color: 'orange', // 修改选中状态下的复选框颜色
                    }
                }}
            />
        </Paper>
    );
};

export default UserList;
