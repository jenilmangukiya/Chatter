import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const CreateGroupDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Create Group </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Stack width={"500px"} gap={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Group name"
              placeholder="Enter group name"
            />
            <Autocomplete
              multiple
              id="tags-standard"
              options={[{ title: "this is huge" }]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select group members"
                  placeholder="Favorites"
                />
              )}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{ borderRadius: 16 }}
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};
