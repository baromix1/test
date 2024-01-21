import moment from "moment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useTheme,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { BASE_API } from "../../constants/url";
import { useNavigate } from "react-router-dom";

const Post = ({ postData }) => {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    setCommentsList(postData.listaKomentarzy);
  }, []);

  const commentSubmitHandler = () => {
    let commentData = axios.toFormData({
        data: new Date(),
        idUzytkownika: parseInt(authCtx.userId),
        idPosta: parseInt(postData.id),
        tresc: comment.trim(),
    });
    setLoading(true)
    axios({
        method: "POST",
        url: `${BASE_API}/forum/add/post/komentarz`,
        data: commentData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
      .then((res) => {
          console.log(res);
          alert("Pomyslnie opublikowano komentarz");
      })
      .catch((err) => {
          console.log(err);
          alert("Wystąpił błąd, nie udało się opublikować komentarza");
      })
      .finally(() => {
        setLoading(false)
      });
    setComment("");
    setCommentsList(prev => {
      let newList = [...prev]
      newList.push({
        data: new Date(),
        username: authCtx.username,
        idUzytkownika: authCtx.userId,
        idPosta: postData.id,
        tresc: comment.trim(),
      })
      return newList;
    })
  };

  const deleteSubmitHandler = () => {
    setDeleteLoading(true)
    axios
      .delete(`${BASE_API}/forum/usun-post/${postData.id}`)
      .then((res) => {
        console.log(res);
        alert(`Pomyślnie usunięto post`)
      })
      .catch((err) => {
        console.log(err);
        alert("Nie udało się usunąć postu")
      })
      .finally(() => {
        setDeleteLoading(false);
        navigate("/forum")
      });
  };

  return (

    <Container>
      {postData.username === authCtx.username ? <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 2,
          }}
        >
        </Box>
        <Typography variant="h5" textAlign="center" margin={2} fontWeight="bold" >
          To twój post
        </Typography>
      </Box> : console.log("nope")}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              paddingTop: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              elevation: 3,
              fontWeight: "bold",
            }}
            variant="h4"
          >
            {postData.tytul.charAt(0).toUpperCase() + postData.tytul.slice(1)}
          </Typography>
          <Typography>
            {"Dodano: " +
              moment(postData.dataDodania)
                .locale("pl")
                .format("DD MMM YYYY, hh:mm")}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="primary"
        fontWeight="bold"
      >{`Opublikowany przez: ${postData.username}`}</Typography>
      <Typography>{postData.opis}</Typography>

      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          elevation: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Skomentuj post:
        </Typography>

        <TextField
          variant="outlined"
          value={comment}
          onChange={(e) => {
            return setComment(e.target.value);
          }}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!loading ? <Button
            disabled={!comment.trim()}
            startIcon={<AddCommentIcon />}
            onClick={commentSubmitHandler}
            variant="contained"
          >
            Dodaj komentarz
          </Button> : <CircularProgress size={64} />}

        </Box>
      </Box>

      <Box
        sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {commentsList.slice(0).reverse().map((el) => {
          return (
            <Card elevation={3}>
              <CardHeader
                fontWeight="bold"
                avatar={
                  <Avatar
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      width: 56,
                      height: 56,
                    }}
                    aria-label="recipe"
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "400",
                        color: theme.palette.background.default,
                      }}
                    >
                      {el.username.substring(0, 1).toUpperCase()}
                    </Typography>
                  </Avatar>
                }
                action={<IconButton aria-label="settings"></IconButton>}
                titleTypographyProps={{ fontWeight: "bold" }}
                subheaderTypographyProps={{ fontSize: 18 }}
                title={el.username + ", " + moment(el.data)
                  .locale("pl")
                  .format("DD MMM YYYY, hh:mm")}
                subheader={el.tresc}
              />
            </Card>
          );
        })}
      </Box>
      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          elevation: 3,
        }}
      >
        {postData.username === authCtx.username ? <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!deleteLoading ? (
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteDialogOpen}
              variant="contained"
            >
              Usuń post
            </Button>
          ) : (
            <CircularProgress size={64} />
          )}

          <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
            <DialogTitle>Czy na pewno chcesz usunąć ten post?</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="primary">
                Anuluj
              </Button>
              <Button onClick={deleteSubmitHandler} color="error">
                Usuń
              </Button>
            </DialogActions>
          </Dialog>


        </Box> : <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
        </Box>}</Box>
    </Container >
  );
};

export default Post;