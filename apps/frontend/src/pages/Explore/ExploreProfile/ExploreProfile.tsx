import { useNavigate } from "react-router-dom";
import { Profile } from "../../../components/Profile";

export const ExploreProfile = () => {
  const navigate = useNavigate();
  const handleOnBackButtonClick = () => {
    navigate("/explore");
  };
  return <Profile onBackButtonClick={handleOnBackButtonClick} />;
};
