import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import AuthContext from "../store/auth-context";
import { BASE_API } from "../constants/url";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const authCtx = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const resetHandler = () => {
        setTitle("");
        setDescription("");
        setLoading("");
    };

    const postSubmitHandler = () => {
        let formData = axios.toFormData({
            IdAutora: parseInt(authCtx.userId),
            Tytul: title,
            Opis: description,
            DataDodania: new Date(),
            IdOsiedla: parseInt(authCtx.commId)
        });

        setLoading(true);
        axios({
            method: "POST",
            url: `${BASE_API}/forum/add/post`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res);
                alert("Pomyslnie opublikowano post");
            })
            .catch((err) => {
                console.log(err);
                alert("Wystąpił błąd, nie udało się opublikować postu");
            })
            .finally(() => {
                setLoading(false);
                navigate("/forum")
            });
    };

    return (
        <Container>
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
                    {`Opublikuj post dla osiedla: ${capitalizeFirstLetter(
                        authCtx.commName
                    )}`}
                </Typography>
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
                <Typography variant="h7"></Typography>
                <TextField
                    variant="outlined"
                    id="outlined-multiline-flexible"
                    label="Tytuł *"
                    multiline
                    value={title}
                    onChange={(e) => {
                        return setTitle(e.target.value);
                    }}
                ></TextField>
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
                <Typography variant="h7"></Typography>
                <TextField
                    variant="outlined"
                    id="outlined-multiline-flexible"
                    label="Opis *"
                    multiline
                    value={description}
                    onChange={(e) => {
                        return setDescription(e.target.value);
                    }}
                ></TextField>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: 4,
                }}
            >
                <Button
                    variant="contained"
                    onClick={resetHandler}
                    startIcon={<ClearIcon />}
                >
                    Wyczyść
                </Button>
                {!loading ? (
                    <Button
                        disabled={
                            !title.trim() ||
                            !description.trim()
                        }
                        startIcon={<AddIcon />}
                        onClick={postSubmitHandler}
                        variant="contained"
                    >
                        Opublikuj post
                    </Button>
                ) : (
                    <CircularProgress size={64} />
                )}
            </Box>
        </Container>
    );
};
export default CreatePostPage;