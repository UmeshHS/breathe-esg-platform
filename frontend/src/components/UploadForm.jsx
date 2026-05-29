import { useState } from "react";
import axios from "axios";

function UploadForm({ onUploadSuccess }) {
  const [sourceType, setSourceType] = useState("sap");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("source_type", sourceType);
    formData.append("organization_id", 1);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ingestion/upload/",
        formData
      );

      alert(response.data.message);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="mb-8 border p-4 rounded"
    >
      <h2 className="text-xl font-bold mb-4">
        Upload ESG Data
      </h2>

      <select
        value={sourceType}
        onChange={(e) =>
          setSourceType(e.target.value)
        }
        className="border p-2 mr-4"
      >
        <option value="sap">SAP</option>
        <option value="utility">Utility</option>
        <option value="travel">Travel</option>
      </select>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        type="submit"
        className="ml-4 px-4 py-2 border rounded"
      >
        Upload
      </button>
    </form>
  );
}

export default UploadForm;