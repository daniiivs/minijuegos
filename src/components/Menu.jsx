import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


function Menu(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  function handleClickHome() {
    navigate("/");
  }

  function handleVoiceAction(page) {
    page = page.toString().toLowerCase();

    switch (true) {
      case page.includes("encadenadas"):
        navigate("/chained");
        break;
      case page.includes("matemáticas"):
        navigate("/math");
        break;
      case page.includes("recordar"):
        navigate("/remember");
        break;
      case page.includes("inicio"):
        navigate("/");
        break;
    }
  }

  const commands = [
    {
      command: "(¿)Ir a (la página) *(?)",
      callback: (page) => handleVoiceAction(page)
    },
    {
      command: "(¿)Jugar a *(?)",
      callback: (page) => handleVoiceAction(page)
    },
    {
      command: "Navegar a (la página) *",
      callback: (page) => handleVoiceAction(page)
    }
  ];
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  console.log(transcript);

  if (browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true });
  }

  const DrawerList = (<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      <Link to={"/chained"} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LinkRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Encadenadas" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={"/remember"} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FormatListNumberedRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Recordar" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={"/math"} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalculateRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Matemáticas" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  </Box>);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.page}
            </Typography>
            {props.page !== "Inicio" ?
              <IconButton color="inherit" onClick={handleClickHome}>
                <HomeRoundedIcon />
              </IconButton> :
              null
            }
          </Toolbar>
        </AppBar>
      </Box>
      <Box height="64px" />
    </>
  );
}

export default Menu;