import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AddUserForm from "../components/adminPage/AddUserForm";
import DeleteUserForm from "../components/adminPage/DeleteUserForm";
import RemoveFromCommForm from "../components/adminPage/RemoveFromCommForm";
import CreateUserForm from "../components/adminPage/CreateUserForm";
import { Outlet, useNavigate } from "react-router-dom";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const AdminPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const showAllUsersHandler = () => {
    navigate("/admin/show-all-users");
  };

  const showDeleteUserFormHandler = () => {
    navigate("/admin/delete-user");
  };

  const showCreateUserFormHandler = () => {
    navigate("/admin/create-user");
  };

  const showRemoveFromCommUserFormHandler = () => {
    navigate("/admin/remove-user-from-community");
  };

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">{`Witaj ${authCtx.username}`}</Typography>
        <Typography variant="h6">{`Panel administratora osiedla: ${authCtx.commName}`}</Typography>
      </Box>
      <Outlet />

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body1">Podgląd</Typography>
          <Button
            startIcon={<Diversity3Icon />}
            sx={{ padding: 2 }}
            color="primary"
            variant="contained"
            onClick={showAllUsersHandler}
          >
            Wyświetl wszystkich użytkowników tej wspólnoty
          </Button>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Tworzenie i usuwanie kont użytkowników
          </Typography>
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
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Edycja przynależności użytkowników
          </Typography>
          <Button
            startIcon={<PersonOffIcon />}
            sx={{ padding: 2 }}
            color="error"
            variant="outlined"
            onClick={showRemoveFromCommUserFormHandler}
          >
            Usuń osobę ze wspólnoty
          </Button>
          <Typography>
            Jeżeli potrzebujesz wykonać akcję której nie ma powyżej liście,
            skontaktuj się z superadminem.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminPage;
