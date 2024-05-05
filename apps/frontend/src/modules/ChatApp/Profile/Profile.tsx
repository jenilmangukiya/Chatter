import { ArrowBack } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate(-1)}
          >
            back
          </Button>
        </Stack>
      </Stack>
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
          >
            <Typography variant="h1">J</Typography>
          </Avatar>
          <Stack gap={1}>
            <Typography variant="h4" fontWeight={600}>
              Jenil Mangukiya
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              <b>Email: </b>jenilmangukiya2002@gmail.com
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
