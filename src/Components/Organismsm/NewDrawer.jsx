import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles'
import Home from '../Pages-Agro/Home';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ListaCarreras from '../Pages-Agro/ListaCarreras';
import ListaEstudiantes from '../Pages-Agro/ListaEstudiantes';
import ListaTesis from '../Pages-Agro/ListaTesis';


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 240,
        background: '#141e30'
    },
}))

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(4.5),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 240,
        }),
    }),
);
const NewDrawer = (props) => {
    const classes = useStyles()
    const [drawer, setDrawer] = useState(props.drawer)

    //---------------------------------------------------
    const openDrawer = () => {
        setDrawer(true)
    }
    const closeDrawer = () => {
        setDrawer(false)
    }
    //---------------------------------------------------
    //---------------------------------------------------
    //---------------------------------------------------
    return (
        <div>
            <AppBar position='fixed' open={drawer} color='transparent'>
                <Toolbar>
                    <IconButton style={{color:'black'}} onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>Menu</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                open={drawer}
                onClose={closeDrawer}
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
                variant='persistent'
                style={{ flexShrink: 0 }}
            >
                <div align='right'>
                    <IconButton onClick={closeDrawer} >
                        <ChevronLeftIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                <List component='nav'>
                    <ListItem button component={Link} to='/' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon >
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText><span className={classes.tamano}>Inicio</span></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/carreras' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText><span className={classes.tamano}>Carreras</span></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/estudiantes' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText><span className={classes.tamano}>Estudiantes</span></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/tesis' style={{ color: 'yellowgreen' }}>
                        <ListItemIcon>
                            <ArrowRightAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText><span className={classes.tamano}>Tesis</span></ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={drawer}>
                {/* <Typography style={{paddingTop:'3rem'}} paragraph>ddddddddddddd</Typography> */}
                <Route path='/' exact component={Home} />
                <Route path='/carreras' exact component={ListaCarreras} />
                <Route path='/estudiantes' exact component={ListaEstudiantes} />
                <Route path='/tesis' exact component={ListaTesis} />
            </Main>
        </div>
    )
}

export default NewDrawer
