import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import useStyles from '../../utils/useStyles';
import DrawerHeader from '../layout/DrawerHeader';
import Main from '../layout/Main';
import Spinner from '../layout/Spinner';

const Package = ({open,auth:{loading,user}}) => {

  const classes = useStyles();

  return loading === null? <Spinner/> : <Fragment>
        <DrawerHeader />
        <Main open={!open}>
        <Box className={classes.headerArea}>
          <Typography
            variant="h4"
            style={{ fontWeight: 600 }}
            align="left"
            
           
          >
            Welcome {user.name}!
          </Typography>
        </Box>
        
        </Main>
    
    </Fragment>
    
  
}

Package.propTypes = {

    open:PropTypes.bool,
    auth:PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    open: state.sidebar.open,
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(Package);


// export default Package;