import { Box, Button, Container, Dialog, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Main } from '../Organismsm/NewDrawer'
import BookTesisIcon from '@material-ui/icons/Bookmarks'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
// import { ipcRenderer } from 'electron/renderer'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const ListaTesis = () => {
    const classes = useStyles()
    const [proyecto, setProyecto] = useState([])
    const [openAddProyecto, setOpenAddProyecto] = useState(false)
    const [openEditProyecto, setOpenEditProyecto] = useState(false)
    const [openDeleteProyecto, setOpenDeleteProyecto] = useState(false)
    const [changeData, setChangeData] = useState({
        firstNameEst: '',
        lastNameEstP: '',
        lastNameEstM: '',
        edadEst: '',
        sexoEst: '',
        nameCarrera: '',
        fonoEst: '',
        ciEst: '',
        nameProyecto: '',
        calificacion: '',
        requisito1: '',
        requisito2: '',
        requisito3: '',
    })

    useEffect(() => {
        getProyectos()
    }, [])
    //-----------REGISTRO DE PROYECTOS------------
    const openModalAddProyecto = () => {
        setOpenAddProyecto(true)
    }
    const closeModalAddProyecto = () => {
        setOpenAddProyecto(false)
        setName([])
    }
    const postProyecto = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("post-proyecto", changeData)
            console.log(JSON.parse(result))
            closeModalAddProyecto()
            getProyectos()
        } catch (error) {
            console.log(error)
        }
        // console.log(changeData)

    }
    //-----------------GET PROYECTOS-----------------
    const getProyectos = async () => {
        try {
            const result = await ipcRenderer.invoke("get-proyecto")
            setProyecto(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //----------------EDIT PROYECTO-----------
    const openModalEditProyecto = (e) => {
        setChangeData(e)
        setOpenEditProyecto(true)
    }
    const closeModalEditProyecto = () => {
        setOpenEditProyecto(false)
    }
    const editProyecto = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("edit-proyecto", changeData)
            console.log(JSON.parse(result))
            closeModalEditProyecto()
            getProyectos()
        } catch (error) {
            console.log(error)
        }

        // console.log(changeData)
    }
    //----------------DELETE PROYECTO-----------
    const openModalDeleteProyecto = (e) => {
        setChangeData(e)
        setOpenDeleteProyecto(true)
    }
    const closeModalDeleteProyecto = () => {
        setOpenDeleteProyecto(false)
    }
    const deleteProyecto = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("delete-proyecto", changeData)
            console.log(JSON.parse(result))
            closeModalDeleteProyecto()
            getProyectos()
        } catch (error) {
            console.log(error)
        }
    }
    //----------------HANDLE CHANGE-------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //------------BUSCAR ESTUDIANTE-----------
    const [name, setName] = useState([])
    const getEstudiante = async (e) => {
        e.preventDefault()
        const ciEst = changeData.ciEst
        try {
            const result = await ipcRenderer.invoke("search-estudiante", ciEst)
            setName(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }

    }
    //-----------------------
    // console.log(proyecto)
    return (
        <>
            <Main>
                <Typography align='center' variant='h5' className={classes.spacingBot} >MODALIDAD DE GRADO</Typography>
                <Button
                    size='small'
                    variant='contained'
                    style={{ background: 'green', color: 'white' }}
                    className={classes.spacingBot}
                    endIcon={<BookTesisIcon />}
                    onClick={openModalAddProyecto}
                >registrar</Button>
                <Paper component={Box} p={1}>
                    <TableContainer style={{ maxHeight: 540 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre Estudiante</TableCell>
                                    <TableCell>Carrera</TableCell>
                                    <TableCell>Titilo de Proyecto</TableCell>
                                    <TableCell>Calificacion</TableCell>
                                    <TableCell>Requisitos</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {proyecto.length > 0 ? (
                                    proyecto.map((p, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{p.firstNameEst} {p.lastNameEstP} {p.lastNameEstM}</TableCell>
                                            <TableCell>{p.nameCarrera}</TableCell>
                                            <TableCell>{p.nameProyecto}</TableCell>
                                            <TableCell>{p.calificacion}</TableCell>
                                            <TableCell>
                                                {p.requisito1 === 'si' ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }}/>}
                                                {p.requisito2 === 'si' ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }}/>}
                                                {p.requisito3 === 'si' ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }}/>}
                                            </TableCell>
                                            <TableCell>
                                                <Grid container justifyContent='space-evenly'>
                                                    <Tooltip title='edit'>
                                                        <IconButton size='small' onClick={() => openModalEditProyecto(p)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='delete' onClick={() => openModalDeleteProyecto(p)}>
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
                                        <TableCell align='center' colSpan='5'>no existe informacion</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Main>
            {/*------------------REGISTRO DE PROYECTOS----------------*/}
            <Dialog
                open={openAddProyecto}
                onClose={closeModalAddProyecto}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>REGISTRO DE PROYECTO</Typography>
                    <Container maxWidth='sm'>
                        <Grid container >
                            <form onSubmit={getEstudiante}>
                                <TextField
                                    name='ciEst'
                                    label='Cedula de Identidad'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required

                                />
                                <Button type='submit' style={{ display: 'none' }}></Button>
                            </form>
                            {name.length > 0 ? (
                                <Grid container justifyContent='space-evenly'>
                                    <TextField
                                        label='Nombre Completo'
                                        variant='outlined'
                                        size='small'
                                        className={classes.spacingBot}
                                        fullWidth
                                        value={`${name[0].firstNameEst} ${name[0].lastNameEstP} ${name[0].lastNameEstM}`}
                                    />
                                    <TextField
                                        label='Carrera'
                                        variant='outlined'
                                        size='small'
                                        className={classes.spacingBot}
                                        fullWidth
                                        value={name[0].nameCarrera}
                                    />
                                </Grid>
                            ) : null}
                            <form onSubmit={postProyecto}>
                                <TextField
                                    name='nameProyecto'
                                    label='Titulo del Proyecto'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='calificacion'
                                    label='Calificacion del Proyecto'
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='requisito1'
                                    label='Requisito N° 1'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito1}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                                <TextField
                                    name='requisito2'
                                    label='Requisito N° 2'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito2}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                                <TextField
                                    name='requisito3'
                                    label='Requisito N° 3'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito3}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                                <Grid container justifyContent='space-evenly'>
                                    <Button size='small' variant='contained' color='primary' type='submit'>registrar</Button>
                                    <Button size='small' variant='contained' color='secondary' onClick={closeModalAddProyecto}>cancelar</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Container>
                </Paper>
            </Dialog>
            {/*------------------EDITAR DE PROYECTOS----------------*/}
            <Dialog
                open={openEditProyecto}
                onClose={closeModalEditProyecto}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR DE PROYECTO</Typography>
                    <form onSubmit={editProyecto}>
                        <TextField
                            name='nameProyecto'
                            label='Titulo del Proyecto'
                            variant='outlined'
                            size='small'
                            className={classes.spacingBot}
                            defaultValue={changeData.nameProyecto}
                            fullWidth
                            onChange={handleChange}
                            required
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='firstNameEst'
                                    label='Nombres'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.firstNameEst}
                                />
                                <TextField
                                    label='Apellido P'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.lastNameEstP}
                                />
                                <TextField
                                    label='Apellido M'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.lastNameEstM}
                                />
                                <TextField
                                    label='Cedula de Identidad'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    value={changeData.ciEst}
                                    fullWidth
                                />
                                <TextField
                                    label='Carrera'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.nameCarrera}
                                />


                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='calificacion'
                                    label='Calificacion del Proyecto'
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    className={classes.spacingBot}
                                    defaultValue={changeData.calificacion}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='requisito1'
                                    label='Requisito N° 1'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito1}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                                <TextField
                                    name='requisito2'
                                    label='Requisito N° 2'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito2}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                                <TextField
                                    name='requisito3'
                                    label='Requisito N° 3'
                                    variant='outlined'
                                    size='small'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.requisito3}
                                    align='center'
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='si'>si</MenuItem>
                                    <MenuItem value='no'>no</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid container justifyContent='space-evenly'>
                                <Button size='small' variant='contained' color='primary' type='submit'>editar</Button>
                                <Button size='small' variant='contained' color='secondary' onClick={closeModalEditProyecto}>cancelar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*------------------ELIMINAR DE PROYECTOS----------------*/}
            <Dialog
                open={openDeleteProyecto}
                onClose={closeModalDeleteProyecto}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de eliminar el regitro de Tesis del estudiante" {changeData.firstNameEst} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={deleteProyecto}>eliminar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalDeleteProyecto}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default ListaTesis
