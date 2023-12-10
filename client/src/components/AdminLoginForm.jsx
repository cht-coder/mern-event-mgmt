import { Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthCtx } from "../contexts/AuthContext";

const AdminLoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { setAuth } = useAuthCtx();
  const navigate = useNavigate();

  const loginAdmin = async (formData) => {
    try {
      const response = await axios.post("/api/admin/login", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/events");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Admin Login</Typography>
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
        Login
      </Button>
      {isError && (
        <Typography variant="body1" color="error">
          {error.message}
        </Typography>
      )}
    </form>
  );
};

export default AdminLoginForm;
