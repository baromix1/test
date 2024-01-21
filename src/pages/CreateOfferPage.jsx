import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BuyForm from "../components/createOffertPage/BuyForm";
import RentForm from "../components/createOffertPage/RentForm";
import ServiceForm from "../components/createOffertPage/ServiceForm";

const CreateOfferPage = () => {
  const [choosenType, setChoosenType] = useState("buy");
  const [chooseTypeVisible, setChooseTypeVisible] = useState(true);

  const startFormHandler = () => {
    setChooseTypeVisible(false);
    console.log(choosenType);
  };
  const changeFormTypeHandler = () => {
    setChooseTypeVisible(true);
  };

  if (chooseTypeVisible) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Typography variant="h6">Tworzenie nowego ogłoszenia</Typography>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Rodzaj ogłoszenia
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={choosenType}
            label="Rodzaj ogłoszenia"
            onChange={(e) => setChoosenType(e.target.value)}
          >
            <MenuItem value={"buy"}>Kupno / sprzedaż</MenuItem>
            <MenuItem value={"service"}>Usługa</MenuItem>
            <MenuItem value={"rent"}>Wypożyczenie</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ margin: 2, display: "flex", justifyContent: "center" }}>
          <Button onClick={startFormHandler} variant="contained">
            Rozpocznij
          </Button>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Typography variant="h6">Tworzenie nowego ogłoszenia</Typography>
        </Box>
        <Box sx={{ margin: 2, display: "flex", justifyContent: "center" }}>
          <Button onClick={changeFormTypeHandler} variant="outlined">
            Wybierz inny typ ogłoszenia
          </Button>
        </Box>
        <Box>
          {choosenType === "buy" && < BuyForm choosenType={choosenType} />}
          {choosenType === "rent" && < RentForm />}
          {choosenType === "service" && < ServiceForm />}
        </Box>
      </Container>
    );
  }
};
export default CreateOfferPage;
