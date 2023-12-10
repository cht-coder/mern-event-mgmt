import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const AddEventForm = () => {
  const { id } = useParams();
  const { register, handleSubmit, control, reset } = useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["combo-cust"],
    queryFn: () => axios.get("/api/customer/combo"),
    select: (res) => res.data?.data,
  });

  const { data: eventDetails } = useQuery({
    queryKey: ["events", id],
    queryFn: () => axios.get("/api/event/" + id),
    select: (res) => res.data?.data,
    enabled: !!id,
  });

  useEffect(() => {
    console.log(eventDetails);
    if (id && eventDetails)
      reset({ ...eventDetails, date: new Date().toJSON() });
  }, [id, eventDetails]);

  const createEvent = async (formData) => {
    try {
      const response = await axios.post("/api/event/create", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Create Event</Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register("title")}
        value={"afa"}
      />
      <TextField {...register("date")} type="date" fullWidth margin="normal" />
      <Controller
        name="cust"
        control={control}
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <Autocomplete
            value={value}
            options={data ?? []}
            renderInput={(params) => <TextField {...params} inputRef={ref} />}
            renderOption={(props, opt) => (
              <div {...props} key={opt.c_id}>
                {opt.mobileNo}
              </div>
            )}
            getOptionLabel={(opt) => `${opt.mobileNo}`}
            isOptionEqualToValue={(opt, val) => opt.c_id === val.c_id}
            onChange={(e, val) => {
              console.log(val);
              onChange(val);
            }}
            onBlur={onBlur}
          />
        )}
      />
      <FormGroup sx={{ my: 2 }} row>
        <FormControlLabel
          control={<Checkbox />}
          label="Hall"
          {...register("opts.hall")}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Dining"
          {...register("opts.dining")}
        />
      </FormGroup>
      <Button type="submit" variant="contained" disabled={mutation.isLoading}>
        Create
      </Button>
      {mutation.isError && (
        <Typography variant="body1" color="error">
          {mutation.error.message}
        </Typography>
      )}
    </form>
  );
};

export default AddEventForm;
