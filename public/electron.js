const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const uuid = require('uuid')
const moment = require('moment')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/cachitambodb', {
mongoose.connect('mongodb://localhost/agronomia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(db => console.log("Base de Datos Conectada"))
  .catch(err => console.log(err));


//----------------------------BASE DE DATOS----------------------------------
//----------------------------REGISTRO DE SEDES----------------------------------
const SEDESCHEMA = {
  idSede: String,
  nameSede: String,
  registerDate: Date,
}
const SEDE = mongoose.model('sedes', SEDESCHEMA)
//----------------------------REGISTRO DE CARRERAS----------------------------------
const CARRERASCHEMA = {
  idCarrera: String,
  idSede: String,
  nameCarrera: String,
  nameSede: String,
  nameFacultad: String,
  registerDate: Date,
}
const CARRERA = mongoose.model('carreras', CARRERASCHEMA)
//-------------------------REGISTRO DE ESTUDIANTES----------------------
const ESTUDIANTESCHEMA = {
  idEstudiante: String,
  idCarrera: String,
  idSede: String,
  firstNameEst: String,
  lastNameEstP: String,
  lastNameEstM: String,
  // edadEst: String,
  ciEst: { type: String, require: true, trim: true, unique: true },
  fechaNacimientoEst: String,
  sexoEst: String,
  nameCarrera: String,
  nameSede: String,
  fonoEst: String,
  image: String,
  registerDate: String,
}
const ESTUDIANTE = mongoose.model('estudiantes', ESTUDIANTESCHEMA)
//------------------REGISTRO DE TESIS---------------------------------
const PROYECTOSSCHEMA = {
  idProyecto: String,
  idCarrera: String,
  idEstudiante: String,
  idSede: String,

  firstNameEst: String,
  lastNameEstP: String,
  lastNameEstM: String,
  edadEst: String,
  sexoEst: String,
  nameCarrera: String,
  nameSede: String,
  fonoEst: String,
  ciEst:String,
  nameProyecto: String,
  calificacion: String,
  requisito1: String,
  requisito2: String,
  requisito3: String,
  registerDate: String,
  fechaDefensa:String,
}
const PROYECTO = mongoose.model('proyectos', PROYECTOSSCHEMA)




//-------------------------REGISTROS ALMACEN---------------------------------------

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

//---------------REGISTRAR ENTRADAS Y SALIDAS--------------------

//---------------REGISTRAR INGRESO ALMACEN--------------------

//----------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------

let win

function createWindow() {
  win = new BrowserWindow({
    // width: 1400,
    // height: 900,
    show:false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      plugins: true,
    }
  })
  win.maximize()
  win.show()
  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



//-------------------------------REGISTRAR SEDE-------------------------------------
ipcMain.handle('post-sede', async (e, args) => {
  const result = args
  var fecha = new Date()
  fecha = moment(fecha).format("YYYY-MM-DD")
  const clave = uuid.v4()
  var data = { ...result, registerDate: fecha, idSede: clave }
  try {
    const sede = new SEDE(data)
    await sede.save()
    return JSON.stringify({ message: 'sede registrada' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------GET SEDE-------------------------------------
ipcMain.handle("get-sede", async (e, args) => {
  try {
    const sede = await SEDE.find({}).sort({ nameSede: 1 })
    return JSON.stringify(sede)
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------EDIT SEDE-------------------------------------
ipcMain.handle("edit-sede", async (e, args) => {
  const result = args
  try {
    const sede = await SEDE.findById({ _id: result._id })
    await SEDE.findByIdAndUpdate({ _id: result._id }, result)
    await CARRERA.updateMany({ idSede: sede.idSede }, { $set: { nameSede: result.nameSede } })
    await ESTUDIANTE.updateMany({ idSede: sede.idSede }, { $set: { nameSede: result.nameSede } })
    await PROYECTO.updateMany({ idSede: sede.idSede }, { $set: { nameSede: result.nameSede } })
    return JSON.stringify({ message: 'sede actualizada' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------DELETE SEDE-------------------------------------
ipcMain.handle("delete-sede", async (e, args) => {
  const result = args
  try {
    const sede = await SEDE.findById({ _id: result._id })
    await SEDE.findByIdAndDelete({ _id: result._id })
    await CARRERA.deleteMany({ idSede: sede.idSede })
    await ESTUDIANTE.deleteMany({ idSede: sede.idSede })
    await PROYECTO.deleteMany({ idSede: sede.idSede })
    return JSON.stringify({ message: 'sede eliminada' })
  } catch (error) {
    console.log(error)
  }
})

//-------------------------------REGISTRAR CARRERA-------------------------------------
ipcMain.handle('post-carrera', async (e, args) => {
  const result = args
  var fecha = new Date()
  const clave = uuid.v4()
  fecha = moment(fecha).format("YYYY-MM-DD")
  var data = { ...result, registerDate: fecha, idCarrera: clave }
  try {
    const carrera = new CARRERA(data)
    await carrera.save()
    return JSON.stringify({ message: 'carrera registrada' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------GET CARRERA-------------------------------------
ipcMain.handle("get-carrera", async (e, args) => {
  try {
    const carrera = await CARRERA.find({}).sort({ nameCarrera: 1 })
    return JSON.stringify(carrera)
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------GET CARRERA ID-------------------------------------
ipcMain.handle("get-carrera-id", async (e, args) => {
  const result = args
  try {
    const carrera = await CARRERA.find({ nameSede: result }).sort({ nameCarrera: 1 })
    return JSON.stringify(carrera)
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------EDIT CARRERA-------------------------------------
ipcMain.handle("edit-carrera", async (e, args) => {
  const result = args
  // console.log(result)
  try {
    const carrera = await CARRERA.findById({ _id: result._id })
    await CARRERA.findByIdAndUpdate({ _id: result._id }, result)
    await ESTUDIANTE.updateMany({ idCarrera: carrera.idCarrera }, { $set: { nameSede: result.nameSede, nameCarrera: result.nameCarrera, nameFacultad: result.nameFacultad } })
    await PROYECTO.updateMany({ idCarrera: carrera.idCarrera }, { $set: { nameSede: result.nameSede, nameCarrera: result.nameCarrera, nameFacultad: result.nameFacultad } })
    return JSON.stringify({ message: 'carrera actualizada' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------DELETE CARRERA-------------------------------------
ipcMain.handle("delete-carrera", async (e, args) => {
  const result = args
  try {
    const carrera = await CARRERA.findById({ _id: result._id })
    await CARRERA.findByIdAndDelete({ _id: result._id })
    await ESTUDIANTE.deleteMany({ idCarrera: carrera.idCarrera })
    await PROYECTO.deleteMany({ idCarrera: carrera.idCarrera })
    return JSON.stringify({ message: 'carrera eliminada' })
  } catch (error) {
    console.log(error)
  }
})


//-------------------------------REGISTRAR ESTUDIANTES---------------------------------
ipcMain.handle("post-estudiante", async (e, args) => {
  const result = args
  var fecha = new Date()
  const clave = uuid.v4()
  fecha = moment(fecha).format("YYYY-MM-DD")
  var data = { ...result, registerDate: fecha, idEstudiante: clave }
  // console.log(data)
  try {
    const estudiante = new ESTUDIANTE(data)
    await estudiante.save()
    return JSON.stringify({ message: 'estudiante registrado' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------GET ESTUDIANTES------------------------------------------
ipcMain.handle("get-estudiante", async (e, args) => {
  try {
    const estudiante = await ESTUDIANTE.find({}).sort({ nameEst: 1 })
    return JSON.stringify(estudiante)
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------EDIT ESTUDIANTES------------------------------------------
ipcMain.handle("edit-estudiante", async (e, args) => {
  const result = args
  try {
    const estudiante = await ESTUDIANTE.findById({ _id: result._id }, result)
    await ESTUDIANTE.findByIdAndUpdate({ _id: result._id }, result)
    await PROYECTO.updateMany({ idEstudiante: estudiante.idEstudiante },
      {
        $set: {
          firstNameEst: result.firstNameEst,
          lastNameEstP: result.lastNameEstP,
          lastNameEstM: result.lastNameEstM,
          ciEst: result.ciEst,
          fechaNacimientoEst: result.fechaNacimientoEst,
          fonoEst: result.fonoEst,
        }
      })
    return JSON.stringify({ message: 'estudiante actualizado' })
  } catch (error) {
    console.log(error)
  }
})
//-------------------------------DELETE ESTUDIANTES------------------------------------------
ipcMain.handle("delete-estudiante", async (e, args) => {
  const result = args
  try {
    const estudiante = await ESTUDIANTE.findByIdAndDelete({ _id: result._id })
    return JSON.stringify({ message: 'estudiante eliminado' })
  } catch (error) {
    console.log(error)
  }
})

//------------GET INFORMACION DE ESTUDNATE PARA PROYECTOS-----------------------------------
ipcMain.handle("search-estudiante", async (e, args) => {
  const result = args
  try {
    const estudiante = await ESTUDIANTE.find({ ciEst: result })
    return JSON.stringify(estudiante)
  } catch (error) {
    console.log(error)
  }
})


//----------------REGISTRO DE PROYECTOS-----------------------------------------
ipcMain.handle("post-proyecto", async (e, args) => {
  const result = args
  var fecha = new Date()
  const clave = uuid.v4()
  fecha = moment(fecha).format("YYYY-MM-DD")
  const data = { ...result, registerDate: fecha }
  try {
    const estudiante = await ESTUDIANTE.find({ ciEst: result.ciEst })
    const data2 = {
      ciEst: result.ciEst,
      nameProyecto: data.nameProyecto.toUpperCase(),
      calificacion: data.calificacion,
      requisito1: data.requisito1,
      requisito2: data.requisito2,
      requisito3: data.requisito3,
      fechaDefensa: data.fechaDefensa,
      firstNameEst: estudiante[0].firstNameEst,
      lastNameEstP: estudiante[0].lastNameEstP,
      lastNameEstM: estudiante[0].lastNameEstM,
      sexoEst: estudiante[0].sexoEst,
      nameCarrera: estudiante[0].nameCarrera,
      nameSede: estudiante[0].nameSede,
      fonoEst: estudiante[0].fonoEst,
      registerDate: data.registerDate,
      idSede: estudiante[0].idSede,
      idCarrera: estudiante[0].idCarrera,
      idEstudiante: estudiante[0].idEstudiante,
      idProyecto: clave
    }
    const proyecto = new PROYECTO(data2)
    await proyecto.save()
    return JSON.stringify({ message: 'proyecto registrado' })
  } catch (error) {
    console.log(error)
  }
})
//----------------GET DE PROYECTOS-----------------------------------------
ipcMain.handle("get-proyecto", async (e, args) => {
  try {
    const proyecto = await PROYECTO.find({})
    return JSON.stringify(proyecto)
  } catch (error) {
    console.log(error)
  }
})
//----------------EDIT DE PROYECTOS-----------------------------------------
ipcMain.handle("edit-proyecto", async (e, args) => {
  const result = args
  const cambio=result.nameProyecto.toUpperCase()
  var data={...result,nameProyecto:cambio}
  try {
    const proyecto = await PROYECTO.findByIdAndUpdate({ _id: result._id }, data)
    return JSON.stringify({ message: 'proyecto actualizado' })
  } catch (error) {
    console.log(error)
  }
})
//----------------DELETE DE PROYECTOS-----------------------------------------
ipcMain.handle("delete-proyecto", async (e, args) => {
  const result = args
  try {
    const proyecto = await PROYECTO.findByIdAndDelete({ _id: result._id })
    return JSON.stringify({ message: 'proyecto eliminado' })
  } catch (error) {
    console.log(error)
  }
})





//--------------------------CONT ESTUDIANTES ------------------------------------------

ipcMain.handle("get-cont-estudiantes", async (e, args) => {
  try {
    const todos = await ESTUDIANTE.find({})
    const mujeres = await ESTUDIANTE.find({ sexoEst: 'Femenino' })
    const hombres = await ESTUDIANTE.find({ sexoEst: 'Masculino' })
    const data = {
      constEstudiantes: todos.length,
      contMujeres: mujeres.length,
      contHombre: hombres.length,
    }
    return JSON.stringify(data)
  } catch (error) {
    console.log(error)
  }
})


//------------------------BUSCADOR DE EDAD---------------------------------
ipcMain.handle("buscar-edad", async (e, args) => {
  const result=args
  console.log(result)
  const array=[]
  try {
    const estudiante=await ESTUDIANTE.find({sexoEst:result.sexo,nameSede:result.nameSede,nameCarrera:result.nameCarrera})
    if(estudiante.length>0){
      const contEst=estudiante.length
      for(var i=0;i<contEst;i++){
        var fecha = moment().diff(`${estudiante[i].fechaNacimientoEst}`, 'years', false)
        if(fecha>=result.desde &&fecha<=result.hasta){
          array.push(estudiante[i])
        }
      }
    }
    // console.log(array)
    return JSON.stringify(array)
  } catch (error) {
    console.log(error)
  }
})
