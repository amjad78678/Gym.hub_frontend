import { fetchTrainers } from '@/api/admin'
import AdminTrainers from '@/components/admin/adminTrainers/AdminTrainers'
import Loader from '@/components/common/Loader'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const AdminTrainerPlans = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
      const {
        isLoading,
        data: trainersData,
        refetch,
      } = useQuery({
        queryKey: ["AdminTrainersData"],
        queryFn: fetchTrainers,
      });
  return (isLoading || !trainersData)? <Loader /> : (
    <div>
      <AdminTrainers {...{trainersData, refetch }}/>
    </div>
  )
}

export default AdminTrainerPlans