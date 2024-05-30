import GymNavbar from '@/components/gym/common/GymNavbar';
import GymSubscription from '@/components/gym/gymSubscription/GymSubscription';


const GymSubscriptionPage = () => {


  return (
     <>
           <GymNavbar {...{fixed: false}} />
           <GymSubscription/>
       
    
     </>
  );
 };
 

export default GymSubscriptionPage