import { toast } from "sonner";

export const handleError = (error: any) => {
  if (error?.data?.message) {
    toast.error("Error: " + error?.data?.message, {});
  } else toast.error("Something went wrong please try again later");
};
