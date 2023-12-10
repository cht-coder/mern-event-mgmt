import { Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const CustomerLoginForm = () => {
  const { register, handleSubmit } = useForm();

  const loginCustomer = async (formData) => {
    try {
      const response = await axios.post("/api/customer/login", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const mutation = useMutation({ mutationFn: loginCustomer });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Customer Login</Typography>
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
        Login
      </Button>
      {mutation.isError && (
        <Typography variant="body1" color="error">
          {mutation.error.message}
        </Typography>
      )}
    </form>
  );
};

export default CustomerLoginForm;
