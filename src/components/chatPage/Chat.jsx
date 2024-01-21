import { Box, Button, Container, Paper, Typography, useTheme } from "@mui/material";
import React ,{useState} from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const userObject = location.state;
  const [refreshMessages, setRefreshMessages] = useState(false);
  const theme = useTheme();

  const handleSendMessage = () => {
    setRefreshMessages(true);
  };
  
  return (
    <Container
      maxWidth={false} 
      disableGutters 
      sx={{
        height: "100%", 
        width: "100%", 
        flex: 2,
      }}
    >
      <Box
        sx={{
          height: "50px",
          bgcolor:  theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%", 
          m: 0,
          p: 0, 
        }}
      >
        {userObject && userObject.username && (
          <Typography variant="h6" sx={{ ml: 3 }}>
            {userObject.username} ({userObject.userId})
          </Typography>
        )}
      </Box>
      <Messages refreshFlag={refreshMessages} setRefreshFlag={setRefreshMessages} />
      <Input onSendMessage={handleSendMessage} onRefreshMessages={setRefreshMessages} />
    </Container>
  );
};

export default Chat;
