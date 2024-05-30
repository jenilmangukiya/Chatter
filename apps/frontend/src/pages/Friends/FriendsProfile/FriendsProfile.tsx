import { useNavigate } from "react-router-dom";
import { Profile } from "../../../components/Profile";

export const FriendsProfile = () => {
  const navigate = useNavigate();
  const handleOnBackButtonClick = () => {
    navigate("/friends");
  };
  return <Profile onBackButtonClick={handleOnBackButtonClick} />;
};
