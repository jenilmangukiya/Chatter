import { Attachment, Send } from "@mui/icons-material";
import { IconButton, InputBase, Stack } from "@mui/material";
import { useSendChatActions } from "./useSendChatActions";
import { useStyle } from "./useStyle";

export const SendChatActions = ({
  chatMembers,
  setMessages,
  setLocalMessages,
}: {
  chatMembers: any;
  setMessages: any;
  setLocalMessages: any;
}) => {
  const { inputContainer, iconButton } = useStyle();
  const {
    message,
    setMessage,
    handleSendMessage,
    handleMessageOnchange,
    isPending,
  } = useSendChatActions({ chatMembers, setMessages, setLocalMessages });

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack direction={"row"} sx={inputContainer}>
        <Attachment />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Write messages..."
          inputProps={{
            "aria-label": "Write messages...",
          }}
          onKeyDown={handleMessageOnchange}
          onChange={(event) => setMessage(event?.target.value)}
          value={message}
        />
      </Stack>
      <IconButton
        aria-label="send"
        sx={iconButton}
        onClick={handleSendMessage}
        disabled={isPending}
      >
        <Send />
      </IconButton>
    </Stack>
  );
};
