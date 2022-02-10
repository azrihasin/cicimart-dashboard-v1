import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import Main from '../layout/Main'
import DrawerHeader from '../layout/DrawerHeader'
import OrderTable from '../order/OrderTable'
import ToDeliverTable from '../order/ToDeliverTable'
import ToPackTable from '../order/ToPackTable'
import useStyles from '../../utils/useStyles'
import TabPanel from '../layout/TabPanel'

//FROM MUI REACT
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AddIcon from '@mui/icons-material/Add'

const Order = ({ open, auth: { loading, user } }) => {
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
              Order
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mr={2}>
                {/* <Button
                sx={{size:'small'}}
                  onClick={() => {
                    history.push('/addProduct')
                  }}
                  endIcon={<AddIcon />}
                  variant="contained"
                >
                  Add Product
                </Button> */}
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

Order.propTypes = {
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
            <Tab className = {classes.tabText}  label="Completed" {...a11yProps(0)} />
            <Tab className = {classes.tabText}  label="To Deliver" {...a11yProps(1)} />
            <Tab className = {classes.tabText}  label="To Pack" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box className={classes.OrderBody}>
            <OrderTable style={{ textAlign: 'right' }} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>          
        <Box className={classes.OrderBody}>
        <ToDeliverTable style={{ textAlign: 'right' }} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <ToPackTable style={{ textAlign: 'right' }} />
        </TabPanel>
       
      </Box>
    </div>
  )
}
export default connect(mapStateToProps)(Order)
