import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API } from "../../constants/url";

const DeleteCommunityForm = () => {
  const [loading, setLoading] = useState(false);
  const [commList, setCommList] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE_API}/wspolnoty`)
      .then((res) => {
        setCommList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteHandler = (id) => {
    console.log(id);
    axios
      .delete(`${BASE_API}/wspolnoty/usun-wspolnote/${id}`, {
        id: id,
      })
      .then((res) => {
        console.log(res);
        setCommList((prev) => {
          let newData = [...prev];
          newData = newData.filter((el) => el.id !== id);
          return newData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
      <Box>
        <Typography sx={{ marginBottom: 2 }}>Usuwanie wspólnoty</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {!loading ? (
            commList.map((comm) => (
              <Box
                key={comm.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ marginLeft: 2 }}
                >{`${comm.nazwa} - (${comm.miasto}) - [id: ${comm.id}]`}</Typography>
                <Button onClick={() => deleteHandler(comm.id)} color="error">
                  Usuń
                </Button>
              </Box>
            ))
          ) : (
            <CircularProgress size={64} />
          )}
          <Typography
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >{`Liczba wspólnot: ${commList.length}`}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DeleteCommunityForm;
