import { CircularProgress, Stack } from "@mui/material";

const PageLoader = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <CircularProgress />
    </Stack>
  );
};

export default PageLoader;
