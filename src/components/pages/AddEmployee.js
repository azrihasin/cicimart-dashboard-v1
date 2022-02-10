//FRO MUI UI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { submitEmployee } from '../../actions/addEmployee'
import useStyles from '../../utils/useStyles'
import DrawerHeader from '../layout/DrawerHeader'
import Main from '../layout/Main'
import EmployeeForm from '../layout/EmployeeForm'
import Spinner from '../layout/Spinner'

const AddEmployee = ({ open, auth: { loading, user }, submitEmployee }) => {
  const classes = useStyles()

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Box className={classes.headerArea}>
          <Box className={classes.headerTitle}>
            <Typography variant="h4" style={{ fontWeight: 600 }} align="left">
              Add Employee
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mr={2}>
                <Button
                  // type="submit"
                  // form="EmployeeForm"
                  onClick={() => {
                    // history.push('/addEmployee')
                  }}
                  //   endIcon={<AddIcon />}
                  variant="contained"
                >
                  Open Guidlines
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    // history.push('/addEmployee')
                  }}
                  //   endIcon={<AddIcon />}
                  variant="outlined"
                >
                  Import Csv
                </Button>
              </Box>
            </Box>
          </Box>

          {/* <EmployeeTabs className={classes.headerTab} /> */}
        </Box>

        <Box style={{height:'100vh'}}>
        <EmployeeForm
          submitEmployee={submitEmployee}
          store = {user.currentStore}
          />
        </Box>

        
      </Main>
    </Fragment>
  )
}

AddEmployee.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
})

//export default connect(mapStateToProps, { })(AddEmployee)
 export default connect(mapStateToProps, { submitEmployee })(AddEmployee)
