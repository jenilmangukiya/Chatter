import styled from "@emotion/styled";
import { Skeleton, Stack, keyframes } from "@mui/material";

const bounceAnimation = keyframes`
  0% { transform: translateY(3px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(3px); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.2rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{
          animationDelay: "0.3s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={12}
        height={12}
        style={{
          animationDelay: "0.5s",
        }}
      />
    </Stack>
  );
};

export default TypingLoader;
