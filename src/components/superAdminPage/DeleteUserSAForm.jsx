import {
  Box,
  Button,
  Chip,
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

const DeleteUserSAForm = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${BASE_API}/uzytkownik/all-users-without-id`, {
        idWspolnoty: "-1",
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
        alert("Pomyślnie usunięto użytkownika o id: " + id);
        setPeopleList((prev) => {
          let data = [...prev];
          data = data.filter((el) => el.id !== id);
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Wystąpił błąd");
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
              <Box
                sx={{
                  paddingLeft: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography fontWeight={"bold"}>{person.username}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">{`typ: ${person.typ}, ID: ${person.id}`}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingLeft: 2,
                  flexWrap: "wrap",
                }}
              >
                {person.listaWspolnot.map((comm) => (
                  <Chip
                    size="small"
                    color="primary"
                    variant="outlined"
                    key={comm.id}
                    label={`${comm.nazwa} [${comm.id}]`}
                  />
                ))}
              </Box>
              <Button
                sx={{ marginLeft: 2 }}
                onClick={() => deleteHandler(person.id)}
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

export default DeleteUserSAForm;
