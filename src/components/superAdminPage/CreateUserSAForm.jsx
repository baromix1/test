import {
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useContext, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../constants/url";
import AuthContext from "../../store/auth-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateUserSAForm = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwd2, setPasswd2] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [commId, setCommId] = useState("");

  const handleAlert = () => {
    setAlertOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const userTypeChangeHandler = (e) => {
    setUserType(e.target.value);
    setApiError(false);
  };

  const submitHandler = () => {
    if (!username.trim() || !passwd.trim() || !passwd.trim()) {
      console.log("Ktores pole jest puste!");
      setFormError(true);
      return;
    }

    if (passwd.trim() !== passwd2.trim()) {
      setFormError(true);
      console.log("Hasla sie nie zgadzaja!");
      return;
    }

    setLoading(true);
    axios
      .post(`${BASE_API}/uzytkownik/register`, {
        username: username,
        password: passwd,
        typ: userType,
        idWspolnoty: commId,
      })
      .then((res) => {
        console.log(res);
        alert("Dodano uzytkownika " + username);
        if (res.status === 200) {
          handleAlert();
          setUsername("");
          setPasswd("");
          setPasswd2("");
        }
      })
      .catch((err) => {
        console.log(err);
        setApiError(true);
        alert("Wystapil blad!");
      })
      .finally(() => setLoading(false));
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
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Pomyślnie dodano użytkownika!
          </Alert>
        </Snackbar>

        <Typography>Tworzenie nowego konta użytkownika</Typography>
        <IconButton onClick={() => navigate("/admin")}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
      <Alert
        severity="error"
        sx={
          apiError ? { display: "flex", marginBottom: 4 } : { display: "none" }
        }
      >
        <AlertTitle>Wystąpił błąd podczas komunikacji z bazą</AlertTitle>
        Prawdopodobnie taki użytkownik już istnieje lub wystąpił problem z bazą
      </Alert>
      <Alert
        severity="error"
        sx={
          formError ? { display: "flex", marginBottom: 4 } : { display: "none" }
        }
      >
        <AlertTitle>Niepoprawnie wypełniony formularz</AlertTitle>
        Sprawdź czy poprawnie wypełniłeś każde pole formularza i czy wprowadzone
        hasła się zgadzają.
      </Alert>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          value={username}
          onChange={(e) => {
            setApiError(false);
            setFormError(false);
            setUsername(e.target.value);
          }}
          size="small"
          label="Nazwa użytkownika"
          variant="outlined"
        />
        <TextField
          value={passwd}
          onChange={(e) => {
            setApiError(false);
            setFormError(false);
            setPasswd(e.target.value);
          }}
          size="small"
          label="Hasło"
          variant="outlined"
        />
        <TextField
          value={passwd2}
          onChange={(e) => {
            setApiError(false);
            setFormError(false);
            setPasswd2(e.target.value);
          }}
          size="small"
          label="Powtórz hasło"
          variant="outlined"
        />
        <TextField
          value={commId}
          onChange={(e) => {
            setApiError(false);
            setFormError(false);
            setCommId(e.target.value);
          }}
          size="small"
          label="Id Wspólnoty"
          variant="outlined"
        />
        <FormControl>
          <Typography sx={{ marginBottom: 1, marginTop: 2 }}>
            Typ użytkownika
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="user"
            name="userTypeRadio"
            value={userType}
            onChange={userTypeChangeHandler}
          >
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="Zwykły użytkownik"
            />
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="Administrator"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress size={32} />
          ) : (
            <Button variant="contained" onClick={submitHandler}>
              Dodaj użytkownika
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateUserSAForm;
