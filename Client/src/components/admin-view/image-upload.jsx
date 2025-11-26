import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function ProductImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoading,
  imageLoading,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDropOver(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }

  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoading(true);
    const data = new FormData();
    data.append("my_file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response || response.data?.success) {
        setUploadedImageUrl(response.data.result.secure_url);
      }
    } catch (error) {
      toast.error("Image not uploaded!");
      console.log("SSsS");
      setFile(null);
      inputRef.current.value = null;
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  }

  useEffect(() => {
    if (file !== null) uploadImageToCloudinary();
  }, [file]);
  return (
    <div className="w-full p-2 max-w-md mx-auto">
      <Label className="font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropOver}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          ref={inputRef}
          onChange={handleImageFileChange}
          id="image-upload"
          type={"file"}
          className={"hidden"}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            {imageLoading ? (
              <p className="text-lg text-gray-500">Uploading Image...</p>
            ) : (
              <>
                <div className="flex items-center">
                  <FileIcon className="w-8 h-8 text-primary mr-2" />
                </div>
                <p className="text-sm font-medium ">{file.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    "w-4 h-4 text-muted-foreground hover:text-foreground"
                  }
                  onClick={handleRemoveImage}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
