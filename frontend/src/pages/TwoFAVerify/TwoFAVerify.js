import { React, useState, useEffect, useContext } from 'react';
import LoadingScreen from "react-loading-screen";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthContext from "../../context/AuthContext";
import Cookies from "universal-cookie";

function TwoFAVerify() {
	const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

	let { user_id_exists, loginUser } = useContext(AuthContext);
	const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    let response = await fetch('http://localhost:8000/api/auth/verify-two-factor-auth/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: cookies.get('user_id'), otp: data.get('pin') }),
    });
    let responseJson = await response.json();
    if(responseJson.status === "Verification failed") {
      alert("Incorrect Pin");
      setLoading(false);
    }
    else {
      cookies.set("user_id", responseJson['user_id'], {path: "/", maxAge: 24*60*60});
      alert("Verified");
      setLoading(false);
      navigate('/main-page');
    }
  }

  useEffect(() => {
    if(!user_id_exists) {
      alert("Can't enter this page");
      navigate('/login');
    }
  }, []);

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
            Enter your OTP
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pin"
              label="Pin"
              name="pin"
              autoComplete="pin"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </LoadingScreen>
  );
}

export default TwoFAVerify;




