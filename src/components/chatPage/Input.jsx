import React, { useState, useContext } from "react";
import { Container, Box, TextField, Button, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from '@mui/icons-material/Refresh';
import AuthContext from "../../store/auth-context";
import { useLocation } from "react-router-dom";
import { BASE_API } from "../../constants/url";

const Input = ({ onSendMessage, onRefreshMessages }) => {
  const [message, setMessage] = useState("");
  const { userId } = useContext(AuthContext);
  const location = useLocation();
  const recipientId = location.state?.userId;
  const theme = useTheme();


  const refreshMessages = () => {
    onRefreshMessages(true); 
  };

  const sendMessage = () => {
    if (message) {
      fetch(`${BASE_API}/Konwersacje/wyslij-wiadomosc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idWysylajacego: userId,
          idOdbierajacego: recipientId,
          idWspolnoty: 0,
          trescWiadomosci: message,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          if (
            response.status === 204 ||
            response.headers.get("Content-Length") === "0"
          ) {
            return null;
          }
          return response.json(); 
        })
        .then((data) => {
          setMessage("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

        console.log({
        idWysylajacego: userId,
        idOdbierajacego: recipientId,
        idWspolnoty: 0,
        trescWiadomosci: message,
      });
      setTimeout(() => {
        onSendMessage();
      }, 1000);
    }
  };

  return (
    <Container disableGutters>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          bgcolor: theme.palette.info.light,
          padding: "10px",
          width: "100%",
        }}
      >
        <TextField
          label="Type something..."
          variant="standard"
          sx={{ width: "100%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="success"
          sx={{ marginLeft: "5px" }}
          onClick={sendMessage}
        >
          Wyślij
        </Button>
        <Button
          variant="contained"
          onClick={refreshMessages}
          endIcon={<RefreshIcon />}
          color="success"
          sx={{ marginLeft: "5px" }}
        >
          Odśwież
        </Button>
      </Box>
    </Container>
  );
};

export default Input;
