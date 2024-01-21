import moment from "moment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EastIcon from "@mui/icons-material/East";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Typography,
  useTheme,
  Card,
  CardMedia,
  CardActionArea,
  CardHeader,
  CardActions,
  IconButton,
  FavoriteIcon,
  Avatar,
  Button,
  CardContent,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { BASE_API } from "../../constants/url";
import { useNavigate } from "react-router-dom";

const RentOffer = ({ offerData }) => {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [openPendingDialog, setOpenPendingDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handlePendingDialogOpen = () => {
    setOpenPendingDialog(true);
  };

  const handlePendingDialogClose = () => {
    setOpenPendingDialog(false);
  };

  useEffect(() => {
    setCommentsList(offerData.listaKomentarzy);
  }, []);

  const commentSubmitHandler = () => {
    setLoading(true);
    axios
      .post('${BASE_API}/oferty/add/komentarz', {
        data: new Date(),
        idUzytkownika: authCtx.userId,
        idOferty: offerData.id,
        tresc: comment.trim(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setComment("");
    setCommentsList((prev) => {
      let newList = [...prev];
      newList.push({
        data: new Date(),
        username: authCtx.username,
        idKomentarza: offerData.id + Math.random(),
        tresc: comment.trim(),
      });
      return newList;
    });
  };

  const deleteSubmitHandler = () => {
    setDeleteLoading(true);
    console.log(offerData.id);
    axios
      .delete(`${BASE_API}/oferty/usun-oferte/${offerData.id}`)
      .then((res) => {
        console.log(res);
        alert(`Usunięto ofertę o id: ${offerData.id}`);
      })
      .catch((err) => {
        console.log(err);
        alert("Nie udało się usunąć oferty");
      })
      .finally(() => {
        setDeleteLoading(false);
        navigate("/wall");
      });
  };

  const pendingSubmitHandler = () => {
    setPendingLoading(true);
    console.log(offerData.id);
    axios
      .put(
        `${BASE_API}/oferty/change-oferta-to-pending?idOferty=${offerData.id}`
      )
      .then((res) => {
        console.log(res);
        alert(`Kupiono przedmiot ${offerData.tytul}`);
      })
      .catch((err) => {
        console.log(err);
        alert("Wystąpił błąd nie kupiono oferty");
      })
      .finally(() => {
        setPendingLoading(false);
        navigate("/wall");
      });
  };

  return (
    <Container>
      {offerData.username === authCtx.username ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 2,
            }}
          ></Box>
          <Typography
            variant="h5"
            textAlign="center"
            margin={2}
            fontWeight="bold"
          >
            To twoja oferta
          </Typography>
        </Box>
      ) : (
        console.log("nope")
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              paddingTop: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              elevation: 3,
              fontWeight: "bold",
            }}
            variant="h4"
          >
            {offerData.tytul.charAt(0).toUpperCase() + offerData.tytul.slice(1)}
          </Typography>
          <Typography>
            {"Dodano: " +
              moment(offerData.dataDodaniaOferty)
                .locale("pl")
                .format("DD MMM YYYY, hh:mm")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Chip
            icon={<HandshakeIcon />}
            label={offerData.typ}
            color="primary"
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main }}
          >
            {offerData.cena ? `${offerData.cena} zł` : "Cena do uzgodnienia"}
          </Typography>
        </Box>
      </Box>
      {offerData.zdjecie && (
        <img
          height={400}
          src={"data:image/png;base64," + offerData.zdjecie}
          alt="Nie udało się załadować zdjęcia."
          style={{ objectFit: "cover" }}
        />
      )}
      <Typography
        variant="body1"
        color="primary"
        fontWeight="bold"
      >{`Sprzedający: ${offerData.username}`}</Typography>
      <Typography>
        {"Okres możliwości skorzystania z wypożyczenia: " +
          moment(offerData.dataOdKiedy)
            .locale("pl")
            .format("DD MMM YYYY, hh:mm") +
          " - " +
          moment(offerData.dataDoKiedy)
            .locale("pl")
            .format("DD MMM YYYY, hh:mm")}
      </Typography>
      <Typography>{offerData.opis}</Typography>
      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          elevation: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Skomentuj ogłoszenie:
        </Typography>

        <TextField
          variant="outlined"
          value={comment}
          onChange={(e) => {
            return setComment(e.target.value);
          }}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!loading ? (
            <Button
              disabled={!comment.trim()}
              startIcon={<AddCommentIcon />}
              onClick={commentSubmitHandler}
              variant="contained"
            >
              Dodaj komentarz
            </Button>
          ) : (
            <CircularProgress size={64} />
          )}
        </Box>
      </Box>

      <Box
        sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {commentsList
          .slice(0)
          .reverse()
          .map((el) => {
            return (
              <Card elevation={3}>
                <CardHeader
                  fontWeight="bold"
                  avatar={
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        width: 56,
                        height: 56,
                      }}
                      aria-label="recipe"
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "400",
                          color: theme.palette.background.default,
                        }}
                      >
                        {el.username.substring(0, 1).toUpperCase()}
                      </Typography>
                    </Avatar>
                  }
                  action={<IconButton aria-label="settings"></IconButton>}
                  titleTypographyProps={{ fontWeight: "bold" }}
                  subheaderTypographyProps={{ fontSize: 18 }}
                  title={
                    el.username +
                    ", " +
                    moment(el.data).locale("pl").format("DD MMM YYYY, hh:mm")
                  }
                  subheader={el.tresc}
                />
              </Card>
            );
          })}
      </Box>
      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          elevation: 3,
        }}
      >
        {offerData.username === authCtx.username ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {!deleteLoading ? (
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteDialogOpen}
                variant="contained"
              >
                Usuń ogłoszenie
              </Button>
            ) : (
              <CircularProgress size={64} />
            )}

            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
              <DialogTitle>Czy na pewno chcesz usunąć ogłoszenie?</DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteDialogClose} color="primary">
                  Anuluj
                </Button>
                <Button onClick={deleteSubmitHandler} color="error">
                  Usuń
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {!pendingLoading ? (
              <Button
                color="success"
                startIcon={<ShoppingCartIcon />}
                onClick={handlePendingDialogOpen}
                variant="contained"
              >
                Wypożycz przedmiot
              </Button>
            ) : (
              <CircularProgress size={64} />
            )}

            <Dialog open={openPendingDialog} onClose={handlePendingDialogClose}>
              <DialogTitle>
                Czy na pewno chcesz wypożyczyć przedmiot?
              </DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handlePendingDialogClose} color="primary">
                  Anuluj
                </Button>
                <Button onClick={pendingSubmitHandler} color="success">
                  Wypożycz
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RentOffer;
