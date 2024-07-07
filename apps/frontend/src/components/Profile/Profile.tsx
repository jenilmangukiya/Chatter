import { ArrowBack } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import { GroupProfile, UserProfile } from "./components";
import { useProfile } from "./useProfile";

export const Profile = ({ onBackButtonClick }: { onBackButtonClick?: any }) => {
  const navigate = useNavigate();
  const { isChatDataLoading, isGroupChat } = useProfile();

  return (
    <>
      <Stack p={3} bgcolor={"white"} borderRadius={"16px"} height={"100px"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => {
              !onBackButtonClick && navigate(-1);
              onBackButtonClick && onBackButtonClick();
            }}
          >
            back
          </Button>
        </Stack>
      </Stack>
      {isChatDataLoading && <PageLoader />}
      {!isChatDataLoading && !isGroupChat && <UserProfile />}
      {!isChatDataLoading && isGroupChat && <GroupProfile />}
    </>
  );
};
