import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BASE_API } from "../../constants/url";
import { useState } from "react";

const RemoveUserFromCommunityForm = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [commId, setCommId] = useState();

  const submitHandler = () => {
    setLoading(true);

    if (!userId || !commId) {
      console.log("Cos jest puste");
      return;
    }
    console.log(userId + " " + commId);

    axios
      .delete(
        `${BASE_API}/uzytkownik/usun-uzytkownika-z-wspolnoty?idUzytkownika=${userId}&idWspolnoty=${commId}`
      )
      .then((res) => {
        console.log(res);
        alert(
          `Usunięto uzytkownika o id: ${userId} ze wspolnoty o id: ${commId}`
        );
      })
      .catch((err) => {
        console.log(err);
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
          Usuwanie osoby ze wspólnoty
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
              Usuń
            </Button>
          ) : (
            <CircularProgress size={32} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default RemoveUserFromCommunityForm;
