import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import Main from '../layout/Main'
import DrawerHeader from '../layout/DrawerHeader'
import EmployeeTable from '../employee/EmployeeTable'
import Button from '@mui/material/Button'
import useStyles from '../../utils/useStyles'
import { useHistory } from 'react-router-dom'

import TabPanel from '../layout/TabPanel'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AddIcon from '@mui/icons-material/Add'

const Employee = ({ open, auth: { loading, user } }) => {
  const classes = useStyles()
  let history = useHistory()

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Box className={classes.headerArea}>
          <Box className={classes.headerTitle}>
            <Typography variant="h4" style={{ fontWeight: 600 }} align="left">
              Employees
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mr={2}>
                <Button
                sx={{size:'small'}}
                  onClick={() => {
                    history.push('/addEmployee')
                  }}
                  endIcon={<AddIcon />}
                  variant="contained"
                >
                  Register Employee
                </Button>
              </Box>
              <Box>
       
              </Box>
            </Box>
          </Box>

          <ProductTabs className={classes.headerTab} />
        </Box>
      </Main>
    </Fragment>
  )
}

Employee.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
})



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ProductTabs = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs
          TabIndicatorProps={{
            sx: {
              height: 5,         
            },
          }}
            visibleScrollbar="false"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            // indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab className = {classes.tabText}  label="All" {...a11yProps(0)} />
            {/* <Tab label="Draft" {...a11yProps(1)} />
            <Tab label="Published" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box className={classes.EmployeeBody}>
            <EmployeeTable style={{ textAlign: 'right' }} />
          </Box>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>

        <Box className={classes.EmployeeBody}>
             <DraftTable style={{ textAlign: 'right' }} /> 
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>Coming Soon</Box>
        </TabPanel> */}
       
      </Box>
    </div>
  )
}
export default connect(mapStateToProps)(Employee)
