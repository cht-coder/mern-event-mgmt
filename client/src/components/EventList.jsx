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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Events</Typography>
        </Box>
        <Box>
          <Button href="./new">Add Event</Button>
          <Button href="/customer/new">Add Customer</Button>
          <Button onClick={logout} variant="contained" disableElevation>
            Logout
          </Button>
        </Box>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
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
                <IconButton onClick={() => navigate(`./${_id}/edit`)}>
                  <PencilIcon />
                </IconButton>
                <IconButton
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventList;
