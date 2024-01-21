import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../constants/url";

const RemoveFromCommForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);

  const deleteHandler = () => {
    // setLoading(true);
    // axios
    //   .delete(`${BASE_API}/uzytkownik/usun-uzytkownika/${userId}`)
    //   .then((res) => {
    //     console.log(res);
    //     alert(`Usunięto użytkownika o id: ${userId}`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // TO USUWA CALEGO UZYTKOWNIKA A NIE Z WSPOLNOTY XD
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography>Usuwanie użytkownika ze wspólnoty</Typography>
        <IconButton onClick={() => navigate("/admin")}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="ID użytkownika"
          type="number"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          {!loading ? (
            <Button
              variant="contained"
              disabled={!userId}
              onClick={deleteHandler}
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

export default RemoveFromCommForm;
