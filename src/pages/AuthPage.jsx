import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import axios from "axios";
import { BASE_API } from "../constants/url";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [inputsValid, setInputValid] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [selectCommunity, setSelectCommunity] = useState(false); // overrides log in screen with community selectrion screen
  const [choosenCommunity, setChoosenCommunity] = useState();
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetHandler = () => {
    setLogin("");
    setPassword("");
    setShowPassword(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    console.log("Login: " + login + ", hasło: " + password);

    const userData = await axios.post(`${BASE_API}/uzytkownik/login`, {
      username: login,
      password: password,
    });

    if (userData === null) {
      setLoading(false);
      console.log("Brak połączenia z bazą");
    }

    if (userData.status !== 200) {
      setLoading(false);
      console.log("Nie udalo sie zalogowac uzytkownika!");
      console.log(userData.data);

      setInputValid(false);
      return;
    }
    setLoading(false);
    setUserData(userData.data);

    if (userData.data.typ === "superadmin") {
      authCtx.login(userData.data.id, login, null, null, userData.data.typ);
      navigate("/super-admin");
      return;
    }

    setCommunityList(userData.data.listaWspolnot);
    setChoosenCommunity(userData.data.listaWspolnot[0].id);
    setSelectCommunity(true);
    console.log(userData);
  };

  const communityChangeHandler = (e) => {
    setChoosenCommunity(e.target.value);
  };

  const submitCommunityHandler = () => {
    console.log(userData.listaWspolnot[choosenCommunity]);
    const community = userData.listaWspolnot.filter(
      (el) => el.id === choosenCommunity
    )[0];
    console.log(community);
    authCtx.login(
      userData.id,
      login,
      choosenCommunity,
      community.nazwa,
      userData.typ
    );
    localStorage.setItem("commId", choosenCommunity);

    // Check if logged user is Admin or SuperAdmin - if so navigate him to different destination
    if (userData.typ === "admin") {
      navigate("/admin");
      return;
    }

    if (userData.typ === "superadmin") {
      navigate("/super-admin");
      return;
    }

    navigate("/wall");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          paddingTop: 2,
          paddingRight: 2,
          paddingLeft: 2,
          paddingBottom: 2,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 1,
          marginTop: 8,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          textAlign="center"
          color={theme.palette.background.default}
        >
          Commu-Tools
        </Typography>
      </Box>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 4,
          paddingTop: 4,
          paddingRight: 8,
          paddingBottom: 4,
          paddingLeft: 8,
        }}
      >
        {!selectCommunity ? (
          <>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              Zaloguj się
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {!inputsValid && (
                <Alert severity="error">
                  Wprowadzona nazwa użytkownika i/lub hasło są nieprawidłowe.
                  Spróbuj ponownie.
                </Alert>
              )}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography color={!inputsValid && theme.palette.error.main}>
                  Użytkownik
                </Typography>
                <TextField
                  error={!inputsValid}
                  size="small"
                  variant="outlined"
                  value={login}
                  onChange={(e) => {
                    setInputValid(true);
                    return setLogin(e.target.value);
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography color={!inputsValid && theme.palette.error.main}>
                  Hasło
                </Typography>
                <OutlinedInput
                  error={!inputsValid}
                  id="outlined-adornment-password"
                  size="small"
                  variant="outlined"
                  value={password}
                  onChange={(e) => {
                    setInputValid(true);
                    return setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  marginTop: 4,
                }}
              >
                <Button variant="text" onClick={resetHandler}>
                  Wyczyść
                </Button>
                {!loading ? (
                  <Button variant="contained" onClick={submitHandler}>
                    Zaloguj
                  </Button>
                ) : (
                  <CircularProgress size={64} />
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Wybierz wspólnote
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Wspólnota</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={choosenCommunity}
                label="Wspólnota"
                onChange={communityChangeHandler}
              >
                {communityList.map((comm) => (
                  <MenuItem key={comm.id} value={comm.id}>
                    {comm.nazwa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={submitCommunityHandler}
              >
                Potwierdź
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AuthPage;
