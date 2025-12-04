import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("اختر ملف Excel أولاً");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
      setMessage("حدث خطأ أثناء الرفع");
    }
  };

  return (
    <div style={{ padding: 30, direction: "rtl", textAlign: "center" }}>
      <h2>📊 رفع ملف Excel إلى قاعدة البيانات</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>
        رفع الملف
      </button>

      {message && (
        <p style={{ marginTop: 20 }}>
          {message} ✅ (عدد السجلات: {count})
        </p>
      )}
    </div>
  );
}

export default App;
