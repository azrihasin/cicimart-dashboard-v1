import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { login, inProgress } from '../../actions/auth'
import Spinner from '../layout/Spinner'

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme()

const Login = ({ login, inProgress , isAuthenticated, requestInProgress }) => {
  let history = useHistory()

  const [loginLoading,setLoginLoading] = useState(false)
  const handleSubmit = (event) => {

    setLoginLoading(true)
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // const user = {
    //   email: data.get('email'),
    //   password: data.get('password'),
    // }

    const email = data.get('email')
    const password = data.get('password')

    // login(email, password)

      inProgress()

      setTimeout(() => {
        login(email,password);
        setLoginLoading(false)
     }, 1000)

      // history.push('/dashboard')
  }

  //If logged in we redirect

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return requestInProgress ? (
    <Spinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  inProgress: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  requestInProgress: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  requestInProgress: state.auth.requestInProgress,
})

export default connect(mapStateToProps, { login, inProgress })(Login)

// export default Login;
