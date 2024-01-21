import {
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../constants/url";
import Post from "../components/postPage/Post";

const PostPage = () => {
  const params = useParams();
  const [postData, setPostData] = useState();
  const [loadingPost, setLoadingPost] = useState(false);

  useLayoutEffect(() => {
    setLoadingPost(true);

    axios
      .get(`${BASE_API}/forum/${params.postId}`)
      .then((res) => setPostData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingPost(false));
  }, [setPostData, params]);

  if (loadingPost) {
    return (
      <Container
        sx={{
        marginTop: 2,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <CircularProgress size={64} />
      </Container>
    );
  }

  if (!postData) {
    return (
      <Container
        sx={{
        marginTop: 2,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <Typography>
          Oops, coś poszło nie tak. Wróć na poprzednią stronę!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 2, marginBotton: 8 }}>
      <Post postData={postData} />
    </Container>
  );
};

export default PostPage;
