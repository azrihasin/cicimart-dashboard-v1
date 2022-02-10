import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { logout } from '../../actions/auth';
//components
import { closeSidebar, openSidebar } from '../../actions/sidebar';
import theme from '../../theme';



const drawerWidth = 240


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const Sidebar = ({ openSidebar, closeSidebar, logout, history }) => {
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)

    openSidebar()
  }

  const handleDrawerClose = () => {
    setOpen(false)
    closeSidebar()
  }

  const itemsList = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => history.push('/dashboard'),
    },
    {
      text: 'Inventory management',
      icon: <InventoryIcon />,
      onClick: () => history.push('/inventory'),
    },
    {
      text: 'Order',
      icon: <AllInboxIcon />,
      onClick: () => history.push('/order'),
    },
    {
      text: 'Employee',
      icon: <PeopleIcon />,
      onClick: () => history.push('/employee'),
    },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar  elevation={0} style={{ background:'#EBECF0' }} position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Cicimart
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>

      </Drawer>
    </Box>
  )
}

Sidebar.propTypes = {
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  openState: state.sidebar.open,
})

export default withRouter(
  compose(
   
    connect(mapStateToProps, { openSidebar, closeSidebar, logout })

    )(Sidebar),
)

// export default withRouter(connect(mapStateToProps,{openSidebar,closeSidebar})(Sidebar));
