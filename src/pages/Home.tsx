import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Header from "@/components/header/Header";
import { useNavigate } from 'react-router-dom';
import placeholderImage from "../placeholder-image/placeholder.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          {/* Flexbox Layout Replacing Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Ensures stacking on small screens
              justifyContent: "center",
              alignItems: "center",
              gap: 4, // Matches Grid spacing={4}
              width: "100%",
            }}
          >
            {/* Left Side - Text */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  textAlign: "center",
                  background: "#ffffffcc",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  Welcome to Qubot
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Join Qubot to get started on your financial journey
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    borderRadius: "30px",
                    boxShadow: 3,
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}