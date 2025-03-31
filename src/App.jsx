import { useEffect, useState } from "react";
import myFetchApi from "./fetchApi";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/posts/1`;
        const response = await myFetchApi({
          url: url,
        });
        console.log("fetched Data", response.data);
        setData(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <div
      className="response-shower"
      style={{
        width: "90%",
        maxWidth: "800px",
        height: "90vh",
        maxHeight: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "8px",
        overflow: "auto",
        backgroundColor: "#1e1e1e",
        color: "#f5f5f5",
      }}
    >
      <h1 style={{ color: "#f5f5f5" }}>Backend API in React</h1>
      <div
        className="response-container"
        style={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {loading && (
          <div
            className="loading-spinner"
            style={{ margin: "auto", color: "#f5f5f5" }}
          >
            Loading...
          </div>
        )}
        {error && (
          <div
            className="error-message"
            style={{ color: "#ff4444", margin: "auto" }}
          >
            Something Went Wrong!
          </div>
        )}
        <div
          className="product-count"
          style={{ fontWeight: "bold", color: "#f5f5f5" }}
        >
          Number of data: {(Array.isArray(data) && data.length) || 0}
        </div>
        <pre
          className="response-box"
          style={{
            flex: 1,
            backgroundColor: "#2d2d2d",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            margin: 0,
            color: "#f5f5f5",
          }}
        >
          <code
            style={{
              textAlign: "left",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App;
