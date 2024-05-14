import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth/useAuth";
import { useSnackbar } from "../../../components/SnackbarAlert";
import { useLoginUser } from "../../../services";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser, isAuthenticated } = useAuth();
  console.log("inn", isAuthenticated);
  const { setSnackbarConfig } = useSnackbar();

  const { mutate: loginMutation } = useLoginUser({
    onError: (e) => {
      console.log("1", e);
      setSnackbarConfig({
        open: true,
        message: "LoggedIn Failed",
        severity: "error",
      });
      setIsAuthenticated(false);
    },
    onSuccess: (response) => {
      const user = response?.data?.data.user;
      if (user) {
        setIsAuthenticated(true);
        setUser({
          email: user.email,
          fullName: user.fullName,
          userId: user._id,
          username: user.username,
        });
        setSnackbarConfig({
          open: true,
          message: "LoggedIn SuccessFully",
          severity: "success",
        });
        navigate("/chat");
      } else {
        setIsAuthenticated(false);
        setSnackbarConfig({
          open: true,
          message: "LoggedIn Failed",
          severity: "error",
        });
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    loginMutation({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return { handleSubmit };
};
