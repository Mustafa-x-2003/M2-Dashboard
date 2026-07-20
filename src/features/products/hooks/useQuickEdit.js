import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetProduct, UpdateProduct } from "../services/Editproduct";
import { handleUpload } from "../services/UploadImage";

export default function useQuickEdit({
  id,
  refresh,
  setshowPopup,
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState({
    images: [],
    tags: [],
  });

  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagetoDelete, setImagetoDelete] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(false);





  useEffect(() => {
    setIsLoading(true);

    GetProduct(id)
      .then((res) => {
        const item = res.product;

        setProduct(item);
        setFeatured(item.featured);
        setActive(item.isActive);

        reset({
          ...item,
          tags: item.tags.join(", "),
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, reset]);



  const handleFormKeyDown = (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };
  
    const handleImageUpload = async (e) => {
      const files = Array.from(e.target.files);
  
      const uploadedImages = await handleUpload(files);
  
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    };
  
  const handleMarkedImagetoDelete = (id) => {
    if (imagetoDelete.includes(id)) {
      setImagetoDelete(
        imagetoDelete.filter((image) => image !== id)
      );
    } else {
      setImagetoDelete([...imagetoDelete, id]);
    }
  };



     const onsubmit = async (data) => {
        try {
          setStatus(true);
    
          const newImages = product.images.filter(
            (image) => !imagetoDelete.includes(image.public_id)
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
    
            featured,
            isActive: active,
    
            tags: (data.tags || "")
              .split(",")
              .map(tag => tag.trim())
              .filter(Boolean),
    
            images: newImages,
          };
    
          console.log("Quick Edit");
          console.log(JSON.stringify(newData, null, 2));
          await UpdateProduct(id, newData);
    
      
          refresh?.();
          setshowPopup?.(false);
          
        } catch (error) {
          console.error(error);
          
        } finally {
          setStatus(false);
        }
      };


  return {
    register,
    handleSubmit,

    product,
    status,
    isLoading,

    featured,
    active,

    setFeatured,
    setActive,

    handleImageUpload,
    handleMarkedImagetoDelete,

    handleFormKeyDown,
    onsubmit,
    errors,
  };


}