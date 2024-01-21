import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
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
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="h6" maxWidth={600} textAlign="center">
        Przepraszamy, wygląda na to, że podstrona do której się probujesz dostać
        nie istnieje.
      </Typography>
      <Button onClick={() => navigate("/")}>Wróć do strony głównej</Button>
    </Box>
  );
};

export default ErrorPage;
