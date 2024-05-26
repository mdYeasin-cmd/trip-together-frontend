import axios from "axios";

const apiKey = "ff163a54aef672c738d464c47e95eeaf";

const imgbbImageUploader = async (file: Blob) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const result = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return result;
  } catch (error) {
    console.log(error, "imgbb error log");
  }
};

export default imgbbImageUploader;
