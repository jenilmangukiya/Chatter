import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { NavLink, useOutlet } from "react-router-dom";
import { ExplorePlaceholder, ExploreSearch } from "./components";
import { chatsMain } from "./data";
import { useStyle } from "./useStyle";

export const Explore = () => {
  const { chatListContainer } = useStyle();
  const outlet = useOutlet();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack sx={{ width: { md: "45%", lg: "34%" } }} gap={1}>
        <ExploreSearch />
        <Stack sx={chatListContainer}>
          {chatsMain.map((item) => {
            return (
              <div key={item.id}>
                <NavLink
                  to={`/explore/${item.id}/profile`}
                  style={{ textDecoration: "none" }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      cursor: "pointer",
                      p: 5,
                      px: 4,
                      alignItems: "center",
                      gap: 2,
                      height: 60,
                    }}
                  >
                    <Avatar
                      sx={{ bgcolor: red[500], width: 46, height: 46 }}
                      aria-label="recipe"
                      sizes="large"
                    >
                      {"J"}
                    </Avatar>

                    <Stack width={"100%"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Stack>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            color={"text.primary"}
                          >
                            {"user name"}
                          </Typography>
                          <Typography variant="body2" color={"text.secondary"}>
                            {"last message"}
                          </Typography>
                        </Stack>

                        <Stack direction={"row"} gap={2}>
                          <Button
                            variant="outlined"
                            color="warning"
                            sx={{ borderRadius: 16 }}
                          >
                            View
                          </Button>
                          <Button variant="contained" sx={{ borderRadius: 16 }}>
                            Send Request
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Divider />
                </NavLink>
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
