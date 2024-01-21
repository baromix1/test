import { Box, TextField, Typography, Avatar, useTheme } from "@mui/material";
import { useState } from "react";
import { BASE_API } from "../../constants/url";
import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const theme = useTheme();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSearch = () => {
    fetch(`${BASE_API}/Uzytkownik/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
        console.log(data);
        navigate('/chat', { state: { userId: userId, username: data.username } });
      })
      .catch((error) => {
        console.error("Problem z operacją fetch:", error);
        setError(error);
      });
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box>
      <Box>
        <TextField
          label="Szukaj po id"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={handleKey}
        />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {username && (
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
              {username.substring(0, 1).toUpperCase()}
            </Typography>
          </Avatar>
        )}
        <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
          {username}
        </Typography>
      </Box>
    </Box>
  );
};

export default Search;
