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
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { BASE_API } from "../constants/url";
import EastIcon from "@mui/icons-material/East";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import moment from "moment";

const TransactionsHistoryPage = () => {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE_API}/Historiatransakcji/${authCtx.userId}`)
      .then((res) => {
        console.log(res);
        setOffers(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography textAlign="center" margin={2} variant="h6">
        Historia transakcji
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={64} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {offers.length > 0 ? (
            offers.map((offer) => (
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
                    "Zakupiono: " +
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
                  <Typography variant="body2">{offer.opis}</Typography>
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

export default TransactionsHistoryPage;
