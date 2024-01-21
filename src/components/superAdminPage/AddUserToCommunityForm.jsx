import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_API } from "../../constants/url";

const AddUserToCommunityForm = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [commId, setCommId] = useState();

  const submitHandler = () => {
    setLoading(true);

    if (!userId || !commId) {
      console.log("Cos jest puste");
      return;
    }

    axios
      .put(`${BASE_API}/uzytkownik/dodaj-uzytkownika-do-wspolnoty`, {
        idUzytkownika: userId,
        idWspolnoty: commId,
      })
      .then((res) => {
        console.log(res);
        alert(
          `Dodano uzytkownika o id: ${userId} do wspolnoty o id: ${commId}`
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          alert(err.response.data);
          return;
        }
        alert(`Wystąpił błąd!`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
      <Box>
        <Typography sx={{ marginBottom: 2 }}>
          Dodawanie osoby do wspólnoty
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>ID użytkownika</Typography>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>ID wspólnoty</Typography>
          <TextField
            size="small"
            type="number"
            variant="outlined"
            value={commId}
            onChange={(e) => setCommId(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          {!loading ? (
            <Button
              disabled={!userId || !commId}
              onClick={submitHandler}
              variant="contained"
            >
              Dodaj
            </Button>
          ) : (
            <CircularProgress size={32} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default AddUserToCommunityForm;
