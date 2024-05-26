import { useState } from "react";
import { useOutlet } from "react-router-dom";

export const useExplore = () => {
  const outlet = useOutlet();
  const [searchText, setSearchText] = useState("");

  const handleOnSearch = (text: string) => {
    setSearchText(text);
  };

  return { handleOnSearch, outlet, searchText };
};
