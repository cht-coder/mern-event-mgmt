import { DeleteIcon, PencilIcon } from "@icons/material";
import {
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
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EventList = () => {
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
      <Typography variant="h4">Events</Typography>
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
              <TableCell>{date}</TableCell>
              <TableCell>{cust.mobileNo}</TableCell>
              <TableCell>
                {/* {Object.keys(opts).map((el, i) =>
                  opts[el] ? (
                    <CheckCircleIcon key={i} />
                  ) : (
                    <CheckCircleOutlineIcon key={i} />
                  )
                )} */}
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
