import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../constants/url";
import moment from "moment";
import EastIcon from "@mui/icons-material/East";

const ForumPage = () => {
  const navigate = useNavigate();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsList, setPostsList] = useState([]);

  useLayoutEffect(() => {
    setLoadingPosts(true);
    const commId = localStorage.getItem("commId");
    axios
      .post(`${BASE_API}/forum/all/${commId}`, {
        pageIndex: 1,
        pageSize: 100,
        type: "",
        sort: "",
        search: "",
      })
      .then((res) => {
        console.log(res);
        setPostsList(res.data.data);
      })
      .catch((err) => {
        console.log("Nie znaleziono osiedla");
        console.log(err);
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  }, []);

  const createOfferHandler = () => {
    navigate("/forum/create-post");
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 8 }}>
      {console.log("ForumPage rerender")}

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
            Utwórz nowy post
          </Button>
        </Box>
        <Typography variant="h6" textAlign="center" margin={2}>
          Aktualne posty
        </Typography>
      </Box>
      {loadingPosts && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={64} />
        </Box>
      )}
      {!loadingPosts && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {postsList.length > 0 ? (
            postsList.map((post) => (
              <Card key={post.id} elevation={10}>
                <CardHeader
                  titleTypographyProps={{
                    variant: "h5",
                    fontWeight: "bold",
                  }}
                  title={post.tytul}
                  subheaderTypographyProps={{
                    variant: "subtitle2",
                  }}
                  subheader={
                    "Dodano: " +
                    moment(post.dataDodania)
                      .locale("pl")
                      .format("DD MMM YYYY, hh:mm")
                  }
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                  >{`Opublikowany przez: ${post.username}`}</Typography>
                  <Typography variant="body2">
                    {post.opis.substring(0, 100)}
                    {post.opis.length > 100 && "..."}
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
                      onClick={() => navigate(`/forum/${post.id}`)}
                    >
                      Przejdź do postu
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

export default ForumPage;