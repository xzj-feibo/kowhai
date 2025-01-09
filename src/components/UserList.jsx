import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes, GridToolbarContainer,
} from '@mui/x-data-grid';
import {Box, Button, Paper} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //分页对象
    const paginationModel = {page: 0, pageSize: 10}
    //行模式模型，表明表中哪些行处于编辑模式
    const [rowModesModel, setRowModesModel] = React.useState({});

    //副作用钩子：组件渲染后执行，第二个参数是依赖数组，当数组中元素值发生改变后执行
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUserData();
                data.map((d => {
                    d.last_login = new Date(d.last_login)
                    d.birth = new Date(d.birth)
                    d.audit.create_time = new Date(d.audit.create_time)
                    d.audit.update_time = new Date(d.audit.update_time)
                }));
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    //表格上方工具栏的函数
    function EditToolbar(props) {
        const { setUsers, setRowModesModel } = props;
        const handleClick = () => {
            const id = 11;
            setUsers((oldRows) => [
                ...oldRows,
                { id: id, name: '', gender: '', birth: '', password:'', email: '', phone: '', followers: '', following: '', last_login: '', avatar: '', state: '', audit: {create_time: '', update_time: ''}, isNew: true },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    //点击编辑回调
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    //点击保存回调
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    //点击删除回调
    const handleDeleteClick = (id) => () => {
        setUsers(users.filter((row) => row.id !== id));
    };

    //点击取消回调
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = users.find((row) => row.id === id);
        if (editedRow.isNew) {
            setUsers(users.filter((row) => row.id !== id));
        }
    };

    //决定编辑行何时停止编辑状态，一般阻止默认退出行为
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    //更新行数据
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setUsers(users.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    //处理行状态的改变
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    //列名数组
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 40, align: 'center', headerAlign: 'center'
        },
        {
            field: 'name', headerName: 'NAME', width: 100, align: 'center', headerAlign: 'center', editable: true
        },
        {
            field: 'gender', headerName: 'GENDER', width: 100, align: 'center', headerAlign: 'center'
        },
        {
            field: 'birth', headerName: 'BIRTH', type: 'date', width: 100, align: 'center', headerAlign: 'center', editable: true
        },
        {
            field: 'password', headerName: 'PASSWORD',width: 140, align: 'center', headerAlign: 'center', editable: true
        },
        {
            field: 'email', headerName: 'EMAIL', width: 150, align: 'center', headerAlign: 'center', editable: true
        },
        {
            field: 'phone', headerName: 'PHONE', width: 120, align: 'center', headerAlign: 'center', editable: true
        },
        {
            field: 'followers', headerName: 'FOLLOWERS', width: 100, align: 'center', headerAlign: 'center'
        },
        {
            field: 'following', headerName: 'FOLLOWING', width: 100, align: 'center', headerAlign: 'center'
        },
        {
            field: 'last_login', headerName: 'LAST_LOGIN', type: 'date', width: 230, align: 'center', headerAlign: 'center'
        },
        {
            field: 'avatar', headerName: 'AVATAR', width: 100, align: 'center', headerAlign: 'center'
        },
        {
            field: 'state', headerName: 'STATE', width: 100,
            valueFormatter: (value) => {
                if (value === 0){
                    return `Y`
                }
                else {
                    return "N"
                }
            },
            editable: true,
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'create_time',
            headerName: 'CREATE_TIME',
            width: 230,
            valueGetter: (value,row) => row.audit.create_time,
            type: 'date',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'update_time',
            headerName: 'UPDATE_TIME',
            width: 230,
            valueGetter: (value, row) => row.audit.update_time,
            type: 'date',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'actions',
            headerName: 'HANDLE',
            type: 'actions',
            cellClassName: 'actions',
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ]

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
                editMode="row"
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setUsers, setRowModesModel },
                }}
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
                        color: '#0bde4e', // 修改选中状态下的复选框颜色
                    }
                }}
            />
        </Paper>
    );
}

export default UserList;