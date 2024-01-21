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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../constants/url";
import AuthContext from "../../store/auth-context";

const DeleteUserForm = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${BASE_API}/uzytkownik/users`, {
        idWspolnoty: authCtx.commId.toString(),
      })
      .then((res) => {
        console.log(res);
        setPeopleList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteHandler = (id) => {
    setLoadingDelete(true);
    console.log(id);
    axios
      .delete(`${BASE_API}/uzytkownik/usun-uzytkownika/${id}`)
      .then((res) => {
        console.log(res);
        setPeopleList((prev) => {
          let data = [...prev];
          data = data.filter((el) => el.idUzytkownika !== id);
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
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
        <Typography>Usuwanie konta użytkownika</Typography>
        <IconButton onClick={() => navigate("/admin")}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
      {!loading ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {peopleList.map((person) => (
            <Box
              key={person.idUzytkownika}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography marginLeft={2}>{person.username}</Typography>
              <Button
                sx={{ marginLeft: 2 }}
                onClick={() => deleteHandler(person.idUzytkownika)}
                color="error"
                variant="text"
              >
                Usuń
              </Button>
            </Box>
          ))}
          <Typography
            sx={{ marginTop: 2, fontWeight: "bold" }}
          >{`Ilość osób: ${peopleList.length}`}</Typography>
        </Box>
      ) : (
        <CircularProgress size={64} />
      )}
    </Paper>
  );
};

export default DeleteUserForm;
