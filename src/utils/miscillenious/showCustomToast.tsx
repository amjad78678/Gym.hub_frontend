import CustomMessageToast from "@/components/common/CustomMessageToast";
import toast from "react-hot-toast";

export const showCustomToast = (
  message: string,
  name: string,
  profilePic: string
) => {
  toast.custom(
    (t) => (
      <CustomMessageToast
        t={t}
        message={message}
        name={name}
        profilePic={profilePic}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: 20000,
      position: "bottom-right",
    }
  );
};
