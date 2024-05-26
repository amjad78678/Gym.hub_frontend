import { fetchTrainers } from '@/api/admin'
import AdminTrainers from '@/components/admin/adminTrainers/AdminTrainers'
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
  return !isLoading && (
    <div>
      <AdminTrainers {...{trainersData, refetch }}/>
    </div>
  )
}

export default AdminTrainerPlans