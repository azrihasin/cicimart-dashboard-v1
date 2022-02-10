//FRO MUI UI
import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

//FROM ASSET
import useStyles from '../../utils/useStyles'
import DrawerHeader from '../layout/DrawerHeader'
import Main from '../layout/Main'
import Spinner from '../layout/Spinner'
import orderApi from '../../utils/orderApi'

//FROM MUI REACT
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const OrderView = ({ open, products, auth: { loading, user } }) => {
  const classes = useStyles()
  const params = useParams()

  const [currentOrder, setCurrentOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const findOrder = async (id) => {
    setIsLoading(true)

    var session_url = `/order/details/${id}`

    try {
      const res = await orderApi.get(session_url)

      console.log(res.data)
      setCurrentOrder(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    findOrder(params.orderId)
  }, [])

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Box className={classes.headerArea}>
          <Box className={classes.headerTitle}>
            <Typography variant="h4" style={{ fontWeight: 600 }} align="left">
              Order information
            </Typography>
          </Box>
        </Box>

        {currentOrder == null ? (
          <Spinner />
        ) : (
          <Box mt={5} mb={10}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontWeight: 600,
                      paddingLeft: 50,
                    }}
                    variant="h5"
                  >
                    Order Timeline
                  </Typography>
                  <OrderTimeline currentOrder={currentOrder} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontWeight: 600,
                      paddingLeft: 50,
                    }}
                    variant="h5"
                  >
                    Order Information
                  </Typography>
                  <OrderDetail currentOrder={currentOrder} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontWeight: 600,
                    paddingLeft: 50,
                    marginBottom: 35,
                    marginTop: 50,
                  }}
                  variant="h5"
                >
                  Products Bought
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box p={5}>
                  <Grid container spacing={5}>
                    {currentOrder.products.map((product, index) => (
                      <Grid item xs={4}>
                        <OrderProducts
                          name={product.name}
                          mainImage={product.mainImage}
                          discount={product.discount}
                          price={product.price}
                          quantity={product.quantity}
                          productId={product.productId}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Main>
    </Fragment>
  )
}

OrderView.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
  products: state.item.products,
})

export default connect(mapStateToProps)(OrderView)

const OrderProducts = (props) => {
  const theme = useTheme()
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.mainImage}
        alt="Main Image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            RM {props.price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

const OrderDetail = (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box style={{ width: 300, marginTop: 50, marginLeft: 100 }}>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>Order Id</Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder._id}
          </Typography>
        </Box>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>
            Customer Name
          </Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder.customerName}
          </Typography>
        </Box>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>
            Payment Method
          </Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder.paymentMethod}
          </Typography>
        </Box>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>
            Service Fee
          </Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder.serviceFee}
          </Typography>
        </Box>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>Packer Id</Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder.packerId}
          </Typography>
        </Box>
        <Box className={classes.orderDetails}>
          <Typography style={{ display: 'inline-block' }}>
            Courier Id
          </Typography>
          <Typography style={{ display: 'inline-block' }}>
            {props.currentOrder.courierId}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

const OrderTimeline = (props) => {
  return (
    <React.Fragment>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {props.currentOrder.createdAt != null ? (
              props.currentOrder.createdAt
            ) : (
              <p>0:00 AM</p>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Created At</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {props.currentOrder.packedAt != null ? (
              props.currentOrder.createdAt
            ) : (
              <p>0:00 AM</p>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Packed At</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {props.currentOrder.startDeliverAt != null ? (
              props.currentOrder.createdAt
            ) : (
              <p>0:00 AM</p>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Start Deliver At</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {props.currentOrder.deliveredAt != null ? (
              props.currentOrder.createdAt
            ) : (
              <p>0:00 AM</p>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Delivered At</TimelineContent>
        </TimelineItem>
      </Timeline>
    </React.Fragment>
  )
}
