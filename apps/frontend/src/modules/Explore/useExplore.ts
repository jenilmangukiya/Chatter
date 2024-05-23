import { useState } from "react";
import { useOutlet } from "react-router-dom";
import { useGetUsers } from "../../services";

export const useExplore = () => {
  const outlet = useOutlet();
  const [searchText, setSearchText] = useState("");

  const handleOnSearch = (text: string) => {
    setSearchText(text);
  };

  const { data, isLoading } = useGetUsers({ searchText: searchText });

  return { handleOnSearch, data, isLoading, outlet };
};
