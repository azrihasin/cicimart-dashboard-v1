import React, { useState, useEffect, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import orderApi from '../../utils/orderApi'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOrderCount, getOrder } from '../../actions/order'
import { useHistory } from 'react-router-dom'

//FROM MUI
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuList from '@mui/material/MenuList'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'

//FROM ASSET
import Spinner from '../layout/Spinner'

const Roles = (props) => {
  return (
    <Box>
      {props.roles.map((roles, index) => (
        <Typography style={{ display: 'inline-block' }}>{roles}</Typography>
      ))}
    </Box>
  )
}

const IsWorking = ({ load, order, count, store, getOrderCount, getOrder }) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = useState([])
  const [loading, setIsLoading] = useState(false)

  let history = useHistory()

  //FETCH ITEM BY PASSING SKIP AND LIMIT

  const fetchData = async () => {
    var session_url = `/fulfillment/isworking`

    try {
      const res = await orderApi.get(session_url)

      setData(res.data.slice(0, 5))
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }


  const columns = [
    {
      name: 'Id',
      selector: (row) => row._id,
    },
    {
      name: 'Roles',
      cell: (row) => <Roles roles={row.roles} />,
    },

    {
      name: 'Completed Job',
      selector: (row) => row.completedJobToday,
      sortable: true,
    },
  ]

  useEffect(() => {
    fetchData(1)
  }, [])

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  const onClickRow = (rowId) => {
    history.push(`/order/${rowId}`)
  }

  return (
    <div>
      <Box>
        <Typography
          style={{
            textAlign: 'left',
            fontWeight: 600,
            marginBottom:50
          }}
          variant="h5"
        >
          Active Employee
        </Typography>
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
          data={data}
          progressComponent={<Spinner />}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </Box>
    </div>
  )
}

const ITEM_HEIGHT = 48

IsWorking.propTypes = {
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

export default connect(mapStateToProps, { getOrderCount, getOrder })(IsWorking)

// function stringToColor(string) {
//   let hash = 0
//   let i

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash)
//   }

//   let color = '#'

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff
//     color += `00${value.toString(16)}`.substr(-2)
//   }
//   /* eslint-enable no-bitwise */

//   return color
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   }
// }
