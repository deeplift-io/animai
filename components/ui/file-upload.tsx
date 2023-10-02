import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({
  bucket,
  onUploadSuccess,
}: {
  bucket: string;
  onUploadSuccess: (publicUrl: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const supabase = createClientComponentClient();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      const uuid = uuidv4();
      for (const file of acceptedFiles) {
        try {
          let { error: uploadError, data } = await supabase.storage
            .from(bucket)
            .upload(`/public/${uuid}`, file);
          if (uploadError) {
            throw uploadError;
          }
          const { data: uploadedFile } = await supabase.storage
            .from(bucket)
            .getPublicUrl(`/public/${uuid}`);

          if (uploadedFile) {
            onUploadSuccess(uploadedFile?.publicUrl);
            setUploadedFiles([...uploadedFiles, uploadedFile]);
          }
        } catch (error) {
          alert(error.message);
        } finally {
          setUploading(false);
        }
      }
    },
  });

  return (
    <div
      className="border border-dashed border-gray-300 p-4 rounded-lg"
      {...getRootProps()}
    >
      {uploadedFiles.length > 0 ? (
        <div className="flex justify-center">
          {uploadedFiles.map((file) => (
            <div key={file.id}>
              <img className="w-32 h-32" src={file.publicUrl} alt={file.name} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <input {...getInputProps()} />
          <p className="text-center text-gray-500">Upload an image</p>
          <p className="text-sm text-center text-gray-500">
            Drag and drop some image here, or click to select files
          </p>
          {uploading && <p>Uploading...</p>}
        </>
      )}
    </div>
  );
};

export default FileUpload;
