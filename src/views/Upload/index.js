import React, { useState } from "react";
import UseUpload from "../../componets/hooks/UseUpload";

function Upload() {
  const [newInfo, setNewInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = (files) => {
    setNewInfo({ ...newInfo, profileImages: files });
  };

  return (
    <div>
      <UseUpload
        accept=".jpg,.png,.jpeg"
        label="Imagenes"
        updatedFiles={updateUploadedFiles}
      />
    </div>
  );
}

export default Upload;
