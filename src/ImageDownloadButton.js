import React from "react";

const downloadImage = (base64Data, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = base64Data;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ImageDownloadButton = (props) => {
  const { base64Data, fileName } = props;

  const handleDownloadClick = () => {
    const blobData = atob(base64Data.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(blobData.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < blobData.length; i++) {
      uintArray[i] = blobData.charCodeAt(i);
    }

    const blob = new Blob([uintArray], { type: "image/png" });
    const blobUrl = URL.createObjectURL(blob);
    downloadImage(blobUrl, fileName);
  };

  return <button onClick={handleDownloadClick}>Download Image</button>;
};

export default ImageDownloadButton;
