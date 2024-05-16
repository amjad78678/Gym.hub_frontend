const adminRoutes={

    getGymDetails:'/get_gym_details',
    gymAdminResponse:'/gym_admin_response',
    blockAdminAction: (id: string)=>`/gym_block_action/${id}`,
    deleteGym:(id: string)=>`/delete_gym/${id}`,
    adminLogin:'admin_login',
    adminLogout:'/admin_logout',
    fetchUsers:'/fetch_users',
    updateUser:(id: string)=>`/update_user/${id}`,
    fetchSubscriptions:'/fetch_subscriptions',
    fetchGymWithId:(id: string)=>`/fetch_gym_with_id/${id}`

}

export default adminRoutes