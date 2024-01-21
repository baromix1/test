import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ForumIcon from "@mui/icons-material/Forum";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupsIcon from "@mui/icons-material/Groups";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useNavigate } from "react-router-dom";

const HelloPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Container
        sx={{
          maxWidth: "xl",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            border: "solid",
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            display: "flex",
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              textAlign: "center",
              paddingTop: 24,
              paddingBottom: 24,
            },
          }}
        >
          <HandshakeIcon sx={{ width: 128, height: 128 }} />
          <Typography variant="h5">
            Witaj w naszej lokalnej społeczności osiedla
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", margin: 2, gap: 1 }}
        >
          <Button
            onClick={() => navigate("/auth")}
            sx={{
              fontSize: 20,
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            variant="outlined"
          >
            Zaloguj się
          </Button>
          <Button
            sx={{
              fontSize: 20,
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            variant="contained"
            onClick={() =>
              alert(
                "Aby założyć konto skontaktuj się z administratorem strony. NR-TEL: xxx-xxx-xxx"
              )
            }
          >
            Załóż konto
          </Button>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Container
          sx={{
            maxWidth: "md",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            Tutaj znajdziesz oferty wymiany narzędzi oraz oferty usłóg
            oferowanych przez twoich sąsiadów! Prowadź rozmowy, twórz grupy,
            komentuj oferty.
          </Typography>
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                gap: 4,
              },
              display: "flex",
              flexDirection: "row",
              gap: 12,
              marginTop: 8,
              marginBottom: 8,
              color: theme.palette.primary.main,
            }}
          >
            <ForumIcon
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: 64,
                  height: 64,
                },
                width: 128,
                height: 128,
              }}
            />
            <LocalMallIcon
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: 64,
                  height: 64,
                },
                width: 128,
                height: 128,
              }}
            />
            <GroupsIcon
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: 64,
                  height: 64,
                },
                width: 128,
                height: 128,
              }}
            />
            <ConstructionIcon
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: 64,
                  height: 64,
                },
                width: 128,
                height: 128,
              }}
            />
          </Box>
          <Typography variant="h4" fontWeight="bold">
            Dołącz do nas i buduj razem z nami naszą społeczność
          </Typography>
        </Container>
      </Box>
      <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
        <Container
          sx={{
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HandshakeIcon sx={{ width: 64, height: 64 }} />
              <Typography variant="h4">Commu-Tools</Typography>
            </Box>
            <Box
              sx={{
                border: "solid",
                borderWidth: 0,
                borderLeftWidth: 2,
                borderColor: theme.palette.divider,
                paddingLeft: 2,
                paddingRight: 2,
                marginLeft: 4,
                marginRight: 4,
                inset: 0,
              }}
            >
              <Typography>Jan Samiec</Typography>
              <Typography>Łukasz Jarząb</Typography>
              <Typography>Bartosz Ziarnik</Typography>
              <Typography>Adam Kruczkowski</Typography>
              <Typography>Szymon Cieślar</Typography>
              <Typography>Jakub Kos</Typography>
              <Typography>Łukasz Piórecki</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                marginTop: 4,
              },
            }}
          >
            <Typography variant="subtitle1">Commu-Tools, 2024</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HelloPage;
