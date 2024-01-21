import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../constants/url";
import moment from "moment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BuyOffer from "../components/offerPage/BuyOffer";
import ServiceOffer from "../components/offerPage/ServiceOffer";
import RentOffer from "../components/offerPage/RentOffer";
import AuthContext from "../store/auth-context";

const OfferPage = () => {
  const params = useParams();
  const theme = useTheme();
  const [offerData, setOfferData] = useState();
  const [loadingOffer, setLoadingOffer] = useState(false);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    setLoadingOffer(true);

    axios
      .get(`${BASE_API}/oferty/${params.offerId}`)
      .then((res) => setOfferData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingOffer(false));
  }, [setOfferData, params]);

  if (loadingOffer) {
    return (
      <Container>
        <CircularProgress size={64} />
      </Container>
    );
  }

  if (!offerData) {
    return (
      <Typography>
        Oops, coś poszło nie tak. Wróć na poprzednią stronę!
      </Typography>
    );
  }

  return (
    <Container sx={{ marginTop: 2, marginBotton: 8 }}>
      {console.log(authCtx.userId)}
      {offerData.typ === "kupno" && <BuyOffer offerData={offerData} />}
      {offerData.typ === "wypozyczenie" && <RentOffer offerData={offerData} />}
      {offerData.typ === "usluga" && <ServiceOffer offerData={offerData} />}
    </Container>
  );
};

export default OfferPage;
