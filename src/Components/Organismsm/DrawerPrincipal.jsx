import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'
import AppBarPrincipal from './AppBarPrincipal'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Imagen1 from '../../images/Imagen1.png'

const drawerWidth=240
const useStyles=makeStyles((theme)=>({
    drawer:{
        width:drawerWidth,
        flexShrink:0
    },
    drawerPaper:{
        width:drawerWidth,
        background: '#141e30'
    },
    toolbar:theme.mixins.toolbar,
    tamano:{
        fontSize:'10pt'
    }
}))
const DrawerPrincipal = () => {
    const classes=useStyles()
    return (
        <>
        <AppBarPrincipal />
        <Drawer 
        className={classes.drawer} 
        classes={{paper:classes.drawerPaper}}
        variant='permanent'
        anchor='left'
        >
            <div className={classes.toolbar}>
                <img src={Imagen1} style={{ width: 60, height:48,marginLeft:'5rem',paddingTop:'0.5rem' }} alt="#" />
            </div>
            <Divider />
            <List component='nav'>
                <ListItem button component={Link} to='/' style={{color:'yellowgreen'}}>
                    <ListItemIcon >
                        <ArrowRightAltIcon style={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Inicio</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/estudiantes' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Estudiantes</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/carreras' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Carreras</span></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/tesis' style={{color:'yellowgreen'}}>
                    <ListItemIcon>
                        <ArrowRightAltIcon style={{color:'white'}} />
                    </ListItemIcon>
                    <ListItemText><span className={classes.tamano}>Tesis</span></ListItemText>
                </ListItem>
            </List>
        </Drawer>
        </>
    )
}

export default DrawerPrincipal
