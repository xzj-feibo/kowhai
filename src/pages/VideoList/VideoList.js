import {Button, ListItem, styled} from "@mui/material";

export const TopButton = styled(Button)(({isSelected}) => ({
    backgroundColor: isSelected ? 'white' : '#212121',
    color: isSelected ? '#212121' : 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: '#212121'
    },
    marginRight: '12px',
    marginBottom: '25px',
    marginTop: '10px'
}))

export const AsideListItem = styled(ListItem)(({isSelected}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '5px',
    marginBottom: '5px',
    color: 'white',
    backgroundColor: isSelected ? '#424242' : 'black',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#424242',
    },
}));