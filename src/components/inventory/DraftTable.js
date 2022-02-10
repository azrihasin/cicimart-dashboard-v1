import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import differenceBy from 'lodash/differenceBy'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDraftCount, getDraft } from '../../actions/item'
import useStyles from '../../utils/useStyles'
//FROM ASSET
import Spinner from '../layout/Spinner'

const InventoryTable = ({
  load,
  item,
  count,
  store,
  getDraftCount,
  getDraft,
}) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  let history = useHistory()

  //PAGINATION

  const getTotalRows = async () => {
    getDraftCount(store)

    if (!load) {
      setTotalRows(count)
    }
  }

  const fetchUsers = async (page) => {
    let limit = page * perPage
    let start = limit - perPage

    getDraft(start, perPage)
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  //CHANGE ROW PER PAGE

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)

    let limit = page * newPerPage
    let start = limit - newPerPage

    getDraft(store, start, newPerPage)
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
      name: 'Product Id',
      selector: (row) => row._id,
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
      name: 'Status',
      cell: (row) => <StatusMenu enabled={row.enabled} />,
    },
  ]

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
      <DataTable
        title=""
        onRowClicked={(row) => {
          onClickRow(row._id)
        }}
        pointerOnHover={true}
        highlightOnHover={true}
        columns={columns}
        noDataComponent={<Typography>No product Yet</Typography>}
        progressPending={loading}
        data={item.drafts}
        progressComponent={<Spinner />}
        pagination
        paginationServer
        paginationTotalRows={0}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        // selectableRows
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
    </div>
  )
}

const ITEM_HEIGHT = 48

const StatusMenu = (props) => {
  const classes = useStyles()

  return (
    <Fragment>
      {props.enabled ? (
        <Box className={classes.published}>
          <Typography className={classes.publishedText}>PUBLISHED</Typography>
        </Box>
      ) : (
        <Box className={classes.draft}>
          <Typography className={classes.draftText}>DRAFT</Typography>
        </Box>
      )}
    </Fragment>
  )
}

InventoryTable.propTypes = {
  getDraftCount: PropTypes.func.isRequired,
  getDraft: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getDraftCount, getDraft })(
  InventoryTable,
)
