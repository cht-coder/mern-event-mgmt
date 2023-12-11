import { Stack, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AddEventForm from "./components/AddEvent";
import AdminLoginForm from "./components/AdminLoginForm";
import AdminRegistrationForm from "./components/AdminRegistration";
import CustomerLoginForm from "./components/CustomerLoginForm";
import CustomerRegistrationForm from "./components/CustomerRegistration";
import EventList from "./components/EventList";
import AuthCtxProvider, { useAuthCtx } from "./contexts/AuthContext";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthCtxProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthCtxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const AppRoutes = () => {
  const { isLoading, setAuth, setIsLoading, auth } = useAuthCtx();

  useEffect(() => {
    axios
      .get("/api/auth", { withCredentials: true })
      .then((data) => {
        setAuth(data);
        // navigate("/events");
      })
      .catch((err) => {
        // navigate("/login");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <>Loading</>;

  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          <Navigate to={auth && !isLoading ? "/events" : "/login"} replace />
        }
      />
      <Route path="/login" element={<NonAuthRoute />}>
        <Route
          index
          element={
            <>
              <Stack
                sx={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                <Link to="./admin">Admin Login</Link>
                <Link to="./customer">Customer Login</Link>
              </Stack>
            </>
          }
        />
        <Route path="admin" element={<AdminLoginForm />} />
        <Route path="customer" element={<CustomerLoginForm />} />
      </Route>
      <Route path="/register" element={<NonAuthRoute />}>
        <Route
          index
          element={
            <>
              <Stack
                sx={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                <Link to="./admin">Admin Login</Link>
                <Link to="./customer">Customer Login</Link>
              </Stack>
            </>
          }
        />
        <Route path="admin" element={<AdminRegistrationForm />} />
        <Route path="customer" element={<CustomerRegistrationForm />} />
      </Route>
      <Route path="/events" element={<ProtectedRoute />}>
        <Route index element={<EventList />} />
        <Route path="new" element={<AddEventForm />} />
        <Route path=":id/edit" element={<AddEventForm />} />
      </Route>
      <Route path="/customer" element={<ProtectedRoute />}>
        {/* <Route index element={<EventList />} /> */}
        <Route path="new" element={<CustomerRegistrationForm />} />
      </Route>
    </Routes>
  );
};

const ProtectedRoute = () => {
  const { auth, isLoading } = useAuthCtx();

  if (!auth && !isLoading) return <Navigate to="/login" />;
  return <Outlet />;
};
const NonAuthRoute = () => {
  const { auth, isLoading } = useAuthCtx();

  if (auth && !isLoading) return <Navigate to="/events" replace />;
  return <Outlet />;
};

export default App;
