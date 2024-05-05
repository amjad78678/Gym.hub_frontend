const adminRoutes={

    getGymDetails:'/admin/get_gym_details',
    gymAdminResponse:'/admin/gym_admin_response',
    blockAdminAction: (id: string)=>`/admin/gym_block_action/${id}`,
    deleteGym:(id: string)=>`/admin/delete_gym/${id}`,
    adminLogin:'/admin/admin_login',
    adminLogout:'/admin/admin_logout',
    fetchUsers:'/admin/fetch_users',
    updateUser:(id: string)=>`/admin/update_user/${id}`

}

export default adminRoutes