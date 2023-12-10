import { Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const CustomerRegistrationForm = () => {
  const { register, handleSubmit } = useForm();

  const registerCustomer = async (formData) => {
    try {
      const response = await axios.post("/api/customer/register", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const mutation = useMutation({ mutationFn: registerCustomer });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Customer Registration</Typography>
      <TextField
        {...register("mobileNo")}
        label="Mobile Number"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("password")}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={mutation.isLoading}>
        Register
      </Button>
      {mutation.isError && (
        <Typography variant="body1" color="error">
          {mutation.error.message}
        </Typography>
      )}
    </form>
  );
};

export default CustomerRegistrationForm;
