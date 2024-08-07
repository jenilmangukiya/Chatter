import { Add, Search } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useDebounce } from "../../../../utils/useDebounce";

export const ChatSearch = ({ handleOnSearch }: { handleOnSearch: any }) => {
  const setSearchDebounce = useDebounce((text: string) => {
    handleOnSearch(text);
  }, 700);

  return (
    <Stack
      p={3}
      bgcolor={"white"}
      borderRadius={"16px"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"100px"}
      gap={1}
    >
      <Typography variant="h6" fontWeight={600}>
        Chat
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        fullWidth
        onChange={(e) => setSearchDebounce(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("clicked");
          }
        }}
        InputProps={{
          endAdornment: (
            <Search sx={{ cursor: "pointer" }} onClick={() => {}} />
          ),
          sx: { borderRadius: 50, height: "46px" },
        }}
      />
      <IconButton
        aria-label="delete"
        size="large"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": { color: "primary.main" },
        }}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};
