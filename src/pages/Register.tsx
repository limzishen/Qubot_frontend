// src/pages/Register.tsx
import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //console.log("Sending data:", { userName: name, email, password });

    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', {
          userName: name,
          email,
          password
        }, {
          withCredentials: true
        }
      );
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };
  


  return (
    <Box 
      sx={{ 
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 450,
          borderRadius: "20px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight={700} color="primary">
            Create Account
          </Typography>
          <Typography color="text.secondary">
            Sign up to start using Qubot
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
          {/* Add registration form fields here */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            onChange={(e) => setName(e.target.value)}
            value={name} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
              boxShadow: "0 4px 12px rgba(37, 117, 252, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(37, 117, 252, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease-in-out",
              mt: 2,
            }}
          >
            Register
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#2575fc",
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;