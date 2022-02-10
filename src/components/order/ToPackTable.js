import React, { useState, useEffect, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import differenceBy from 'lodash/differenceBy'
import inventoryApi from '../../utils/inventoryApi'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getToPackCount, getToPack } from '../../actions/order'
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

//FROM ASSET
import Spinner from '../layout/Spinner'

const ToPack = ({
  load,
  order,
  count,
  store,
  getToPackCount,
  getToPack,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  let history = useHistory()

  //PAGINATION

  const getTotalRows = async () => {
    getToPackCount(store)

    if (!load) {
      setTotalRows(count)
    }
  }

  //FETCH ITEM BY PASSING SKIP AND LIMIT

  const fetchUsers = async (page) => {
    let limit = page * perPage
    let start = limit - perPage

    getToPack(store, start, perPage)

    if (!load) {
      
      setData(order)
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

    getToPack(store, start, newPerPage)

    if (!load) {
      setData(order)
      setPerPage(newPerPage)
      setLoading(false)
    }
  }

  const columns = [
    {
      name: 'Id',
      grow: 0,
      selector: (row) => row._id,
    },
    {
      name: 'Created At',
      selector: (row) => row.createdAt,
      sortable: true,
    },
    
    {
      name: ' ',
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

  const onClickRow = (rowId) => {
    history.push(`/editProduct/${rowId}`)
  }

  return (
    <div>
      <DataTable
        title=""
        onRowClicked={(row) => {
          onClickRow(row._id)
        }}
        pointerOnHover={true}
        highlightOnHover={true}
        columns={columns}
        noDataComponent={'No Order to Pack'}
        progressPending={loading}
        data={order}
        progressComponent={<Spinner />}
        pagination
        paginationServer
        paginationTotalRows={count}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        contextActions={contextActions}
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

ToPack.propTypes = {
  getToPackCount: PropTypes.func.isRequired,
  getToPack: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  order: PropTypes.object,
  load: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  load: state.order.loading,
  count: state.order.toPackCount,
  order: state.order.toPack,
  store: state.auth.user.currentStore,
})

export default connect(mapStateToProps, { getToPackCount, getToPack })(
  ToPack,
)
