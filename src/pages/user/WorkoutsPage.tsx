import Navbar from "@/components/common/Navbar";
import Workouts from "@/components/user/workouts/Workouts";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutsBodyList } from "@/api/user";
import Loader from "@/components/common/Loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNavPage } from "@/redux/slices/appSlice";

const WorkoutsPage = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavPage("workouts"));
  }, []);
  const { isLoading, data: workoutList } = useQuery({
    queryKey: ["workoutsBodyList"],
    queryFn: getWorkoutsBodyList,
  });

  

  return isLoading || !workoutList ? (
    <Loader />
  ): (
    <div className="bg-black text-gray-200">
      <Navbar {...{ fixed: true }} />
      <Workouts {...{ workoutList: workoutList?.data.workoutList }} />
    </div>
  );
};

export default WorkoutsPage;
