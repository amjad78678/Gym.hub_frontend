interface iEditProfile {
    username: string;
    email: string;
    mobileNumber: string; 
    profilePic?: any;
    oldPassword: string;   
    newPassword: string;
    confirmPassword: string;
}   
export default iEditProfile