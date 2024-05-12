import { Attachment, Send } from "@mui/icons-material";
import { IconButton, InputBase, Stack } from "@mui/material";
import { useStyle } from "./useStyle";

export const SendChatActions = () => {
  const { inputContainer, iconButton } = useStyle();
  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack direction={"row"} sx={inputContainer}>
        <Attachment />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Write messages..."
          inputProps={{ "aria-label": "Write messages..." }}
        />
      </Stack>
      <IconButton aria-label="delete" sx={iconButton}>
        <Send />
      </IconButton>
    </Stack>
  );
};
