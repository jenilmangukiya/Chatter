import { Search } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const ExploreSearch = () => {
  const [searchText, setSearchText] = useState("");
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
        Explore
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
    </Stack>
  );
};
