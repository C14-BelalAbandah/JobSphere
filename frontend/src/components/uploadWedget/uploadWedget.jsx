import React, { useState } from 'react'

const App = () => {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState("")

  const uploadFile = () => {
    if (!file) return alert("Select a PDF first");
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadCv");
    data.append("resource_type", "raw");
  
    fetch("https://api.cloudinary.com/v1_1/dcq4kfehy/raw/upload", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(json => {
        console.log("raw upload response:", json);
        setUrl(json.secure_url);
      })
      .catch(err => console.error("Upload error:", err));
  };
  

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Upload PDF to Cloudinary</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile} style={{ marginLeft: 10 }}>
        Upload
      </button>

      {url && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded PDF:</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View / Download PDF
          </a>
        </div>
      )}
    </div>
  )
}

export default App
