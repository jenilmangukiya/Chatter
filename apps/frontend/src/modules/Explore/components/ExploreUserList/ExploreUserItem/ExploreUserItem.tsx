import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useStyle } from "./useStyle";

export const ExploreUserItem = ({ item }: { item: any }) => {
  const { exploreItem } = useStyle();

  return (
    <div key={item._id}>
      <NavLink
        to={`/explore/${item._id}/profile`}
        style={{ textDecoration: "none" }}
      >
        {({ isActive }) => (
          <Stack
            direction={"row"}
            sx={{
              ...exploreItem,
              background: isActive ? "#e9e9e9" : "",
            }}
          >
            <Box border={"2px"}>
              <Avatar
                sx={{ bgcolor: "gray", width: 46, height: 46 }}
                aria-label="recipe"
                sizes="large"
                src={item.avatar}
              >
                {item.fullName[0].toUpperCase()}
              </Avatar>
            </Box>

            <Stack width={"100%"}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Stack width={"50%"}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={"text.primary"}
                    textTransform={"capitalize"}
                  >
                    {item.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {item.email}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </NavLink>
      <Divider />
    </div>
  );
};
