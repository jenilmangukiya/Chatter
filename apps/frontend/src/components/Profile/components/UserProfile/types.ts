import { ButtonProps } from "@mui/material";
import React from "react";

export interface ButtonConfigType {
  name: string;
  text: string;
  color: ButtonProps["color"];
  variant: ButtonProps["variant"];
  icon: React.JSX.Element;
}
