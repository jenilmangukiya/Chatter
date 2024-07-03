import { Avatar, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export const UserProfile = ({ userDetails }: { userDetails: any }) => {
  return (
    <>
      <Stack
        p={3}
        py={10}
        bgcolor={"white"}
        borderRadius={"16px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} justifyContent={"space-between"} gap={3}>
          <Avatar
            sx={{ bgcolor: red[500], width: 200, height: 200, mx: "auto" }}
            aria-label="recipe"
            sizes="large"
            src={userDetails?.avatar}
          >
            <Typography variant="h1">{userDetails?.fullName[0]}</Typography>
          </Avatar>
          <Stack gap={1}>
            <Typography variant="h4" fontWeight={600}>
              {userDetails?.fullName}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              <b>Email: </b>
              {userDetails.email}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              <b>Joined At:</b> 01/02/3002
            </Typography>

            <Typography variant="body1">
              <b>Bio data: </b>Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Explicabo veritatis in quae dolorem quas iure
              perferendis repellendus sed accusamus iste quo iusto, nostrum
              adipisci deserunt!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
