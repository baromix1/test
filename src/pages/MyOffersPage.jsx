import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EastIcon from "@mui/icons-material/East";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { BASE_API } from "../constants/url";
import moment from "moment";

const MyOffersPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [offersList, setOffersList] = useState([]);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    setLoadingOffers(true);
    axios
      .post(`${BASE_API}/oferty/all/user`, {
        idUzytkownika: authCtx.userId,
        idWspolnoty: authCtx.commId,
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        data = data.filter((item) => item.czyZakonczona === "false");
        setOffersList(data);
      })
      .catch((err) => {
        console.log("Nie znaleziono osiedla");
        console.log(err);
      })
      .finally(() => {
        setLoadingOffers(false);
      });
  }, []);

  const deleteOfferHandler = (id) => {
    axios
      .delete(`${BASE_API}/oferty/usun-oferte/${id}`)
      .then((res) => {
        console.log(res);
        alert(`Pomyślnie usunięto ofertę o id: ${id}`);
        setOffersList((prev) => {
          let newData = [...prev];
          newData = newData.filter((item) => item.id !== id);
          return newData;
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Wystąpił błąd podczas usuwania oferty!");
      });
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 8 }}>
      {console.log("MyOffersPage rerender")}

      <Box>
        <Typography variant="h6" textAlign="center" margin={2}>
          Moje oferty
        </Typography>
      </Box>
      {loadingOffers && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={64} />
        </Box>
      )}
      {!loadingOffers && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {offersList.length > 0 ? (
            offersList.map((offer) => (
              <Card key={offer.id} elevation={10}>
                <CardHeader
                  titleTypographyProps={{
                    variant: "h5",
                    fontWeight: "bold",
                  }}
                  title={offer.tytul}
                  subheaderTypographyProps={{
                    variant: "subtitle2",
                  }}
                  subheader={
                    "Dodano: " +
                    moment(offer.dataDodaniaOferty)
                      .locale("pl")
                      .format("DD MMM YYYY, hh:mm")
                  }
                  action={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <Chip
                        icon={
                          (offer.typ === "kupno" && <LocalOfferIcon />) ||
                          (offer.typ === "wypozyczenie" && <HandshakeIcon />) ||
                          (offer.typ === "usluga" && <DesignServicesIcon />)
                        }
                        label={offer.typ}
                        color="primary"
                      />
                      <Typography
                        color={theme.palette.primary.main}
                        fontWeight="bold"
                        variant="h5"
                      >
                        {offer.cena
                          ? `${offer.cena} zł`
                          : "Cena do uzgodnienia"}
                      </Typography>
                    </Box>
                  }
                />
                {offer.zdjecie && (
                  <CardMedia
                    component="img"
                    height="400"
                    image={"data:image/png;base64," + offer.zdjecie}
                    alt="Nie udało się załadować zdjęcia."
                  />
                )}
                <CardContent>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                  >{`Sprzedający: ${offer.username}`}</Typography>
                  <Typography variant="body2">
                    {offer.opis.substring(0, 100)}
                    {offer.opis.length > 100 && "..."}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 2,
                      gap: 1,
                    }}
                  >
                    <Button
                      startIcon={<EastIcon />}
                      variant="contained"
                      onClick={() => navigate(`/offer/${offer.id}`)}
                    >
                      Przejdź do oferty
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteOfferHandler(offer.id)}
                    >
                      Usuń ofertę
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography textAlign="center">Nic tu nie ma!</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default MyOffersPage;
