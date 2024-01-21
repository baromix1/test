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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../constants/url";
import moment from "moment";
import EastIcon from "@mui/icons-material/East";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AuthContext from "../store/auth-context";

const WallPage = () => {
  const theme = useTheme();
  // const params = useParams();
  const navigate = useNavigate();
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [offersList, setOffersList] = useState([]);
  const [resp, setResp] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const authCtx = useContext(AuthContext);
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setLoadingOffers(true);
    const commId = localStorage.getItem("commId");
    axios
      .post(`${BASE_API}/oferty/all/${commId}`, {
        pageIndex: 1,
        pageSize: 999,
        type: type,
        sort: "",
        search: search,
      })
      .then((res) => {
        console.log(res);
        setOffersList(res.data.data);
        setResp(res.data);
      })
      .catch((err) => {
        console.log("Nie znaleziono osiedla");
        console.log(err);
      })
      .finally(() => {
        setLoadingOffers(false);
      });
  }, [search, type]);

  const createOfferHandler = () => {
    navigate("/wall/create-offer");
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 8 }}>
      {console.log("WallPage rerender")}

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ marginTop: 4, padding: 4, display: "flex" }}
            onClick={createOfferHandler}
          >
            Utwórz nowe ogłoszenie
          </Button>
        </Box>
        <Typography variant="h6" textAlign="center" margin={2}>
          Dostępne oferty
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 4 }}>
          <Typography>Wyszukaj po nazwie</Typography>
          <TextField
            variant="outlined"
            value={searchVal}
            onChange={(e) => {
              return setSearchVal(e.target.value);
            }}
          />
          <Button onClick={() => setSearch(searchVal)}>Szukaj</Button>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Typ oferty
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={(_, value) => setType(value)}
            >
              <FormControlLabel
                value=""
                control={<Radio />}
                label="Wszystkie"
              />
              <FormControlLabel
                value="kupno"
                control={<Radio />}
                label="Kupno"
              />
              <FormControlLabel
                value="usluga"
                control={<Radio />}
                label="Usługa"
              />
              <FormControlLabel
                value="wypozyczenie"
                control={<Radio />}
                label="Wypożyczenie"
              />
            </RadioGroup>
          </FormControl>
        </Box>
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
            <>
              {offersList.map((offer) => (
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
                            (offer.typ === "wypozyczenie" && (
                              <HandshakeIcon />
                            )) ||
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
                      }}
                    >
                      <Button
                        startIcon={<EastIcon />}
                        variant="contained"
                        onClick={() => navigate(`/offer/${offer.id}`)}
                      >
                        Przejdź do oferty
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              {/* <Stack
                sx={{
                  marginTop: 8,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                spacing={2}
              >
                <Pagination
                  count={Math.ceil(resp.count / offersList.length)}
                  color="primary"
                  onChange={(_, value) => setPageIndex(value)}
                />
              </Stack> */}
            </>
          ) : (
            <Typography textAlign="center">Nic tu nie ma!</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default WallPage;
