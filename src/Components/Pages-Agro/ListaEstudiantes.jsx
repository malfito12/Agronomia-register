import { Box, Button, Dialog, Grid, Paper, Table, MenuItem, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, TableBody, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Main } from '../Organismsm/NewDrawer'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const ListaEstudiantes = () => {
    const classes = useStyles()
    const [estudiante, setEstudiante] = useState([])
    const [contEstudiante, setContEstudiante] = useState([])
    const [sede, setSede] = useState([])
    const [carrera, setCarrera] = useState([])
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [openAddEstudiante, setOpenAddEstudiante] = useState(false)
    const [openEditEstudiante, setOpenEditEstudiante] = useState(false)
    const [openDeleteEstudiante, setOpenDeleteEstudiante] = useState(false)
    const [changeData, setChangeData] = useState({
        firstNameEst: '',
        lastNameEstP: '',
        lastNameEstM: '',
        nameCarrera: '',
        nameSede: '',
        // edadEst: '',
        ciEst: '',
        fechaNacimientoEst: '',
        sexoEst: '',
        carreraEst: '',
        fonoEst: '',
        image: ''
    })
    const [changeData2, setChangeData2] = useState({
        firstNameEst: '',
        lastNameEstP: '',
        lastNameEstM: '',
        nameCarrera: '',
        nameSede: '',
        // edadEst: '',
        ciEst: '',
        fechaNacimientoEst: '',
        sexoEst: '',
        carreraEst: '',
        fonoEst: '',
        image: ''
    })

    useEffect(() => {
        getSede()
        getEstudiante()
        getContEstudent()
        // getMujer()
        // getHombre()
        // getMenor()
    }, [])
    //-------------------REGISTRAR ESTUDIANTE-------------------------
    const openModalAddEstudiante = () => {
        setOpenAddEstudiante(true)
    }
    const closeModalAddEstudiante = () => {
        setOpenAddEstudiante(false)
    }
    const postEstudiante = async (e) => {
        e.preventDefault()
        // console.log(changeData)
        const data = {
            firstNameEst: changeData.firstNameEst,
            lastNameEstP: changeData.lastNameEstP,
            lastNameEstM: changeData.lastNameEstM,
            nameCarrera: changeData.nameCarrera.nameCarrera,
            idCarrera: changeData.nameCarrera.idCarrera,
            nameSede: changeData.nameSede.nameSede,
            idSede: changeData.nameSede.idSede,
            // edadEst: changeData.edadEst,
            ciEst: changeData.ciEst,
            fechaNacimientoEst: changeData.fechaNacimientoEst,
            sexoEst: changeData.sexoEst,
            fonoEst: changeData.fonoEst,
            image: preview
        }
        try {
            const result = await ipcRenderer.invoke("post-estudiante", data)
            var message = JSON.parse(result)
            // console.log(JSON.parse(result))
            closeModalAddEstudiante()

            getEstudiante()
            if (message.message === 'estudiante registrado') {
                alert('estudiante registrado')
            } else {
                alert('error')
            }
        } catch (error) {
            console.log(error)
        }

        // console.log(data)
    }
    //------------------GET CARRERA-------------------------------
    const getCarrera = async (e) => {
        try {
            const result = await ipcRenderer.invoke("get-carrera-id", e)
            setCarrera(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    const getSede = async () => {
        try {
            const result = await ipcRenderer.invoke("get-sede")
            setSede(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //------------------GET ESTUDIANTE----------------------------------
    const getEstudiante = async () => {
        document.getElementById("todo").style.display = 'block'
        document.getElementById("buscador").style.display = 'none'

        try {
            const result = await ipcRenderer.invoke("get-estudiante")
            setEstudiante(JSON.parse(result))

            // setEstudianteAux(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }

    //-------------------EDIT ESTUDIANTE---------------------------------
    const openModalEditEstudiante = (e) => {
        setChangeData2(e)
        setPreview(e.image)
        getCarrera(e.nameSede)
        setOpenEditEstudiante(true)
    }
    const closeModalEditEstudiante = () => {
        setOpenEditEstudiante(false)
    }
    const editEstudiante = async (e) => {
        e.preventDefault()
        var data = {
            _id: changeData2._id,
            firstNameEst: changeData2.firstNameEst,
            lastNameEstP: changeData2.lastNameEstP,
            lastNameEstM: changeData2.lastNameEstM,
            nameCarrera: changeData2.nameCarrera,
            nameSede: changeData2.nameSede,
            idCarrera: changeData2.idCarrera,
            idSede: changeData2.idSede,
            // edadEst: changeData2.edadEst,
            ciEst: changeData2.ciEst,
            fechaNacimientoEst: changeData2.fechaNacimientoEst,
            sexoEst: changeData2.sexoEst,
            fonoEst: changeData2.fonoEst,
            image: preview
        }
        try {
            const result = await ipcRenderer.invoke("edit-estudiante", data)
            console.log(JSON.parse(result))
            closeModalEditEstudiante()
            getEstudiante()
        } catch (error) {
            console.log(error)
        }
        // console.log(data)
        // console.log(changeData2)

    }
    //-------------------DELETE ESTUDIANTE----------------------------------
    const openModalDeleteEstudiante = (e) => {
        setChangeData(e)
        setOpenDeleteEstudiante(true)
    }
    const closeModalDeleteEstudiante = () => {
        setOpenDeleteEstudiante(false)
    }
    const deleteEstudiante = async (e) => {
        e.preventDefault()
        try {
            const result = await ipcRenderer.invoke("delete-estudiante", changeData)
            console.log(JSON.parse(result))
            closeModalDeleteEstudiante()
            getEstudiante()
            getContEstudent()
        } catch (error) {
            console.log(error)
        }
    }
    //----------------------GET CARRERA------------------------------
    // const getCarrera=async()=>{
    //     try {
    //         const result=await ipcRenderer.invoke('get-carrera')
    //         setCarrera()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    //----------------------HANDLE CHANGE----------------------------
    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.files[0])
                }
            }
        }
        // console.log(e)

        if (e.target.name === 'nameSede') {
            getCarrera(e.target.value.nameSede)
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    const handleChange2 = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.files[0])
                }
            }
        }
        // console.log(e)
        if (e.target.name === 'nameSede') {
            getCarrera(e.target.value)
        }
        setChangeData2({
            ...changeData2,
            [e.target.name]: e.target.value
        })
    }
    //-----------------GET CONTADOR ESTUDIANTES--------------------------------
    const getContEstudent = async () => {
        try {
            const result = await ipcRenderer.invoke("get-cont-estudiantes")
            setContEstudiante(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }

    }
    //-----------------BUSCADOR--------------------------------
    const [encontrado, setEncontrado] = useState([])
    const [changeBuscador, setChangeBuscador] = useState({
        desde: '',
        hasta: '',
        sexo: '',
        nameSede: '',
        nameCarrera: '',
    })
    const getbuscardor = async (e) => {
        e.preventDefault()
        document.getElementById("todo").style.display = 'none'
        document.getElementById("buscador").style.display = 'block'
        // console.log(changeBuscador)
        try {
            const data={
                desde:changeBuscador.desde,
                hasta:changeBuscador.hasta,
                sexo:changeBuscador.sexo,
                nameSede:changeBuscador.nameSede.nameSede,
                nameCarrera:changeBuscador.nameCarrera.nameCarrera,

            }
            // const result = await ipcRenderer.invoke('buscar-edad', changeBuscador)
            const result = await ipcRenderer.invoke('buscar-edad', data)
            setEncontrado(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }

    }
    const handleBuscador = (e) => {
        if (e.target.name === 'nameSede') {
            getCarrera(e.target.value.nameSede)
        }
        setChangeBuscador({
            ...changeBuscador,
            [e.target.name]: e.target.value
        })
    }

    //-----------------ARRAY--------------------------------
    // const array = []
    // for (var i = 0; i < estudiante.length; i++) {
    //     array.push(estudiante[i])
    // }
    // //-----------------GET TODOS--------------------------------
    // const getTodos = async () => {
    //     setEstudianteAux(array)
    // }
    // //-----------------GET ESTUDIANTES ENTRE 20 Y 25--------------------------------
    // const getMenores = async () => {
    //     // const edad='25'
    //     // const as=moment().diff("1994-02-13",'years',false)
    //     const filtered = array.filter(e => {
    //         // return e.lastNameEstP==='Maraza'
    //         var prueba = moment().diff(`${e.fechaNacimientoEst}`, 'years', false)
    //         if (prueba >= 20 && prueba <= 25) {
    //             return e
    //         }
    //     })
    //     setEstudianteAux(filtered)
    // }
    // //-------------------GET ESTUDIANTES HOMBRES--------------------------
    // const getHombres = () => {
    //     const filtered = array.filter(e => {
    //         return e.sexoEst === 'Masculino'
    //     })
    //     setEstudianteAux(filtered)
    // }
    // //-------------------GET ESTUDIANTES MEJERES--------------------------
    // const getMujeres = () => {
    //     const filtered = array.filter(e => {
    //         return e.sexoEst === 'Femenino'
    //     })
    //     setEstudianteAux(filtered)
    // }
    //---------------------------------------------------
    //---------------------------------------------------
    // console.log(estudiante)
    // console.log(contEstudiante)
    // console.log(encontrado)
    return (
        <>
            <Main>
                <Typography variant='h5' align='center' style={{ marginBottom: '3rem' }}>ESTUDIANTES</Typography>
                <Grid container spacing={2} className={classes.spacingBot}>
                    <Grid item xs={12} sm={3}>
                        <Paper component={Box} p={2}>
                            <Typography variant='subtitle2'>Estudiantes Masculinos : {contEstudiante.contHombre}</Typography>
                            <Typography variant='subtitle2'>Estudiantes Femeninos : {contEstudiante.contMujeres}</Typography>
                            <Typography className={classes.spacingBot} variant='subtitle2'>Total Estudiantes : {contEstudiante.constEstudiantes}</Typography>
                            <Typography align='center' variant='subtitle2' className={classes.spacingBot}>INTRODUSCA EDADES</Typography>
                            <form onSubmit={getbuscardor} className={classes.spacingBot}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='desde'
                                            label='Edad Desde'
                                            variant='outlined'
                                            size='small'
                                            type='number'
                                            className={classes.spacingBot}
                                            // fullWidth
                                            onChange={handleBuscador}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name='hasta'
                                            label='Edad Hasta'
                                            variant='outlined'
                                            size='small'
                                            type='number'
                                            className={classes.spacingBot}
                                            // fullWidth
                                            onChange={handleBuscador}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    name='sexo'
                                    label='Sexo'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    select
                                    value={changeBuscador.sexo}
                                    onChange={handleBuscador}
                                >
                                    <MenuItem value='Masculino'>Masculino</MenuItem>
                                    <MenuItem value='Femenino'>Femenino</MenuItem>
                                    <MenuItem value='Otros'>Otros</MenuItem>
                                </TextField>
                                <TextField
                                    name='nameSede'
                                    label='Sede'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeBuscador.nameSede}
                                    onChange={handleBuscador}
                                    required
                                >
                                    {sede && sede.map((s, index) => (
                                        <MenuItem key={index} value={s}>{s.nameSede}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='nameCarrera'
                                    label='Carrera'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeBuscador.nameCarrera}
                                    onChange={handleBuscador}
                                    required
                                >
                                    {carrera.map((c, index) => (
                                        <MenuItem key={index} value={c}>{c.nameCarrera}</MenuItem>
                                    ))}
                                </TextField>
                                <Button size='small' variant='outlined' style={{ background: 'green', color: 'white' }} endIcon={<SearchIcon />} type='submit' fullWidth>Buscar</Button>
                            </form>
                            <Button variant='contained' color='primary' size='small' className={classes.spacingBot} fullWidth onClick={getEstudiante}>Busqueda General</Button>
                            <Button
                                variant='contained'
                                style={{ background: 'green', color: 'white' }}
                                size='small'
                                fullWidth
                                onClick={openModalAddEstudiante}
                                endIcon={<AccountCircleIcon />}
                            >registrar</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        {/*-------TABLA TODO---------*/}
                        <Paper id='todo' component={Box} p={1} className={classes.spacingBot}>
                            <TableContainer style={{ maxHeight: 540 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>N°</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Apellido P</TableCell>
                                            <TableCell>Apellido M</TableCell>
                                            <TableCell>sexo</TableCell>
                                            <TableCell>Carrera</TableCell>
                                            <TableCell>Telefono</TableCell>
                                            <TableCell>fecha Nacimiento</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {estudiante.length > 0 ? (
                                            estudiante.map((e, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{e.firstNameEst}</TableCell>
                                                    <TableCell>{e.lastNameEstP}</TableCell>
                                                    <TableCell>{e.lastNameEstM}</TableCell>
                                                    <TableCell>{e.sexoEst}</TableCell>
                                                    <TableCell>{e.nameCarrera}</TableCell>
                                                    <TableCell>{e.fonoEst}</TableCell>
                                                    <TableCell>{e.fechaNacimientoEst}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='edit'>
                                                                <IconButton size='small' onClick={() => openModalEditEstudiante(e)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete' onClick={() => openModalDeleteEstudiante(e)}>
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
                                                <TableCell align='center' colSpan='7'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {/*---------------- buscador--------------*/}
                        <Paper id='buscador' component={Box} p={1} className={classes.spacingBot} style={{ display: 'none' }}>
                            <TableContainer style={{ maxHeight: 540 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>N°</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Apellido P</TableCell>
                                            <TableCell>Apellido M</TableCell>
                                            <TableCell>sexo</TableCell>
                                            <TableCell>Carrera</TableCell>
                                            <TableCell>Telefono</TableCell>
                                            <TableCell>fecha Nacimiento</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {encontrado.length > 0 ? (
                                            encontrado.map((e, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{e.firstNameEst}</TableCell>
                                                    <TableCell>{e.lastNameEstP}</TableCell>
                                                    <TableCell>{e.lastNameEstM}</TableCell>
                                                    <TableCell>{e.sexoEst}</TableCell>
                                                    <TableCell>{e.nameCarrera}</TableCell>
                                                    <TableCell>{e.fonoEst}</TableCell>
                                                    <TableCell>{e.fechaNacimientoEst}</TableCell>
                                                    <TableCell>
                                                        <Grid container justifyContent='space-evenly'>
                                                            <Tooltip title='edit'>
                                                                <IconButton size='small' onClick={() => openModalEditEstudiante(e)}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='delete' onClick={() => openModalDeleteEstudiante(e)}>
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
                                                <TableCell colSpan='8' align='center'>no existe informacion</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Main>
            {/*----------------REGISTRAR ESTUDIANTE------------------*/}
            <Dialog
                open={openAddEstudiante}
                onClose={closeModalAddEstudiante}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>REGISTRAR ESTUDIANTE</Typography>
                    <form onSubmit={postEstudiante}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='firstNameEst'
                                    label='Nombre Completo'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='lastNameEstP'
                                    label='Apellido Paterno'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='lastNameEstM'
                                    label='Apellido Materno'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
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
                                {/* <TextField
                                    name='edadEst'
                                    label='Edad'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    type='number'
                                    onChange={handleChange}
                                    required
                                /> */}
                                <TextField
                                    name='nameSede'
                                    label='Sede'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.nameSede}
                                    onChange={handleChange}
                                    required
                                >
                                    {sede && sede.map((s, index) => (
                                        <MenuItem key={index} value={s}>{s.nameSede}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='nameCarrera'
                                    label='Carrera'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.nameCarrera}
                                    onChange={handleChange}
                                    required
                                >
                                    {carrera.map((c, index) => (
                                        <MenuItem key={index} value={c}>{c.nameCarrera}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='fechaNacimientoEst'
                                    label='Fecha de Nacimiento'
                                    variant='outlined'
                                    size='small'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div align='center' className={classes.spacingBot}>
                                    <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '150px', height: '150px' }}>
                                        <img src={preview} style={{ width: '100%', height: '100%' }} alt='#' />
                                    </Paper>
                                    <input
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        id='file-image'
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor='file-image'>
                                        <Button component='span' size='small' style={{ marginTop: '0.7rem' }} variant='contained' color='primary'>cargar</Button>
                                    </label>
                                </div>
                                <TextField
                                    name='sexoEst'
                                    label='Sexo'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData.sexoEst}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='Masculino'>Masculino</MenuItem>
                                    <MenuItem value='Femenino'>Femenino</MenuItem>
                                    <MenuItem value='Otros'>Otros</MenuItem>
                                </TextField>
                                <TextField
                                    name='fonoEst'
                                    label='Telefono'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid className={classes.spacingBot} container justifyContent='space-evenly'>
                            <Button size='small' type='submit' color='primary' variant='contained'>registrar</Button>
                            <Button size='small' onClick={closeModalAddEstudiante} color='secondary' variant='contained'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------EDITAR ESTUDIANTE------------------*/}
            <Dialog
                open={openEditEstudiante}
                onClose={closeModalEditEstudiante}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1' className={classes.spacingBot}>EDITAR ESTUDIANTE</Typography>
                    <form onSubmit={editEstudiante}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='firstNameEst'
                                    label='Nombre Completo'
                                    variant='outlined'
                                    size='small'
                                    defaultValue={changeData2.firstNameEst}
                                    className={classes.spacingBot}
                                    fullWidth
                                    onChange={handleChange2}
                                    required
                                />
                                <TextField
                                    name='lastNameEstP'
                                    label='Apellido Paterno'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.lastNameEstP}
                                    fullWidth
                                    onChange={handleChange2}
                                    required
                                />
                                <TextField
                                    name='lastNameEstM'
                                    label='Apellido Materno'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.lastNameEstM}
                                    fullWidth
                                    onChange={handleChange2}
                                    required
                                />
                                <TextField
                                    name='ciEst'
                                    label='Cedula de Identidad'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.ciEst}
                                    fullWidth
                                    onChange={handleChange2}
                                    required
                                />
                                {/* <TextField
                                    name='edadEst'
                                    label='Edad'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.edadEst}
                                    fullWidth
                                    type='number'
                                    onChange={handleChange2}
                                    required
                                /> */}
                                <TextField
                                    name='nameSede'
                                    label='Sede'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData2.nameSede}
                                    onChange={handleChange2}
                                    required
                                >
                                    {sede && sede.map((s, index) => (
                                        // <MenuItem key={index} value={c.nameCarrera}>{c.nameCarrera}</MenuItem>
                                        <MenuItem key={index} value={s.nameSede}>{s.nameSede}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='nameCarrera'
                                    label='Carrera'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData2.nameCarrera}
                                    onChange={handleChange2}
                                    required
                                >
                                    {carrera && carrera.map((c, index) => (
                                        <MenuItem key={index} value={c.nameCarrera}>{c.nameCarrera}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='fechaNacimientoEst'
                                    label='Fecha de Nacimiento'
                                    variant='outlined'
                                    size='small'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.fechaNacimientoEst}
                                    fullWidth
                                    onChange={handleChange2}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div align='center' className={classes.spacingBot}>
                                    <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '150px', height: '150px' }}>
                                        <img src={preview} style={{ width: '100%', height: '100%' }} alt='#' />
                                    </Paper>
                                    <input
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        id='file-image'
                                        style={{ display: 'none' }}
                                        onChange={handleChange2}
                                    />
                                    <label htmlFor='file-image'>
                                        <Button component='span' size='small' style={{ marginTop: '0.7rem' }} variant='contained' color='primary'>cargar</Button>
                                    </label>
                                </div>
                                <TextField
                                    name='sexoEst'
                                    label='Sexo'
                                    variant='outlined'
                                    size='small'
                                    align='center'
                                    select
                                    className={classes.spacingBot}
                                    fullWidth
                                    value={changeData2.sexoEst}
                                    onChange={handleChange2}
                                    required
                                >
                                    <MenuItem value='Masculino'>Masculino</MenuItem>
                                    <MenuItem value='Femenino'>Femenino</MenuItem>
                                    <MenuItem value='Otros'>Otros</MenuItem>
                                </TextField>
                                <TextField
                                    name='fonoEst'
                                    label='Telefono'
                                    variant='outlined'
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData2.fonoEst}
                                    fullWidth
                                    onChange={handleChange2}
                                />
                            </Grid>
                        </Grid>
                        <Grid className={classes.spacingBot} container justifyContent='space-evenly'>
                            <Button size='small' type='submit' color='primary' variant='contained'>editar</Button>
                            <Button size='small' onClick={closeModalEditEstudiante} color='secondary' variant='contained'>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            {/*----------------DELETE ESTUDIANTE------------------*/}
            <Dialog
                open={openDeleteEstudiante}
                onClose={closeModalDeleteEstudiante}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>¿Estas seguro de eliminar " {changeData.firstNameEst} "?</Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button size='small' variant='contained' color='primary' onClick={deleteEstudiante}>eliminar</Button>
                        <Button size='small' variant='contained' color='secondary' onClick={closeModalDeleteEstudiante}>cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>

        </>
    )
}

export default ListaEstudiantes
