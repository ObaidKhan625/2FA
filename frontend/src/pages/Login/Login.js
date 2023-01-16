import { React, useState, useContext } from 'react';
import LoadingScreen from "react-loading-screen";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from "../../context/AuthContext";
import Cookies from "universal-cookie";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  let { user_id_exists, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    let response = await fetch('http://localhost:8000/api/auth/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: data.get('username'), password: data.get('password')}),
    });
    let responseJson = await response.json();
    if(responseJson.status === "Login failed") {
      alert("Incorrect Username/Password Combination");
      setLoading(false);
    }
    else {
      cookies.set("user_id", responseJson['user_id'], {path: "/", maxAge: 24*60*60});
      alert("Login Succeeded");
      setLoading(false);
      navigate('/two-fa-verify-page')
    }
  };

  return (
    <LoadingScreen
    loading={loading}
    spinnerColor="#AC3B61"
    textColor="#AC3B61"
    text="Please Wait"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LoadingScreen>
  );
}