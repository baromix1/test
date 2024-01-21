import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_API } from "../../constants/url";
import axios from "axios";

const AllCommunitiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [commList, setCommList] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE_API}/wspolnoty`)
      .then((res) => {
        setCommList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
      <Box>
        <Typography sx={{ marginBottom: 2 }}>
          Lista wszystkich wspólnot
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Divider />

          {!loading ? (
            commList.map((comm) => (
              <Box key={comm.id}>
                <Box
                  sx={{
                    paddingLeft: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight={"bold"}>{comm.nazwa}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption">{`miasto: ${comm.miasto}, ID: ${comm.id}`}</Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))
          ) : (
            <CircularProgress size={64} />
          )}
          <Typography
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >{`Liczba wspólnot: ${commList.length}`}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AllCommunitiesForm;
