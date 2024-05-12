import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box p={2}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Stack ml={4} direction={"row"} gap={2} alignItems={"center"}>
          <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: "36px" }} />
          <Typography variant="h5" fontWeight={700} color={"text.primary"}>
            Chatter.
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};
