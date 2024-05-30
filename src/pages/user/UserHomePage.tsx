import Navbar from "@/components/common/Navbar";
import UserHome from "@/components/user/home/UserHome";

const UserHomePage = () => {

  return (
    <div className="text-white">
        <Navbar {...{fixed: true}}/>
        <UserHome />
    </div>
  );
};

export default UserHomePage;
