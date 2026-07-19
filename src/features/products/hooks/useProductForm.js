import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { useAddProduct } from "../context/AddProductContext";

export default function useProductForm({
  mode,
  product,
  onSubmit,
}) {


  const [status, setstatus] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();



  useEffect(() => {
    if (mode === "edit" && product) {

      reset({
        ...product,
        tags: product.tags || [],
      });

      setImages(product.images || []);
      setTags(product.tags || []);
    }
  }, [mode, product, reset]);


  useEffect(() => {
    setValue("tags", tags);
  }, [tags, setValue]);

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);



  const { state, submitProduct } = useAddProduct();
  const { isLoading, error: submitError, success: submitSuccess } = state;
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    if (mode === "edit") {
      setImages(prev => [
        ...prev,
        ...files,
      ].slice(0, 5));

    } else {
      setImages(prev => [
        ...prev,
        ...files,
      ].slice(0, 5));
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index) => {
    const image = images[index];

    if (image.public_id) {
      setDeletedImages(prev => [...prev, image.public_id]);
    }

    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setImages(prev => [...prev, ...files].slice(0, 5));
  };
  const handleFormSubmit = async (data) => {
    setstatus(true);
    try {
      const newImages = images.filter(
        (image) => !deletedImages.includes(image.public_id)
      );

      const newData = {
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        stock: Number(data.stock),
        sku: data.sku,
        category: data.category,
        subcategory: data.subcategory,
        brand: data.brand,

        featured: data.featured,
        isActive: data.isActive,

        tags,

        images: newImages,
      };
      console.log(newData);
      console.log("Add Product Form");
      console.log(JSON.stringify(newData, null, 2));
      if (onSubmit) {
        await onSubmit(newData);
        return;
      }

      await submitProduct(newData);

    } catch (err) {
      console.log(err);
    }
    finally {
      setstatus(false);
    }
  };




  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };


  return {
    register,
    handleSubmit,

    images,
    tags,
    tagInput,

    setTagInput,

    fileInputRef,

    handleImageChange,
    handleRemoveImage,
    handleDragOver,
    handleDrop,

    addTag,
    removeTag,

    handleFormSubmit,

    submitError,
    submitSuccess,
    isLoading,
    status,
  };
}


