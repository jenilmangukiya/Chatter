import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Auth";
import { useSnackbar } from "../../../components/SnackbarAlert";
import { useRegisterUser } from "../../../services";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { setSnackbarConfig } = useSnackbar();

  const { mutate: registerMutation } = useRegisterUser({
    onError: (error: any) => {
      setSnackbarConfig({
        open: true,
        message: error?.response?.data?.["message"] || "Registration Failed",
        severity: "error",
      });
    },
    onSuccess: (response) => {
      const user = response?.data?.data?.["user"];
      if (user) {
        setSnackbarConfig({
          open: true,
          message: "Registration SuccessFully",
          severity: "success",
        });
        navigate("/sign-in");
      } else {
        setIsAuthenticated(false);
        setSnackbarConfig({
          open: true,
          message: "Registration Failed",
          severity: "error",
        });
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const confirm_password = data.get("confirmPassword")?.toString();

    if (
      [fullName, email, password, confirm_password].some(
        (field) => !field?.trim()
      )
    ) {
      setSnackbarConfig({
        open: true,
        message: "All Fields are required",
        severity: "error",
      });
      return;
    }

    if (password !== confirm_password) {
      setSnackbarConfig({
        open: true,
        message: "Confirm Password does not match password",
        severity: "error",
      });
      return;
    }

    await registerMutation({
      fullName,
      email,
      password,
    });
  };

  return { handleSubmit };
};
