import { Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminRegistrationForm = () => {
  const { register, handleSubmit } = useForm();

  const registerAdmin = async (formData) => {
    try {
      const response = await axios.post("/api/admin/register", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: registerAdmin,
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Admin Registration</Typography>
      <TextField
        {...register("email")}
        label="Email"
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
      <Button type="submit" variant="contained" disabled={isLoading}>
        Register
      </Button>
      {isError && (
        <Typography variant="body1" color="error">
          {error.message}
        </Typography>
      )}
    </form>
  );
};

export default AdminRegistrationForm;
