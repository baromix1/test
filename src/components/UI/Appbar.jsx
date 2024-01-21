import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Commu-Tools
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {authCtx.userIsLoggedIn && authCtx.userType === "user" && (
            <>
              <Button
                onClick={() => {
                  navigate(`/wall`);
                }}
                sx={{ color: theme.palette.background.default }}
              >
                Oferty
              </Button>
              <Button
                onClick={() => {
                  navigate(`/profile/${authCtx.userId}`);
                }}
                sx={{ color: theme.palette.background.default }}
              >
                Profil
              </Button>
              <Button
                sx={{ color: theme.palette.background.default }}
                onClick={() => {
                  authCtx.logout();
                  navigate("/auth");
                }}
              >
                Wyloguj
              </Button>
            </>
          )}
          {authCtx.userIsLoggedIn &&
            (authCtx.userType === "admin" ||
              authCtx.userType === "superadmin") && (
              <>
                <Button
                  sx={{ color: theme.palette.background.default }}
                  onClick={() => {
                    authCtx.logout();
                    navigate("/auth");
                  }}
                >
                  Wyloguj
                </Button>
              </>
            )}
          {!authCtx.userIsLoggedIn && (
            <>
              <Button
                sx={{ color: theme.palette.background.default }}
                onClick={() => {
                  authCtx.logout();
                  navigate("/auth");
                }}
              >
                Zaloguj
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
