import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Typography,
    colors,
    useTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import { shadows } from '@mui/system';
  import { useContext } from "react";
  import axios from "axios";
  import { useNavigate, useParams } from "react-router-dom";
  import { BASE_API } from "../constants/url";
  import moment from "moment";
  import EastIcon from "@mui/icons-material/East";
  import LocalOfferIcon from "@mui/icons-material/LocalOffer";
  import HandshakeIcon from "@mui/icons-material/Handshake";
  import DesignServicesIcon from "@mui/icons-material/DesignServices";
  import AuthContext from "../store/auth-context";
  import React, { useState } from "react";
  import Sidebar from "../components/chatPage/Sidebar";
  import Chat from "../components/chatPage/Chat";
  

  const ChatPage = () => {
    return (
        <Container disableGutters sx={{ 
            display: "flex",
            height: '80vh',
            marginTop: 5,
            border: "1px solid black",
            //borderRadius: 10, 
            overflow: 'hidden',
            boxShadow: 3,
            }}>
            {console.log("ChatPage renderer")}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", 
              height: "100%",
            }}
          >
          <Sidebar/>
          <Chat/>
          </Box>
        </Container>
      );
  };
  
  export default ChatPage;
  