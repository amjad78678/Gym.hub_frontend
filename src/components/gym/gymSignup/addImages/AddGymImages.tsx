import { Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const AddGymImages = () => {
const [files, setFiles] = useState<File[]>([]);

  const handleImageRemove = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  useEffect(() => {
    //nothing
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div className="min-h-[320px]">
      <Paper
        sx={{
          background: "black",
          cursor: "pointer",
          color: "#bdbdbd",
          border: "1px dashed #ccc",
          "&:hover": {
            border: "1px solid #ccc",
          },
        }}
      >
        <div className="p-4" {...getRootProps()}>
          <input type="text" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-green-500">Drop the files here</p>
          ) : (
            <p>Drap and drop some files here, or click to select files</p>
          )}

          <em>images with *.jpeg *.png or *.jpg extension will be accepted </em>
        </div>
      </Paper>

      {files.map((fileObject, index) => (
        <div className="w-1/2 "
          key={index}
          style={{ position: "relative", display: "inline-block" }}
        >
          <img className="p-5" src={URL.createObjectURL(fileObject)} alt="images" />
          <button
            className="absolute top-10 right-10 p-1 bg-transparent border-none cursor-pointer"
            onClick={() => handleImageRemove(index)}
          >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-10 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

          </button>
        </div>
      ))}
    </div>
  );
};

export default AddGymImages;
