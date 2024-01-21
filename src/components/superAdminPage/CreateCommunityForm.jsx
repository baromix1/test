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

const CreateCommunityForm = () => {
  const [commName, setCommName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    setLoading(true);

    if (!commName.trim() || !cityName.trim()) {
      console.log("Cos jest puste");
      return;
    }

    axios
      .post(`${BASE_API}/wspolnoty/dodaj-wspolnote`, {
        nazwa: commName,
        miasto: cityName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
      <Box>
        <Typography sx={{ marginBottom: 2 }}>
          Tworzenie nowej wspólnoty
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Nazwa wspólnoty</Typography>
          <TextField
            size="small"
            variant="outlined"
            value={commName}
            onChange={(e) => setCommName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Miasto wspólnoty</Typography>
          <TextField
            size="small"
            variant="outlined"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          {!loading ? (
            <Button
              disabled={!commName.trim() || !cityName.trim()}
              onClick={submitHandler}
              variant="contained"
            >
              Utwórz
            </Button>
          ) : (
            <CircularProgress size={32} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateCommunityForm;
