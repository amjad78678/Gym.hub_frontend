import Navbar from "@/components/common/Navbar";
import UserHome from "@/components/user/home/UserHome";

const UserHomePage = () => {
  const fixed = true
  return (
    <div className="text-white">
      <Navbar {...{fixed}} />
      <UserHome />
    </div>
  );
};

export default UserHomePage;
