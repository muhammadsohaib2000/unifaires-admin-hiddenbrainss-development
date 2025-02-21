
import { toast } from "react-toastify";
import axiosInstance from "./axios-config";
import { handleAxiosError } from "./axiosError";

export async function uploadToAPI(file: any) {
  const formData = new FormData();
  formData.append("media", file);

  try {
    const imgRes = await axiosInstance.post("/media", formData);
    console.log(imgRes);
    if (imgRes.status) {
      const isImage = file.type?.startsWith("image/");
      const isVideo = file.type?.startsWith("video/");
      if (isImage) {
        toast.success("Image uploaded successfully.");
        return imgRes.data.data.url;
      } else if (isVideo) {
        toast.success("Video uploaded successfully.");
        return imgRes.data.data.url;
      } else {
        toast.success("File Uploaded Successfully");
        return imgRes.data.data.url;
      }
    } else {
      toast.error("Image Upload Failed, try again.");
      throw new Error("Image Upload Failed, try again.");
    }
  } catch (error) {
    handleAxiosError(error);
    // toast.error("Image Upload Failed, try again.");
  }
}
