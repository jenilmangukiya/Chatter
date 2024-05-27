import { useNavigate } from "react-router-dom";
import { Profile } from "../../../components/Profile";

export const NotificationsProfile = () => {
  const navigate = useNavigate();
  const handleOnBackButtonClick = () => {
    navigate("/notifications");
  };
  return <Profile onBackButtonClick={handleOnBackButtonClick} />;
};
