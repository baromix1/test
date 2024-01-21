import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Typography variant="h3">Brak dostępu!</Typography>
      <Typography variant="h6" maxWidth={600} textAlign="center">
        Wygląda na to, że próbujesz się dostać na podstronę do której nie masz
        dostępu!
      </Typography>
      <Button onClick={() => navigate("/auth")}>Zaloguj się</Button>
    </Box>
  );
};

export default ProtectedPage;
