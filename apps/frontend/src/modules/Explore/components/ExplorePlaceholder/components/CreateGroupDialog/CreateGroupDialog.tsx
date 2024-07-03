import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useCreateGroupDialog } from "./useCreateGroupDialog";

export const CreateGroupDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    users,
    isUsersLoading,
    searchText,
    setSearchText,
    selectedUsers,
    setSelectedUsers,
    groupName,
    setGroupName,
    handleCreateGroupSubmit,
  } = useCreateGroupDialog();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Create Group </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
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
        <Stack width={"500px"} gap={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Group name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <Autocomplete
            multiple
            loading={isUsersLoading}
            options={users?.docs || []}
            getOptionLabel={(option: any) => option.fullName}
            onInputChange={(_, value) => setSearchText(value)}
            filterOptions={(x) => x}
            filterSelectedOptions
            value={selectedUsers}
            getOptionKey={(data) => {
              return data._id;
            }}
            isOptionEqualToValue={(option, value) => {
              return option._id === value._id;
            }}
            selectOnFocus
            inputValue={searchText}
            onChange={(_, value) => setSelectedUsers(value)}
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
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={handleCreateGroupSubmit}
          variant="contained"
          sx={{ borderRadius: 16 }}
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};
