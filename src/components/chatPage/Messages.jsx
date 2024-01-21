import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect, useContext, useRef } from "react";
import Message from "./Message";
import { BASE_API } from "../../constants/url";
import AuthContext from "../../store/auth-context";
import { useLocation } from "react-router-dom";

const Messages = ({ refreshFlag, setRefreshFlag }) => {
  const [messages, setMessages] = useState([]);
  const { userId } = useContext(AuthContext);
  const location = useLocation();
  const recipientId = location.state?.userId;
  const recipientName = location.state?.username;
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (userId && recipientId) {
        try {
          const response = await fetch(`${BASE_API}/Konwersacje`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idWysylajacego: userId,
              idOdbierajacego: recipientId,
              idWspolnoty: 0,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
  
    if (refreshFlag) {
      fetchMessages();
      setRefreshFlag(false);
    }
  }, [refreshFlag, userId, recipientId]);
  
  

  useEffect(() => {
    if (!userId || !recipientId) {
      console.log("nie");
      return;
    }
    if (userId && recipientId) {
      console.log(`'Pierwszy' ${userId}, ${recipientId}`);
      fetch(`${BASE_API}/Konwersacje`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idWysylajacego: userId,
          idOdbierajacego: recipientId,
          idWspolnoty: 0, 
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          return []; 
        } else {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      })
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
      
    }
  }, [userId, recipientId]);

  return (
    <Container
      disableGutters
      sx={{
        bgcolor: theme.palette.background.paper,
        height: "calc(100% - 120px)",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "10px",
        }}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <Message
              key={message.id}
              content={message.trescWiadomosci}
              isOwner={message.idWysylajacego == userId}
              idOdbierajacego={recipientId}
              odbierajacyImie={recipientName}
            />
          ))
        ) : (
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            Brak wiadomości, rozpocznij nową konwersację
          </Typography>
        )}
        {}
        <div ref={messagesEndRef} />
      </Box>
    </Container>
  );
};

export default Messages;
