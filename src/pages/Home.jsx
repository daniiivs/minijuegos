import Menu from "../components/Menu.jsx";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import { useNavigate } from "react-router-dom";
import React from "react";

// Página de Inicio
function Home() {
  const navigate = useNavigate();

  // Navegar al hacer click en botón de palabras encadenadas
  function handleClickChained() {
    navigate('/chained')
  }

  // Navegar al hacer click en botón de matemáticas
  function handleClickMath() {
    navigate('/math')
  }

  // Navegar al hacer click en botón de recordar palabras
  function handleClickRemember() {
    navigate('/remember')
  }

  return (
    <>
      <Menu page={"Inicio"} />
      <Box display="flex"
           flexDirection="column"
           justifyContent="center"
           alignItems="center"
           minHeight="77vh"
      >
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>SELECCIONA UN JUEGO</Typography>
        <Typography variant="h6" color="secondary" sx={{ fontStyle: "italic" }}>O di "Navegar a (juego)" para empezar</Typography>
        <Stack spacing={8} sx={{mt: 8}}>
          <Button variant="outlined" onClick={handleClickChained} sx={{ width: 350, height: 60, fontSize: "1.2rem" }} startIcon={<LinkRoundedIcon />}>Palabras encadenadas</Button>
          <Button variant="outlined" onClick={handleClickRemember} sx={{ width: 350, height: 60, fontSize: "1.2rem" }} startIcon={<FormatListNumberedRoundedIcon />}>Recordar palabras</Button>
          <Button variant="outlined" onClick={handleClickMath} sx={{ width: 350, height: 60, fontSize: "1.2rem" }} startIcon={<CalculateRoundedIcon />}>Matemáticas</Button>
        </Stack>
      </Box>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0, boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Minijuegos 2025
          </Typography>
        </Toolbar>
      </AppBar>
      <Box height="64px"/>
    </>
  );
}

export default Home;