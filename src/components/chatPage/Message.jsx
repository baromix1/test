import React, { useContext } from "react";
import { Container, Typography, Box, Avatar, useTheme } from "@mui/material";
import AuthContext from "../../store/auth-context";

const Message = ({ content, isOwner, idOdbierajacego, odbierajacyImie }) => {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  console.log("wiadomosc");
  console.log({ content, isOwner, idOdbierajacego });
  console.log(`Id obierajacego ${odbierajacyImie}`);
  if (!content) {
    return <p>Brak treści wiadomości</p>;
  }
  return (
    <Container
      className={`Message ${isOwner ? "owner" : ""}`}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: isOwner ? "row-reverse" : "row",
      }}
    >
      <Box sx={{}}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.secondary.main,
            width: 40,
            height: 40,
            marginRight: 1,
          }}
          aria-label="recipe"
        >
          <Typography
            variant="p"
            component="span"
            sx={{
              fontWeight: "bold",
              color: theme.palette.background.default,
              fontSize: "1rem",
            }}
          >
            {isOwner
              ? authCtx.username.substring(0, 1).toUpperCase()
              : odbierajacyImie.substring(0, 1).toUpperCase()}
          </Typography>
        </Avatar>
      </Box>
      <Box
        sx={{
          maxWidth: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            backgroundColor: isOwner
              ? theme.palette.info.dark
              : theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            padding: 1.5,
            borderRadius: isOwner ? "10px 0px 10px 10px" : "0px 10px 10px 10px",
            marginRight: 1,
          }}
        >
          {content}
        </Typography>
      </Box>
    </Container>
  );
};

export default Message;
