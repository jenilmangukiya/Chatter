import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../components";
import { useSignUp } from "./useSignUp";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { handleSubmit } = useSignUp();

  return (
    <>
      <Header />
      <Divider />
      <Stack mx={"auto"} width={"400px"} mt={6} gap={2}>
        <Typography variant="h3" fontWeight={500}>
          Register
        </Typography>
        <Typography variant="body1">Hi, Welcome to Chatter 👋</Typography>
        <form onSubmit={handleSubmit}>
          <Stack gap={2} mt={1}>
            <Stack gap={1}>
              <InputLabel>Full name</InputLabel>
              <TextField
                type="text"
                name="fullName"
                variant="outlined"
                placeholder="E.g john Doe"
                autoComplete="off"
              />
            </Stack>
            <Stack gap={1}>
              <InputLabel>Email</InputLabel>
              <TextField
                type="email"
                name="email"
                variant="outlined"
                placeholder="E.g johndoe@email.com"
                autoComplete="off"
              />
            </Stack>

            <Stack gap={1}>
              <InputLabel>Password</InputLabel>
              <FormControl variant="outlined" size="small">
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>

            <Stack gap={1}>
              <InputLabel>Confirm Password</InputLabel>
              <FormControl variant="outlined" size="small">
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Confirm password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>

            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="I agree to the term and conditions"
                slotProps={{ typography: { variant: "body2" } }}
              />
            </Stack>

            <Button variant="contained" size="large" type="submit">
              Register
            </Button>

            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <Typography variant="body2">Already have an account?</Typography>
              <Typography variant="body2">
                <Link to={"/sign-in"}>Sign-in?</Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </>
  );
};
