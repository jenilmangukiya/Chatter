import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import PageLoader from "../../components/PageLoader";
import { ExplorePlaceholder, ExploreSearch } from "./components";
import { useExplore } from "./useExplore";
import { useStyle } from "./useStyle";

export const Explore = () => {
  const { chatListContainer, exploreItem, actionButton } = useStyle();
  const { data, handleOnSearch, isLoading, outlet } = useExplore();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack sx={{ width: { md: "45%", lg: "34%" } }} gap={1}>
        <ExploreSearch handleOnSearch={handleOnSearch} />
        <Stack sx={chatListContainer}>
          {isLoading && <PageLoader />}
          {data &&
            data?.docs.map((item: any) => {
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
                            {"J"}
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

                            <Stack direction={"row"} gap={2}>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={actionButton}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                Send Request
                              </Button>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    )}
                  </NavLink>
                  <Divider />
                </div>
              );
            })}
        </Stack>
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet || <ExplorePlaceholder />}
      </Stack>
    </Stack>
  );
};
