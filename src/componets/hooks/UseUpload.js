import React, { useState, useRef } from "react";
const MAX_SIZE = 600000;
const KILO_BYTES = 1000;
const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES);
const UseUpload = ({
  label,
  updatedFiles,
  maxFileSizeInBytes = MAX_SIZE,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFiles({ ...files });
  };

  const convertToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFile = addNewFiles(newFiles);
      setFiles(updatedFile);
      callUpdateFiles(updatedFile);
    }
  };

  const callUpdateFiles = (files) => {
    const filesAsArray = convertToArray(files);
    updatedFiles(filesAsArray);
  };

  return (
    <>
      <div className="container-fluid">
        <section>
          <div className="d-flex flex-column ">
            <div>
              <label className="form-label" htmlFor="formFile">
                {label}
              </label>
              <p>Drag and drop your files</p>
            </div>
            <div className="d-flex">
              <button type="button" onClick={handleUploadBtnClick}>
                <i className="fas fa-file-upload" />
                <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
              </button>
              <input
                id="formFile"
                className="inputUpload"
                type="file"
                ref={fileInputField}
                onChange={handleNewFileUpload}
                title=""
                value=""
                {...otherProps}
              />
            </div>
          </div>
        </section>

        <article>
          <span>To Upload</span>
          <section>
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              let isImageFile = file.type.split("/")[0] === "image";
              return (
                <section key={fileName}>
                  <div>
                    {isImageFile && (
                      <img
                        style={{ width: 200 }}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                      />
                    )}
                    <div isImageFile={isImageFile}>
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => removeFile(fileName)}
                        />
                      </aside>
                    </div>
                  </div>
                </section>
              );
            })}
          </section>
        </article>
      </div>
    </>
  );
};

export default UseUpload;
