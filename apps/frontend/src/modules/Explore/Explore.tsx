import { Stack } from "@mui/material";

import {
  ExplorePlaceholder,
  ExploreSearch,
  ExploreUserList,
} from "./components";
import { useExplore } from "./useExplore";

export const Explore = () => {
  const { handleOnSearch, outlet, searchText } = useExplore();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack sx={{ width: { md: "45%", lg: "34%" } }} gap={1}>
        <ExploreSearch handleOnSearch={handleOnSearch} />
        <ExploreUserList searchText={searchText} />
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet || <ExplorePlaceholder />}
      </Stack>
    </Stack>
  );
};
