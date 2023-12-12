import { DeleteIcon, PencilIcon } from "@icons/material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";

const EventList = () => {
  const { setAuth } = useAuthCtx();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get("/api/event/all");
      return response.data;
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => await axios.get("/api/auth/logout"),
    onSuccess() {
      setAuth();
      navigate("/login");
    },
  });

  const { mutateAsync: deleteEvent } = useMutation({
    mutationFn: (id) => axios.delete("/api/event?id=" + id),
    onSuccess() {
      queryClient.invalidateQueries(["events"]);
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Error fetching events
      </Typography>
    );
  }

  return (
    <div>
      <Toaster />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: "2rem",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Events
          </Typography>
        </Box>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Box>
            <Button href="./new">Add Event</Button>
          </Box>
          <Box>
            <Button href="/customer/new">Add Customer</Button>
          </Box>
          <Box>
            <Button onClick={logout} variant="contained" disableElevation>
              Logout
            </Button>
          </Box>
        </Stack>
      </Stack>
      <TableContainer sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-root": { fontWeight: 600 } }}>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(events ?? []).map(({ title, _id, cust, date, opts }) => (
              <TableRow key={_id}>
                <TableCell>{title}</TableCell>
                <TableCell>{dayjs(date).format("DD MMM YY")}</TableCell>
                <TableCell>{cust.mobileNo}</TableCell>
                <TableCell>
                  <Stack sx={{ gap: ".25rem", flexDirection: "row" }}>
                    {Object.keys(opts).map((el, i) => (
                      <Chip
                        key={i}
                        label={`${el}`.toUpperCase()}
                        color={opts[el] ? "success" : "default"}
                        sx={{ borderRadius: "3px" }}
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack sx={{ flexDirection: "row" }}>
                    <IconButton
                      sx={{ width: 50, height: 50, fontSize: "0.85rem" }}
                      onClick={() => navigate(`./${_id}/edit`)}
                    >
                      <PencilIcon />
                    </IconButton>
                    <IconButton
                      sx={{ width: 50, height: 50, fontSize: "0.85rem" }}
                      onClick={() => {
                        toast.promise(
                          deleteEvent(_id),
                          {
                            loading: "loading",
                            error: "error",
                            success: "success",
                          },
                          { position: "bottom-left" }
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventList;
