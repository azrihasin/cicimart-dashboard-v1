import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  //pages
  headerArea: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    maxHeight: 155,
    background: '#EBECF0',
    paddingTop: 20,
    paddingLeft: 50,
    alignItems: 'flex-center',
  },
  headerTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 38,
  },
  headerTab: {
    marginBottom: 0,
  },
  //information card
  info: {
    marginTop: 10,
  },
  infoCard: {
    alignItems: 'left',
    justifyContent: 'left',
  },
  infoText: {
    fontSize: '1rem',
    align: 'left',
  },
  infoNumber: {
    fontSize: '1.8rem',
    align: 'left',
    fontWeight: 700,
  },

  //tab text
  tabText: {
    fontWeight:600,
    fontSize:14
  },

  //inventory
  formBox: {
    position: 'absolute',
    top: '50%',
    left: '47%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 40,
  },

  formTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  inventoryBody: {
    marginLeft:'-50px'
  },

  //FOR PUBLISHED AND DRAFT PRODUCT

  published: {
    fontSize: 5,
    backgroundColor: 'lightgreen',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 15,
  },

  publishedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
  draft: {
    fontSize: 5,
    backgroundColor: 'lightgrey',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 15,
  },

  draftText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },

  //FOR IMAGE UPLOAD

  imgBox: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgrey',
    border: '1px dashed grey',
    margin: 10,
  },

  //SCROLLBAR
  scroll: {
    '&::-webkit-scrollbar': {
      width: 1,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: `1px solid slategrey`,
    },
  },

  //FOR ORDER DETAILS
  orderDetails:{
    display:'flex',
    justifyContent:'space-between',
    marginTop:20

  }
})

export default useStyles
