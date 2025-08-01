// "use client";

// import React, { useState } from "react";

// const DashboardPage = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
//   const [code, setCode] = useState<string>("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadedFileName(file.name);
//     }
//   };

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(code);
//     alert("Code copied to clipboard!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-3xl mx-auto space-y-10">
//         <h1 className="text-3xl font-bold text-gray-800 text-center">📊 Dashboard</h1>

//         {/* Upload Section */}
//         <div className="card space-y-4">
//           <h2 className="section-title">📁 Upload File</h2>

//           <label className="flex flex-col items-center justify-center h-40 w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer overflow-hidden relative">
//             <input
//               type="file"
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               accept=".pdf,.docx,.txt"
//               onChange={handleFileChange}
//             />

//             {/* SVG Icon - Hardcoded size to prevent giant rendering */}
//             <svg
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="mb-2 text-gray-500"
//             >
//               <path
//                 d="M12 16V8M12 8L8 12M12 8L16 12M5 20H19C20.1 20 21 19.1 21 18V10C21 8.9 20.1 8 19 8H17.59C17.21 6.84 16.18 6 15 6H9C7.82 6 6.79 6.84 6.41 8H5C3.9 8 3 8.9 3 10V18C3 19.1 3.9 20 5 20Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>

//             <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
//             <p className="text-xs text-gray-400">PDF / DOCX / TXT — Max 10MB</p>
//           </label>

//           {uploadedFileName && (
//             <div className="text-green-700 bg-green-50 p-3 rounded-md text-sm text-center">
//               ✅ Uploaded: <span className="font-medium">{uploadedFileName}</span>
//             </div>
//           )}
//         </div>

//         {/* Code Box Section */}
//         <div className="card space-y-4">
//           <h2 className="section-title">💻 Code Box</h2>
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Paste or write code here..."
//             className="textarea h-40 font-mono resize-none"
//           />
//           <div className="flex justify-end">
//             <button
//               onClick={handleCopyCode}
//               disabled={!code.trim()}
//               className={`btn-primary ${!code.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               Copy Code
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;




"use client";

import React, { useState } from "react";

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadedFileName(file.name);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">📊 Dashboard</h1>

        {/* Upload Section */}
        <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📁 Upload File</h2>

          <label className="flex flex-col items-center justify-center h-44 w-full max-w-lg mx-auto border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
            />

            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2 text-gray-500"
            >
              <path
                d="M12 16V8M12 8L8 12M12 8L16 12M5 20H19C20.1 20 21 19.1 21 18V10C21 8.9 20.1 8 19 8H17.59C17.21 6.84 16.18 6 15 6H9C7.82 6 6.79 6.84 6.41 8H5C3.9 8 3 8.9 3 10V18C3 19.1 3.9 20 5 20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400">PDF / DOCX / TXT — Max 10MB</p>
          </label>

          {uploadedFileName && (
            <div className="text-green-700 bg-green-50 p-3 rounded-md text-sm text-center font-medium">
              ✅ Uploaded: {uploadedFileName}
            </div>
          )}
        </div>

        {/* Code Box Section */}
        <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">💻 Code Box</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste or write code here..."
            className="textarea h-44 font-mono text-sm rounded-xl shadow-inner resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCopyCode}
              disabled={!code.trim()}
              className={`btn-primary px-4 py-2 rounded-md text-white font-medium transition ${
                !code.trim() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
