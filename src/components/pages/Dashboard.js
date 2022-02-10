//FROM MUI REACT
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { deepOrange, green } from '@mui/material/colors'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import FolderIcon from '@mui/icons-material/Folder'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

//FOR REDUX
import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useStyles from '../../utils/useStyles'
import { Redirect } from 'react-router-dom'

//FROM CHART JS
import CategoryChart from '../layout/CategoryChart'

//FOR LAYOUT
import DrawerHeader from '../layout/DrawerHeader'
import Main from '../layout/Main'
import Spinner from '../layout/Spinner'
import IsWorking from '../layout/IsWorking'
import RecentOrder from '../layout/RecentOrder'
import storeApi from '../../utils/storeApi'
import orderApi from '../../utils/orderApi'

const Dashboard = ({ open, auth: { loading, user }, isAuthenticated }) => {
  const cards = [{name:'Total Order (Month)'},{name:'Total Sales (Month)'},{name:'Total Sold Count(Month)'}]

  const useStyles = makeStyles({
    MuiDrawer: {
      backgroundColor: 'white',
      borderColor: 'white',
    },
  })

  const classes = useStyles()

  return (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Container className={classes.info}>
          <Grid container spacing={2}>
            {/* Dahsboard Main */}
            <Grid item xs={8}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box mt={5}>
                    <Paper
                      style={{
                        padding: 30,
                        paddingLeft: 40,
                        backgroundColor: 'lightgrey',
                      }}
                      elevation={0}
                    >
                      <Typography
                        style={{ fontWeight: '600', textAlign: 'left' }}
                        variant="h4"
                      >
                        Welcome {user.name} !
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: '500',
                          textAlign: 'left',
                          color: 'grey',
                        }}
                        variant="h6"
                      >
                        {' '}
                        {user.address.area} • {user.address.state} •{' '}
                        {user.address.country}{' '}
                      </Typography>
                      <Typography
                        style={{ fontWeight: '500', textAlign: 'left' }}
                        variant="h6"
                      >
                        {' '}
                        {user.currentStore}{' '}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid pl={1} mb={5} container spacing={3}>
                    <Box style={{ display: 'flex' }}>
                      {cards.map((cards) => (
                        <SalesCards name={cards.name}/>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item mb={10} xs={12}>
                    <IsWorking />
                  </Grid>
                  <Grid item mb={10} xs={12}>
                    <RecentOrder />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          {/* Store Information */}
          <Drawer
            variant="permanent"
            anchor="right"
            classes={{ paper: classes.MuiDrawer }}
            sx={{
              border: 'white',
              width: 380,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 380, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              {user == null ? <Spinner /> : <StoreInfo user={user} />}
            </Box>
          </Drawer>
        </Container>
      </Main>
    </Fragment>
  )
}

Dashboard.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Dashboard)

const StoreInfo = (props) => {
  const classes = useStyles()

  const [store, setStore] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openStore, setOpenStore] = useState(false)

  const fetchStore = async () => {
    setIsLoading(true)
    console.log(props.user.currentStore)
    var session_url = `/store/details/manager/${props.user.currentStore}`

    try {
      const res = await storeApi.get(session_url)

      console.log(res)

      setStore(res.data)

      if (res.data.status === 'open') {
        setOpenStore(true)
      } else {
        setOpenStore(false)
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const handleStore = async () => {
    if (openStore === false) {
      //route for opening the store

      var session_url = `/store/open`

      try {
        const res = await storeApi.post(session_url)

        console.log(res.data.success)

        setOpenStore(true)
      } catch (err) {
        console.log(err)
      }
    } else {
      // route to close the store
      var session_url = `/store/close`

      try {
        const res = await storeApi.post(session_url)

        console.log(res.data.success)
        setOpenStore(false)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  const [openHour, setOpenHour] = React.useState(false)

  const handleClickOpenHour = () => {
    setOpenHour(!openHour)
  }

  const [openLocation, setOpenLocation] = React.useState(false)

  const handleClickLocation = () => {
    setOpenLocation(!openLocation)
  }

  useEffect(() => {
    fetchStore()
  }, [openStore])

  return isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box mt={5}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} align="center">
            <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
              <AssignmentIcon />
            </Avatar>
          </Grid>
          <Grid item xs={12} align="center">
            {store._id}
          </Grid>
          <Grid item xs={12} align="center">
            {store.name}
          </Grid>
          <Grid item xs={12} align="center">
            {store.status}
          </Grid>
          <Grid item xs={12} align="center">
            {openStore === false ? (
              <Button variant="contained" onClick={handleStore}>
                Open Store
              </Button>
            ) : (
              <Button variant="contained" onClick={handleStore}>
                Close Store
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <List>
        <ListItem
          secondaryAction={
            <Typography
              variant="p"
              style={{ fontWeight: '600', color: 'grey' }}
            >
              {store.status}
            </Typography>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Status" />
        </ListItem>
        <ListItem
          secondaryAction={
            <Typography
              variant="p"
              style={{ fontWeight: '600', color: 'grey' }}
            >
              RM {store.serviceFee}
            </Typography>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Service Fee" />
        </ListItem>
        <ListItem
          secondaryAction={
            <Typography
              variant="p"
              style={{ fontWeight: '600', color: 'grey' }}
            >
              {store.maxDistanceForDelivery} km
            </Typography>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Coverage Distance" />
        </ListItem>
        {/* ADDRESS        */}
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Address" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <ListItem>
              <ListItemText primary={store.address.street} />
            </ListItem>
            <ListItem>
              <ListItemText primary={store.address.postcode} />
            </ListItem>
            <ListItem>
              <ListItemText primary={store.address.area} />
            </ListItem>
            <ListItem>
              <ListItemText primary={store.address.state} />
            </ListItem>
          </List>
        </Collapse>
        {/* OPEN HOURS */}
        <ListItemButton onClick={handleClickOpenHour}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Open Hours" />
          {openHour ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openHour} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.openingHours.mon}
                </Typography>
              }
            >
              <ListItemText primary="Monday" />
            </ListItem>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.openingHours.tue}
                </Typography>
              }
            >
              <ListItemText primary="Tuesday" />
            </ListItem>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.openingHours.wed}
                </Typography>
              }
            >
              <ListItemText primary="Wednesday" />
            </ListItem>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.openingHours.thu}
                </Typography>
              }
            >
              <ListItemText primary="Thursday" />
            </ListItem>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.openingHours.fri}
                </Typography>
              }
            >
              <ListItemText primary="Friday" />
            </ListItem>
          </List>
        </Collapse>
        {/* COORDINATE */}
        <ListItemButton onClick={handleClickLocation}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon size="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Coordinate" />
          {openLocation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.location.coordinates[0]}
                </Typography>
              }
            >
              <ListItemText primary="Latitude" />
            </ListItem>
            <ListItem
              sx={{ pl: 4 }}
              secondaryAction={
                <Typography
                  variant="p"
                  style={{ fontWeight: '600', color: 'grey' }}
                >
                  {store.location.coordinates[1]}
                </Typography>
              }
            >
              <ListItemText primary="Longitude" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  )
}

const SalesCards = (props) => {
  const classes = useStyles()

  // const [store, setStore] = useState('')

  // const getStats = async () => {
  
    
  //   var session_url = `/stats/order/total/27-12-2021/03-01-2022`

  //   try {
  //     const res = await orderApi.get(session_url)

  //     console.log(res)

  //     setStore(res.data)

  //     if (res.data.status === 'open') {
  //       setOpenStore(true)
  //     } else {
  //       setOpenStore(false)
  //     }
  //     setIsLoading(false)
  //   } catch (err) {
  //     console.log(err)
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Card
      elevation={0}
      style={{ margin: 10 }}
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Box m={2}>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
          variant="rounded"
        >
          <AssignmentIcon />
        </Avatar>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardContent>
          <Typography
            style={{ textAlign: 'left', fontSize:12}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.name}
          </Typography>
          <Typography
            style={{ fontWeight: 'bold', textAlign: 'left' }}
            variant="h5"
          >
            0
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  )
}
