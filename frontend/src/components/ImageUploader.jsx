import React, { useRef, useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
        <div
          onClick={handleClick}
          className="bg-gray-500 h-full w-[10rem] rounded-lg overflow-hidden flex justify-center items-center hover:cursor-pointer"
        >
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-3/4 w-1/2 flex justify-center items-center">
              <img src="plus.svg" alt="plus symbol" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
    </>
  );
};

export default ImageUploader;
