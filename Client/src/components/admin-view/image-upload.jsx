import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
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
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium ">{file.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className={"w-4 h-4 text-muted-foreground hover:text-foreground"}
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
