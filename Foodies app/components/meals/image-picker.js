"use client";
import { useState, useRef } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const handlePickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      return;
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>
        {label}
      </label>
      <div className={classes.controls}>
        <input 
          className={classes.input} 
          type="file" 
          id={name} 
          name={name} 
          accept="image/png, image/jpeg" 
          required 
          ref={imageRef}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handlePickImage}>
          Pick an image
        </button>
      </div>
      {selectedImage ? (
        <div className={classes.preview}>
          <Image 
            src={selectedImage} 
            alt="The image selected for the meal" 
            fill
          />
        </div>
      ) : null}
    </div>
  )
}