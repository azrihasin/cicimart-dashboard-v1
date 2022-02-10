import React, { useState, useEffect, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import differenceBy from 'lodash/differenceBy'
import inventoryApi from '../../utils/inventoryApi'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEmployeeCount, getEmployee } from '../../actions/employee'



//FROM MUI
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import MenuList from '@mui/material/MenuList'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


//FROM ASSET
import Spinner from '../layout/Spinner';


const EmployeeTable = ({load, store, employee, count, getEmployeeCount, getEmployee }) => {
  
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  // let history = useHistory()

  //PAGINATION

  const getTotalRows = async () => {
    getEmployeeCount(store)

    if (!load) {
      setTotalRows(count)
    }
  }

  //FETCH ITEM BY PASSING SKIP AND LIMIT

  const fetchUsers = async (page) => {
    let limit = page * perPage
    let start = limit - perPage

    getEmployee(store, start, perPage)

    console.log("START"+ start)
    console.log("LIMIT"+perPage)

    if (!load) {
      setData(employee.employees)
    }
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  //CHANGE ROW PER PAGE

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)

    let limit = page * newPerPage
    let start = limit - newPerPage

    getEmployee(store, start, newPerPage)

    

    if (!load) {
      setData(employee.employees)
      setPerPage(newPerPage)
      setLoading(false)
    }
  }

  const columns = [
    {
      name: 'Image',
      grow: 0,
      cell: (row) => (
        <Box mt={2} mb={2}><Avatar {...stringAvatar(row.name)} /></Box>
      ),
    },
    {
      name: 'Employee Id',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Roles',
      selector: (row) => row.roles,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: ' ',
      // selector: row => row.title,
      //sortable: true,
      //maxWidth: '600px',  when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: (row) => <EditMenu row={row} />,
    },
  ]

  useEffect(() => {
 
		getTotalRows()
    fetchUsers(1) 
	    
  }, [])

  //CHECKBOX AND DELETE ACTION
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name,
          )}?`,
        )
      ) {
        setToggleCleared(!toggleCleared)
        setData(differenceBy(data, selectedRows, 'name'))
      }
    }

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'red' }}
        icon
      >
        Delete
      </Button>
    )
  }, [data, selectedRows, toggleCleared])

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  return (
    <div>
      <DataTable
        title=""
        columns={columns}
        noDataComponent={<Spinner />}
        progressPending={loading}
        data={employee.employee}
        progressComponent={<Spinner />}
        pagination
        paginationServer
        paginationTotalRows={count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
    </div>
  )
}

const ITEM_HEIGHT = 48

const EditMenu = ({ row }) => {
  //EDIT AND DELETE
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <TypographyMenu row={row} />
      </Menu>
    </div>
  )
}

const TypographyMenu = ({ row }) => {
  const [openModal, setOpenModal] = React.useState(false)

  const handleEdit = () => {
    setOpenModal(true)
  }
  const handleDelete = () => {}

  return (
    <Fragment>
      <MenuList>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>          
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete
          </Typography>
        </MenuItem>
      {/* <InventoryModal open={openModal} close={() => setOpenModal(false)} /> */}
      </MenuList>
      
    </Fragment>
  )
}

EmployeeTable.propTypes = {
  getEmployeeCount: PropTypes.func.isRequired,
  getEmployee: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  employee: PropTypes.object.isRequired,
  load: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  load: state.item.loading,
  count: state.employee.emp_count,
  employee: state.employee,
  store: state.auth.user.currentStore
})

export default connect(mapStateToProps, { getEmployeeCount, getEmployee })(EmployeeTable)

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {


  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}