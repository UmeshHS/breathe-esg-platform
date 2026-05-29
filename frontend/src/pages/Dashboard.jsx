import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const totalRecords = records.length;

    const suspiciousRecords = records.filter(
    (r) => r.suspicious
    ).length;

    const approvedRecords = records.filter(
    (r) => r.status === "approved"
    ).length;

    const pendingRecords = records.filter(
    (r) => r.status === "pending"
    ).length;
    useEffect(() => {
        fetchRecords();
    }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/emissions/records/"
      );

      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredRecords = records.filter((record) => {

  if (filter === "suspicious") {
    return record.suspicious;
  }

  if (filter === "approved") {
    return record.status === "approved";
  }

  if (filter === "pending") {
    return record.status === "pending";
  }

  return true;
});
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        ESG Records Dashboard
      </h1>
      <UploadForm
    onUploadSuccess={fetchRecords}
    />

    <div className="flex gap-3 mb-6">

<button
  onClick={() => setFilter("all")}
  className={`px-4 py-2 border rounded ${
    filter === "all"
      ? "bg-blue-500 text-white"
      : ""
  }`}
>
  All
</button>
<button
  onClick={() => setFilter("suspicious")}
  className={`px-4 py-2 border rounded ${
    filter === "suspicious"
      ? "bg-blue-500 text-white"
      : ""
  }`}
>
  suspicious
</button>

<button
  onClick={() => setFilter("approved")}
  className={`px-4 py-2 border rounded ${
    filter === "approved"
      ? "bg-blue-500 text-white"
      : ""
  }`}
>
  approved
</button>

<button
  onClick={() => setFilter("Pending")}
  className={`px-4 py-2 border rounded ${
    filter === "Pending"
      ? "bg-blue-500 text-white"
      : ""
  }`}
>
  Pending
</button>


</div>

      <div className="grid grid-cols-4 gap-4 mb-8">

  <div className="border rounded p-4 shadow">
    <h2 className="text-lg font-semibold">
      Total Records
    </h2>
    <p className="text-3xl font-bold">
      {totalRecords}
    </p>
  </div>

  <div className="border rounded p-4 shadow">
    <h2 className="text-lg font-semibold">
      Suspicious
    </h2>
    <p className="text-3xl font-bold">
      {suspiciousRecords}
    </p>
  </div>

  <div className="border rounded p-4 shadow">
    <h2 className="text-lg font-semibold">
      Approved
    </h2>
    <p className="text-3xl font-bold">
      {approvedRecords}
    </p>
  </div>

  <div className="border rounded p-4 shadow">
    <h2 className="text-lg font-semibold">
      Pending
    </h2>
    <p className="text-3xl font-bold">
      {pendingRecords}
    </p>
  </div>

</div>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Scope</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Suspicious</th>
          </tr>
        </thead>

        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td className="border p-2">
                {record.category}
              </td>

              <td className="border p-2">
                {record.scope}
              </td>

              <td className="border p-2">
                {record.status}
              </td>

              <td className="border p-2">
                {record.suspicious
                  ? "⚠️ Yes"
                  : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;