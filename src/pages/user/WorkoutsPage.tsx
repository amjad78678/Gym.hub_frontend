import Navbar from '@/components/common/Navbar'
import Workouts from '@/components/user/workouts/Workouts'
import { useQuery } from '@tanstack/react-query';
import { getWorkoutsBodyList } from '@/api/user';

const WorkoutsPage = () => {

  const {isLoading,data: workoutList} = useQuery({
    queryKey: ["workoutsBodyList"],
    queryFn: getWorkoutsBodyList,
  })

  console.log('workoutList',workoutList)
   
  return !isLoading && workoutList && (
    <div className='bg-black text-gray-200'>
      <Navbar/>
      <Workouts {...{workoutList: workoutList?.data.workoutList}}/>
    </div>
  )
}

export default WorkoutsPage