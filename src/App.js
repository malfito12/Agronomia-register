import React from 'react'
import './index.css'
import { HashRouter as Router, Switch } from 'react-router-dom'
import NewDrawer from './Components/Organismsm/NewDrawer';

function App() {
  return (
    <div id="main">
      <Router>
        {/* <DrawerPrincipal /> */}
        <NewDrawer />
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}
          {/*--------------------------------------NUEVAS PAGINAS--------------------------------*/}
          {/* <Route path='/carreras' exact component={ListaCarreras} />
          <Route path='/estudiantes' exact component={ListaEstudiantes} />
          <Route path='/tesis' exact component={ListaTesis} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
