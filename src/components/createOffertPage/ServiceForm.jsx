import { Box, Container, TextField, Typography, Button, CircularProgress } from "@mui/material"
import { useState, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { BASE_API } from "../../constants/url";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {

    const MAX_FILE_SIZE_MB = 5;
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const authCtx = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const isPriceValid = !isNaN(parseFloat(price)) && isFinite(price);
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    const resetHandler = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setLoading("");
        setSelectedFile("");
        setUploadedImage(null);
    };

    const clearPhoto = () => {
        setSelectedFile("");
        setUploadedImage(null);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError("Nieprawidłowy typ pliku. Prześlij obraz w formacie JPEG, PNG lub GIF.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(
                `Rozmiar pliku przekracza ${MAX_FILE_SIZE_MB} MB. Wybierz mniejszy plik.`
            );
            return;
        }

        setSelectedFile(file);
        setError(null);
        const temporaryImageUrl = URL.createObjectURL(file);
        setUploadedImage(temporaryImageUrl);
    };

    const [uploadedImage, setUploadedImage] = useState(null);

    const offertSubmitHandler = () => {
        const emptyBlob = new Blob();
        let formData = axios.toFormData({});
        if (selectedFile) {
            formData = axios.toFormData({
                Typ: "usluga",
                IdUzytkownika: parseInt(authCtx.userId),
                imageFile: selectedFile,
                Tytul: title,
                Opis: description,
                IdOsiedla: parseInt(authCtx.commId),
                DataDodaniaOferty: new Date(),
                DataOdKiedy: new Date(startDate),
                DataDoKiedy: new Date(finishDate),
                Cena: parseFloat(price),
                CzyZakonczona: "false",
            });
            formData.append("imageFile", selectedFile);
            console.log("Uploading file...", formData);
        } else {
            formData = axios.toFormData({
                Typ: "usluga",
                IdUzytkownika: parseInt(authCtx.userId),
                imageFile: emptyBlob,
                Tytul: title,
                Opis: description,
                IdOsiedla: parseInt(authCtx.commId),
                DataDodaniaOferty: new Date(),
                DataOdKiedy: new Date(startDate),
                DataDoKiedy: new Date(finishDate),
                Cena: parseFloat(price),
                CzyZakonczona: "false",
            });
            console.error("Nie wybrano pliku");
        }

        setLoading(true);
        axios({
            method: "POST",
            url: `${BASE_API}/oferty/add/oferta`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res);
                alert("Pomyslnie dodano ofertę");
            })
            .catch((err) => {
                console.log(err);
                alert("Wystąpił błąd, nie udało się dodać oferty");
            })
            .finally(() => {
                setLoading(false);
                navigate("/wall")
            });
    };

    return (
        <Container>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    {`Formularz dodawania oferty usługi  `}

                </Typography>
            </Box>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h7">
                </Typography>
                <TextField variant="outlined"
                    id="outlined-multiline-flexible"
                    label="Tytuł *"
                    multiline
                    value={title}
                    onChange={(e) => {
                        return setTitle(e.target.value);
                    }}
                >
                </TextField>

            </Box>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h7">
                </Typography>
                <TextField variant="outlined"
                    id="outlined-multiline-flexible"
                    label="Opis *"
                    multiline
                    value={description}
                    onChange={(e) => {
                        return setDescription(e.target.value);
                    }}
                >
                </TextField>

            </Box>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h7">
                </Typography>
                <TextField variant="outlined"
                    id="outlined-multiline-flexible"
                    label="Cena *"
                    multiline
                    value={price}
                    onChange={(e) => {
                        return setPrice(e.target.value);
                    }}
                >
                </TextField>
            </Box>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h7">
                </Typography>
                <TextField variant="outlined"
                    id="outlined-textarea"
                    label="Data rozpoczęcia usługi *"
                    placeholder="yyyy-mm-dd"
                    multiline
                    value={startDate}
                    onChange={(e) => {
                        return setStartDate(e.target.value);
                    }}
                >
                </TextField>

            </Box>
            <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2, elevation: 3 }}>
                <Typography variant="h7">
                </Typography>
                <TextField variant="outlined"
                    id="outlined-textarea"
                    label="Data zakończenia usługi *"
                    placeholder="yyyy-mm-dd"
                    multiline
                    value={finishDate}
                    onChange={(e) => {
                        return setFinishDate(e.target.value);
                    }}
                >
                </TextField>

            </Box>
            <Box sx={{ paddingTop: 2, elevation: 3, flexDirection: "column" }}>
                <Box sx={{ p: 5 }} border="2px dashed #ccc" borderRadius={5} textAlign="center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="image-file-input"
                    />
                    <label htmlFor="image-file-input">
                        <Button variant="outlined" component="span" startIcon={<AddPhotoAlternateIcon />}>
                            Dodaj zdjęcie
                        </Button>
                    </label>
                    {selectedFile && (
                        <div>
                            <Typography variant="subtitle1" mt={2}>
                                Wybrane zdjęcie: {selectedFile.name}
                            </Typography>
                        </div>
                    )}
                    {uploadedImage && (
                        <div>
                            <div>
                                <Typography variant="subtitle1" mt={2}>
                                    Wysłane zdjęcie:
                                </Typography>
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded"
                                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                                />

                            </div>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={clearPhoto}
                                startIcon={<ClearIcon />}
                            >
                                Usuń zdjęcie
                            </Button>
                        </div>
                    )}
                    {error && (
                        <Typography variant="body2" color="error" mt={2}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: 4,
                }}
            >
                <Button variant="contained" onClick={resetHandler} startIcon={<ClearIcon />}>
                    Wyczyść
                </Button>
                {!loading ? <Button
                    disabled={!title.trim() || !description.trim() || !isPriceValid}
                    startIcon={<AddIcon />}
                    onClick={offertSubmitHandler}
                    variant="contained"
                >
                    Dodaj ogłoszenie
                </Button> : <CircularProgress size={64} />}


            </Box>


        </Container >
    )
}

export default ServiceForm