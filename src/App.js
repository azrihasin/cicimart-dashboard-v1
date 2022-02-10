import { ThemeProvider } from '@mui/material/styles'
import React, { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { loadUser } from './actions/auth'
import './App.css'
import LoginPage from './components/auth/LoginPage'
import Sidebar from './components/layout/Sidebar'
import AddProduct from './components/pages/AddProduct'
import AddEmployee from './components/pages/AddEmployee'

//Pages
import Dashboard from './components/pages/Dashboard'
import EditProduct from './components/pages/EditProduct'
import Employee from './components/pages/Employee'
import Inventory from './components/pages/Inventory'
import Order from './components/pages/Order'
import OrderView from './components/pages/OrderView'
import Package from './components/pages/Package'
import history from './components/routing/History'
import PrivateRoute from './components/routing/PrivateRoute'
import store from './store'
import theme from './theme'
import setAuthToken from './utils/setAuthToken'













const LoginContainer = () => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginPage} />
  </div>
)

const DefaultContainer = () => (
  <div>
    <div className="container">
      <Sidebar />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/inventory" component={Inventory} />
      <PrivateRoute exact path="/package" component={Package} />
      <PrivateRoute exact path="/employee" component={Employee} />
      <PrivateRoute exact path="/addProduct" component={AddProduct} />
      <PrivateRoute exact path="/addEmployee" component={AddEmployee} />
      <PrivateRoute exact path="/editProduct/:product" component={EditProduct} />
      <PrivateRoute exact path="/order/:orderId" component={OrderView} />
      <PrivateRoute exact path="/order" component={Order} />
    </div>
  </div>
)

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <div className="App">
        <Router history={history}>
          <Fragment>
                <Route exact path="/" component={LoginContainer} />
                <Route exact path="/(login)" component={LoginContainer} />
            <Switch>
              <div className="App">
                <PrivateRoute component={DefaultContainer} />
              </div>
            </Switch>
          </Fragment>
        </Router>
      </div>
    </Provider>
    </ThemeProvider>
  )
}


export default App
