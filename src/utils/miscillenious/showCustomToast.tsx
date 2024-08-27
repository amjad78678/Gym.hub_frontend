import CustomMessageToast from "@/components/common/CustomMessageToast";
import toast from "react-hot-toast";

export const showCustomToast = (message: string) => {
  toast.custom(
    (t) => (
      <CustomMessageToast
        t={t}
        message={message}
        onClose={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration: 1000,
      position: "bottom-right",
    }
  );
};
