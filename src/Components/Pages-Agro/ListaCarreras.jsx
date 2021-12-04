import { Box, Button, Dialog, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Main } from '../Organismsm/NewDrawer'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ListaSedes from './ListaSedes'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    tablePadding: {
        padding: 0
    },
    tableBody:{
        padding:15
    }
}))
const ListaCarreras = () => {
    const classes = useStyles()
    const [carrera, setCarrera] = useState([])
    const [sede, setSede] = useState([])
    const [openAddCarrera, setOpenAddCarrera] = useState(false)
    const [openEditCarrera, setOpenEditCarrera] = useState(false)
    const [openDeleteCarrera, setOpenDeleteCarrera] = useState(false)
    const [changeData, setChangeData] = useState({
        nameCarrera: '',
        nameSede: '',
        nameFacultad: '',
    })

    useEffect(() => {
        getCarrera()
        getSede()
    }, [])

    //--------------------REGISTRAR CARRERA----------------------
    const openModalAddCarrera = () => {
        setOpenAddCarrera(true)
    }
    const closeModalAddCarrera = () => {
        setOpenAddCarrera(false)
    }
    const postCarrera = async (e) => {
        e.preventDefault()
        var data = {
            idSede: changeData.nameSede.idSede,
            nameSede: changeData.nameSede.nameSede,
            nameFacultad: changeData.nameFacultad,
            nameCarrera: changeData.nameCarrera,
        }
        try {
            const result = await ipcRenderer.invoke("post-carrera", data)
            closeModalAddCarrera()
            getCarrera()
            console.log(JSON.parse(result))

        } catch (error) {
            console.log(error)
        }
        // console.log(data)
        // console.log(changeData)

    }

    //---------------------GET CARRERA------------------------------------
    const getCarrera = async () => {
        try {
            const result = await ipcRenderer.invoke("get-carrera")
            setCarrera(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------GET SEDE------------------------------------
    const getSede = async () => {
        try {
            const result = await ipcRenderer.invoke("get-sede")
            setSede(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //-----------------------EDIT CARRERA--------------------------------
    const openModalEditCarrera = (e) => {
        setChangeData(e)
        setOpenEditCarrera(true)
    }
    const closeModalEditCarrera = () => {
        setOpenEditCarrera(false)
    }
    const editCarrera = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("edit-carrera", changeData)
            console.log(JSON.parse(result))
            closeModalEditCarrera()
            getCarrera()
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------DELETE CARRERA-----------------------------------
    const openModalDeleteCarrera = (e) => {
        setChangeData(e)
        setOpenDeleteCarrera(true)
    }
    const closeModalDeleteCarrera = () => {
        setOpenDeleteCarrera(false)
    }
    const deleteCarrera = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("delete-carrera", changeData)
            console.log(JSON.parse(result))
            closeModalDeleteCarrera()
            getCarrera()
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
        <>
            <Main>
                <Typography align='center' variant='h5' className={classes.spacingBot}>CARRERAS</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <ListaSedes uno={getSede} dos={getCarrera}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button
                            variant='contained'
                            className={classes.spacingBot}
                            size='small'
                            endIcon={<LocalLibraryIcon />}
                            style={{ background: 'green', color: 'white' }}
                            onClick={openModalAddCarrera}
                        >registrar</Button>
                        <Paper container={Box} p={1} className={classes.spacingBot}>
                            <TableContainer style={{ maxHeight: 540 }}>
                                <Table stickyHeader>
                                    <TableHead >
                                        <TableRow >
                                            <TableCell style={{ width: "5%" }}>N°</TableCell>
                                            <TableCell style={{ width: "35%" }}>Nombre Sede</TableCell>
                                            <TableCell style={{ width: "45%" }}>Nombre Carrera</TableCell>
                                            <TableCell style={{ width: "15%" }} align='center'>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {carrera.length > 0 ? (
                                            carrera.map((c, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className={classes.tableBody}>{index+1}</TableCell>
                                                    <TableCell className={classes.tableBody}>{c.nameSede}</TableCell>
                                                    <TableCell className={classes.tableBody}>{c.nameCarrera}</TableCell>
                                                    <TableCell className={classes.tableBody}>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='edit'>
                                                                <IconButton size='small' onClick={() => openModalEditCarrera(c)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete' onClick={() => openModalDeleteCarrera(c)}>
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
                    </Grid>
                </Grid>
            </Main>
            <Dialog
                open={openAddCarrera}
                onClose={closeModalAddCarrera}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>REGISTRAR CARRERA</Typography>
                    <form onSubmit={postCarrera}>
                        <TextField
                            name='nameSede'
                            label='Nombre de Sede'
                            variant='outlined'
                            size='small'
                            fullWidth
                            select
                            className={classes.spacingBot}
                            value={changeData.nameSede}
                            onChange={handleChange}
                            required
                        >
                            {sede && sede.map((s, index) => (
                                <MenuItem key={index} value={s}>{s.nameSede}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name='nameFacultad'
                            label='Facultad'
                            variant='outlined'
                            size='small'
                            fullWidth
                            select
                            className={classes.spacingBot}
                            value={changeData.nameFacultad}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value='Facultad de Artes'>Facultad de Artes</MenuItem>
                            <MenuItem value='Facultad de Ciencias Agrícolas y Pecuarias'>Facultad de Ciencias Agrícolas y Pecuarias</MenuItem>
                            <MenuItem value='Facultad de Ciencias Económicas Financieras y Administrativas'>Facultad de Ciencias Económicas Financieras y Administrativas</MenuItem>
                            <MenuItem value='Facultad de Ciencias Puras'>Facultad de Ciencias Puras</MenuItem>
                            <MenuItem value='Facultad de Ciencias Sociales y Humanísticas'>Facultad de Ciencias Sociales y Humanísticas</MenuItem>
                            <MenuItem value='Facultad de Derecho'>Facultad de Derecho</MenuItem>
                            <MenuItem value='Facultad de Ingeniería'>Facultad de Ingeniería</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Geológica'>Facultad de Ingeniería Geológica</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Minera'>Facultad de Ingeniería Minera</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Tecnológica'>Facultad de Ingeniería Geológica</MenuItem>
                            <MenuItem value='Facultad de Ciencias de la Salud'>Facultad de Ciencias de la Salud</MenuItem>
                            <MenuItem value='Facultad de Medicina'>Facultad de Medicina</MenuItem>
                        </TextField>
                        <TextField
                            name='nameCarrera'
                            label='Nombre de Carrera'
                            variant='outlined'
                            size='small'
                            fullWidth
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>registrar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalAddCarrera}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*---------------EDITAR CARRERA--------------------*/}
            <Dialog
                open={openEditCarrera}
                onClose={closeModalEditCarrera}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR CARRERA</Typography>
                    <form onSubmit={editCarrera}>
                        <TextField
                            name='nameSede'
                            label='Nombre de Sede'
                            variant='outlined'
                            size='small'
                            fullWidth
                            select
                            className={classes.spacingBot}
                            value={changeData.nameSede}
                            onChange={handleChange}
                            required
                        >
                            {sede && sede.map((s, index) => (
                                <MenuItem key={index} value={s.nameSede}>{s.nameSede}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name='nameFacultad'
                            label='Facultad'
                            variant='outlined'
                            size='small'
                            fullWidth
                            select
                            className={classes.spacingBot}
                            value={changeData.nameFacultad}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value='Facultad de Artes'>Facultad de Artes</MenuItem>
                            <MenuItem value='Facultad de Ciencias Agrícolas y Pecuarias'>Facultad de Ciencias Agrícolas y Pecuarias</MenuItem>
                            <MenuItem value='Facultad de Ciencias Económicas Financieras y Administrativas'>Facultad de Ciencias Económicas Financieras y Administrativas</MenuItem>
                            <MenuItem value='Facultad de Ciencias Puras'>Facultad de Ciencias Puras</MenuItem>
                            <MenuItem value='Facultad de Ciencias Sociales y Humanísticas'>Facultad de Ciencias Sociales y Humanísticas</MenuItem>
                            <MenuItem value='Facultad de Derecho'>Facultad de Derecho</MenuItem>
                            <MenuItem value='Facultad de Ingeniería'>Facultad de Ingeniería</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Geológica'>Facultad de Ingeniería Geológica</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Minera'>Facultad de Ingeniería Minera</MenuItem>
                            <MenuItem value='Facultad de Ingeniería Tecnológica'>Facultad de Ingeniería Geológica</MenuItem>
                            <MenuItem value='Facultad de Ciencias de la Salud'>Facultad de Ciencias de la Salud</MenuItem>
                            <MenuItem value='Facultad de Medicina'>Facultad de Medicina</MenuItem>
                        </TextField>
                        <TextField
                            name='nameCarrera'
                            label='Nombre de Carrera'
                            variant='outlined'
                            size='small'
                            fullWidth
                            defaultValue={changeData.nameCarrera}
                            className={classes.spacingBot}
                            onChange={handleChange}
                            required
                        />
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>editar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalEditCarrera}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*---------------ELIMINAR CARRERA--------------------*/}
            <Dialog
                open={openDeleteCarrera}
                onClose={closeModalDeleteCarrera}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de eliminar la de " {changeData.nameCarrera} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={deleteCarrera}>eliminar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalDeleteCarrera}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default ListaCarreras
