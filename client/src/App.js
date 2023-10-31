import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server if needed
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {/* below code just to show how to retrive image 
        url/upload/user_id or url/upload/quiz_id  1-represents id*/}
      <img src="http://localhost:3001/uploads/1" alt="Uploaded Image" />
    </div>
  );
}

export default App;
