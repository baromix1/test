import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Outlet, useNavigate } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const SuperAdminPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const showDeleteUserFormHandler = () => {
    navigate("/super-admin/delete-user");
  };

  const showCreateUserFormHandler = () => {
    navigate("/super-admin/create-user");
  };

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Typography variant="h6">{`Panel Super-Administratora`}</Typography>
      </Box>
      <Outlet />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Wspólnoty i użytkownicy</Typography>
          <Button
            startIcon={<Diversity3Icon />}
            sx={{ padding: 2 }}
            variant="contained"
            onClick={() => navigate("/super-admin/all-communities")}
          >
            Pokaż wszystkie wspólnoty
          </Button>
          <Button
            startIcon={<GroupsIcon />}
            sx={{ padding: 2 }}
            variant="contained"
            onClick={() => navigate("/super-admin/all-users")}
          >
            Pokaż wszystkich użytkowników
          </Button>
          <Typography sx={{ marginTop: 2 }}>Edycja wspólnot</Typography>
          <Button
            startIcon={<GroupAddIcon />}
            sx={{ padding: 2 }}
            color="success"
            variant="contained"
            onClick={() => navigate("/super-admin/create-community")}
          >
            Stwórz nową wspólnotę
          </Button>
          <Button
            startIcon={<DeleteForeverIcon />}
            sx={{ padding: 2 }}
            color="error"
            variant="contained"
            onClick={() => navigate("/super-admin/delete-community")}
          >
            Usuń istniejącą wspólnotę
          </Button>
          <Typography sx={{ marginTop: 2 }}>Edycja użytkowników</Typography>
          <Button
            startIcon={<GroupAddIcon />}
            sx={{ padding: 2 }}
            color="success"
            variant="outlined"
            onClick={() => navigate("/super-admin/add-user-to-community")}
          >
            Dodaj członka do wybranej wspólnoty
          </Button>
          <Button
            startIcon={<GroupRemoveIcon />}
            sx={{ padding: 2 }}
            color="error"
            variant="outlined"
            onClick={() => navigate("/super-admin/remove-user-from-community")}
          >
            Usuń członka z wybranej wspólnoty
          </Button>
          <Button
            startIcon={<PersonAddIcon />}
            sx={{ padding: 2 }}
            color="success"
            variant="contained"
            onClick={showCreateUserFormHandler}
          >
            Utwórz nowego użytkownika
          </Button>
          <Button
            startIcon={<PersonOffIcon />}
            sx={{ padding: 2 }}
            color="error"
            variant="contained"
            onClick={showDeleteUserFormHandler}
          >
            Usuń istniejące konto
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuperAdminPage;
