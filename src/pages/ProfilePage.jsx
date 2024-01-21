import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { BASE_API } from "../constants/url";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RestoreIcon from "@mui/icons-material/Restore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const ProfilePage = () => {
  const params = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
    if (authCtx.userId.toString() === params.userId.toString()) {
      setIsProfileOwner(true);
    }

    axios
      .get(`${BASE_API}/uzytkownik/${params.userId}`)
      .then((res) => {
        console.log(res);
        setUsername(res.data.username);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress size={64} />
      </Box>
    );
  }

  if (isProfileOwner) {
    return (
      <Container sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{`Witaj ${authCtx.username}!`}</Typography>
            <Typography variant="h6">{`Twoje ID: ${authCtx.userId}`}</Typography>
            <Avatar
              sx={{
                backgroundColor: theme.palette.secondary.main,
                width: 156,
                height: 156,
              }}
              aria-label="recipe"
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "400",
                  color: theme.palette.background.default,
                }}
              >
                {authCtx.username.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          </Box>

          <Button
            onClick={() => navigate("/transaction-history")}
            startIcon={<RestoreIcon />}
            variant="contained"
          >
            Historia transakcji
          </Button>
          <Button
            onClick={() => navigate("/my-offers")}
            startIcon={<LocalOfferIcon />}
            variant="contained"
          >
            Moje oferty
          </Button>
          <Button
            onClick={() => navigate("/my-pending-offers")}
            startIcon={<BookmarkAddedIcon />}
            variant="contained"
          >
            Oczekujące oferty
          </Button>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5">{`Profil użytkownika ${username}`}</Typography>
          <Avatar
            sx={{
              backgroundColor: theme.palette.secondary.main,
              width: 156,
              height: 156,
            }}
            aria-label="recipe"
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: "400",
                color: theme.palette.background.default,
              }}
            >
              {authCtx.username.substring(0, 1).toUpperCase()}
            </Typography>
          </Avatar>
          <Button startIcon={<ChatBubbleIcon />} variant="contained">
            Rozpocznij chat
          </Button>
        </Box>
      </Container>
    );
  }
};

export default ProfilePage;
