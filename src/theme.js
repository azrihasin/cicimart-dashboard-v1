import { createTheme } from '@mui/material/styles';

import { grey, deepPurple, amber } from '@material-ui/core/colors';




const theme = createTheme({

  palette: {

    primary: {

      main:  '#1d976c',

    },

    secondary: {

      main: '#93f9b9' ,

      contrastText: deepPurple[900],

    },

  },
})


 export default theme;