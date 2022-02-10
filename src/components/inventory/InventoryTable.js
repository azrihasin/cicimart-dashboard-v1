import React, { useState, useEffect, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import differenceBy from 'lodash/differenceBy'
import inventoryApi from '../../utils/inventoryApi'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCount, getItem } from '../../actions/item'
import { useHistory } from 'react-router-dom'

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
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
//FROM ASSET
import Spinner from '../layout/Spinner'
import SearchInventory from '../inventory/SearchInventory'
import FilterInventory from '../inventory/FilterInventory'

const InventoryTable = ({ load, item, count, store, getCount, getItem }) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  let history = useHistory()

  //PAGINATION

  const getTotalRows = async () => {
    getCount(store)
  }

  //FETCH ITEM BY PASSING SKIP AND LIMIT

  const fetchUsers = async (page) => {
    let limit = page * perPage
    let start = limit - perPage

    getItem(store, start, perPage)

    if (!load) {
      setData(item.products)
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

    getItem(store, start, newPerPage)

    if (!load) {
      setData(item.products)
      setPerPage(newPerPage)
      setLoading(false)
    }
  }

  const columns = [
    {
      name: 'Image',
      grow: 0,
      cell: (row) => (
        <img height="80px" width="80px" alt={row.name} src={row.mainImage} />
      ),
    },
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Discount',
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: 'Total Sold',
      selector: (row) => row.soldCount,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: ' ',
      cell: (row) => <EditMenu row={row} />,
    },
  ]

  const refresh = () =>{
    fetchUsers(1)
  }

  useEffect(() => {
    getTotalRows()
    fetchUsers(1)
  }, [])

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  const onClickRow = (rowId) => {
    history.push(`/editProduct/${rowId}`)
  }

  return (
    <div>
      <Box style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
        <Grid container>
          <Grid xs={8} item>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <SearchInventory store={store} />
              <IconButton onClick={refresh}aria-label="refresh" size="small">
                <RefreshIcon />
              </IconButton>
              {/* <IconButton>
              <SearchIcon />
            </IconButton> */}
            </Box>
          </Grid>

          <Grid xs={4} item>
            <FilterInventory />
          </Grid>
        </Grid>
      </Box>

      <DataTable
        title=""
        onRowClicked={(row) => {
          onClickRow(row._id)
        }}
        pointerOnHover={true}
        highlightOnHover={true}
        columns={columns}
        noDataComponent={<Spinner />}
        progressPending={loading}
        data={item.products}
        progressComponent={<Spinner />}
        pagination
        paginationServer
        paginationTotalRows={count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
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
      </MenuList>
    </Fragment>
  )
}

InventoryTable.propTypes = {
  getCount: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  load: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  load: state.item.loading,
  count: state.item.count,
  item: state.item,
  store: state.auth.user.currentStore,
})

export default connect(mapStateToProps, { getCount, getItem })(InventoryTable)
