import React, { useState, useEffect, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import differenceBy from 'lodash/differenceBy'
import inventoryApi from '../../utils/inventoryApi'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOrderCount, getOrder } from '../../actions/order'
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

const OrderTable = ({ load, order, count, store, getOrderCount, getOrder }) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  let history = useHistory()

  //PAGINATION

  const getTotalRows = async () => {
    getOrderCount(store)

    if (!load) {
      setTotalRows(count)
    }
  }

  //FETCH ITEM BY PASSING SKIP AND LIMIT

  const fetchUsers = async (page) => {
    let limit = page * perPage
    let start = limit - perPage

    getOrder(store, start, perPage)

    setData(order.orders.slice(0, 5))
  }

  const columns = [
    {
      name: 'Id',
      grow: 0,
      selector: (row) => row._id,
    },
    {
      name: 'Delivered At',
      // selector: (row) => Date(row.deliveredAt),
      selector: (row) => row.deliveredAt ,
      sortable: true,
    },
    {
      name: 'Service Fee',
      selector: (row) => row.serviceFee,
      sortable: true,
    },
  ]

  useEffect(() => {
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

  const onClickRow = (rowId) => {
    history.push(`/order/${rowId}`)
  }

  return (
    <div>
      <Typography
        style={{
          textAlign: 'left',
          fontWeight: 600,
          marginBottom: 50,
        }}
        variant="h5"
      >
        Recent Completed Order
      </Typography>
      <DataTable
        title=""
        progressComponent={<Spinner />}
        onRowClicked={(row) => {
          onClickRow(row._id)
        }}
        pointerOnHover={true}
        highlightOnHover={true}
        columns={columns}
        noDataComponent={<Spinner />}
        progressPending={loading}
        data={order.orders.slice(0, 5)}
        onChangeRowsPerPage={5}
      />
    </div>
  )
}

OrderTable.propTypes = {
  getOrderCount: PropTypes.func.isRequired,
  getOrder: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  load: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  load: state.item.loading,
  count: state.order.count,
  order: state.order,
  store: state.auth.user.currentStore,
})

export default connect(mapStateToProps, { getOrderCount, getOrder })(OrderTable)

const DateTime = (props) => {
  var strDateTime = props.date
  var myDate = new Date(strDateTime)

  return (
    <React.Fragment>
      <Typography variant="p">
      {myDate.getHours() }: {myDate.getMinutes()}
      </Typography>
      <Typography
      
        variant="subtitle1"
        color="text.secondary"
        component="div"
      >
        {myDate.getDate()}/{myDate.getMonth()}/{myDate.getFullYear()}
      </Typography>
    </React.Fragment>
  )
}
