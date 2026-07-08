

import { useState } from "react";


export const handleUpload = async (files) => {
  const uploads = files.map(async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "Dash-image");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/fmhregze/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    return response.json();
  });

   const  result  = await Promise.all(uploads);
   
    return result.map((image) => ({
     public_id: image.public_id,
    url: image.secure_url,
  }));
};