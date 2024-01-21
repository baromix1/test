import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const AddUserForm = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography>Dodawanie użytkownika do wspólnoty</Typography>
        <IconButton onClick={() => navigate("/admin")}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField label="Nazwa użytkownika" variant="outlined" />
      </Box>
    </Paper>
  );
};

export default AddUserForm;
