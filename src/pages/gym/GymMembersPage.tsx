import GymNavbar from '@/components/gym/common/GymNavbar'
import GymMemberships from '@/components/gym/gymMembers/GymMemberships'
import React from 'react'

const GymMembersPage = () => {
  return (
    <>
    <GymNavbar {...{fixed: false}}/>
  <GymMemberships/>
  </>
  )
}

export default GymMembersPage