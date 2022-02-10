import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import Employee from '../pages/Employee'
import Product from '../pages/Product'
import PrivateRoute from './PrivateRoute'


const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Sidebar/>
      <Switch>
        
        <PrivateRoute exact path="/product" component={Product} />
      
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;