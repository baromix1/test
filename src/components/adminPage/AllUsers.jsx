import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../constants/url";
import AuthContext from "../../store/auth-context";

const AllUsers = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(authCtx.commId);
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
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authCtx]);

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
        <Typography>Wszyscy użytkownicy wspólnoty</Typography>
        <IconButton onClick={() => navigate("/admin")}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
      <Divider />
      {!loading ? (
        <Box>
          {peopleList.map((person, index) => (
            <Box key={person.idUzytkownika}>
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
                  <Typography variant="caption">{`ID: ${person.idUzytkownika}`}</Typography>
                </Box>
              </Box>
              <Divider />
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

export default AllUsers;
