import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; // Optional: Install lucide-react for icons

const UploadPhotos = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("uploadedFiles");
    if (stored) {
      setFiles(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(files));
  }, [files]);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const base64Files = await Promise.all(
      selectedFiles.map(async (file) => {
        const base64 = await toBase64(file);
        return {
          name: file.name,
          type: file.type,
          base64,
        };
      })
    );
    setFiles((prev) => [...prev, ...base64Files]);
  };

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const isImage = (type) => type.startsWith("image/");
  const isDoc = (type) => type.includes("pdf") || type.includes("word");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        📸 Upload Your Travel Files
      </h1>
      <label className="block">
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleUpload}
          className="hidden"
        />
        <div className="cursor-pointer w-full md:w-1/2 px-4 py-3 border-2 border-dashed border-blue-400 rounded-lg text-blue-600 hover:bg-blue-50 transition text-center font-medium">
          Click to select images or documents
        </div>
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative rounded-xl shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-xl overflow-hidden group"
            >
              {isImage(file.type) ? (
                <img
                  src={file.base64}
                  alt={file.name}
                  className="w-full h-48 object-cover"
                />
              ) : isDoc(file.type) ? (
                <div className="h-48 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
                  <span className="text-sm font-semibold text-gray-700 px-4 text-center">
                    {file.name}
                  </span>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <span className="text-sm text-gray-400">Unsupported File</span>
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3 border-t text-center text-sm text-gray-700 truncate">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPhotos;
