import { Box, Button, Dialog, Grid, makeStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    tablePadding: {
        padding: 0
    }
}))
const ListaSedes = (props) => {
    const classes = useStyles()
    const [sede, setSede] = useState([])
    const [openAddSede, setOpenAddSede] = useState(false)
    const [openEditSede, setOpenEditSede] = useState(false)
    const [openDeleteSede, setOpenDeleteSede] = useState(false)
    const [changeData, setChangeData] = useState({
        nameSede: '',
    })

    useEffect(() => {
        getSede()
    }, [])

    //--------------------REGISTRAR CARRERA----------------------
    const openModalAddSede = () => {
        setOpenAddSede(true)
    }
    const closeModalAddSede = () => {
        setOpenAddSede(false)
    }
    const postSede = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("post-sede", changeData)
            closeModalAddSede()
            getSede()
            props.uno()
            console.log(JSON.parse(result))

        } catch (error) {
            console.log(error)
        }

    }

    //---------------------GET SEDE------------------------------------
    const getSede = async () => {
        try {
            const result = await ipcRenderer.invoke("get-sede")
            setSede(JSON.parse(result))
            // props.dos()
        } catch (error) {
            console.log(error)
        }
    }
    //-----------------------EDIT CARRERA--------------------------------
    const openModalEditSede = (e) => {
        setChangeData(e)
        setOpenEditSede(true)
    }
    const closeModalEditSede = () => {
        setOpenEditSede(false)
    }
    const editSede = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("edit-sede", changeData)
            console.log(JSON.parse(result))
            closeModalEditSede()
            getSede()
            props.uno()
            props.dos()
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------DELETE CARRERA-----------------------------------
    const openModalDeleteSede = (e) => {
        setChangeData(e)
        setOpenDeleteSede(true)
    }
    const closeModalDeleteSede = () => {
        setOpenDeleteSede(false)
    }
    const deleteSede = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("delete-sede", changeData)
            console.log(JSON.parse(result))
            closeModalDeleteSede()
            getSede()
            props.dos()
        } catch (error) {
            console.log(error)
        }
    }
    //-------------------HANDLE CHANGE----------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------------------------------------------------------
    return (
        <div>
            <Button
                variant='contained'
                className={classes.spacingBot}
                size='small'
                endIcon={<LocalLibraryIcon />}
                style={{ background: 'green', color: 'white' }}
                onClick={openModalAddSede}
            >registrar</Button>
            <Paper container={Box} p={1} className={classes.spacingBot}>
                <TableContainer style={{ maxHeight: 540 }}>
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow >
                                <TableCell style={{width:'5%'}}>N°</TableCell>
                                <TableCell style={{width:'50%'}}>Nombre Sede</TableCell>
                                <TableCell align='center'>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sede.length > 0 ? (
                                sede.map((c, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{c.nameSede}</TableCell>
                                        <TableCell>
                                            <Grid container justifyContent='space-evenly'>
                                                <Tooltip title='edit'>
                                                    <IconButton size='small' onClick={() => openModalEditSede(c)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title='delete' onClick={() => openModalDeleteSede(c)}>
                                                    <IconButton size='small'>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell align='center' colSpan='3'>no existe informacion</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {/*---------------REGISTRAR SEDE--------------------*/}
            <Dialog
                open={openAddSede}
                onClose={closeModalAddSede}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>REGISTRAR SEDE</Typography>
                    <form onSubmit={postSede}>
                        <TextField
                            name='nameSede'
                            label='Nombre de Sede'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />

                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalAddSede}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*---------------EDITAR CARRERA--------------------*/}
            <Dialog
                open={openEditSede}
                onClose={closeModalEditSede}
                maxWidth='md'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR SEDE</Typography>
                    <form onSubmit={editSede}>
                        <TextField
                            name='nameSede'
                            label='Nombre de Sede'
                            variant='outlined'
                            size='small'
                            fullWidth
                            defaultValue={changeData.nameSede}
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />

                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>edit</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalAddSede}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*---------------ELIMINAR CARRERA--------------------*/}
            <Dialog
                open={openDeleteSede}
                onClose={closeModalDeleteSede}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de eliminar " {changeData.nameSede} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={deleteSede}>eliminar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalDeleteSede}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>

        </div>
    )
}

export default ListaSedes
