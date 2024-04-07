import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import musor from "./musor.png";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const handle = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Iltimos maydoni to'ldiring");
    let user = {
      name,
    };
    setData([...data, user]);
    setName("");
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  let users = data?.map((u, ix) => (
    <div className="user-div" key={ix}>
      <p className="user" title={u.name}>
        {u.name}
      </p>
      <button className="user-btn" onClick={() => handleDelete(ix)}>
        <img className="img" style={{ width: "25px" }} src={musor} />
      </button>
    </div>
  ));
  return (
    <div className="App">
      <ToastContainer />
      <div>
        <form action="" onSubmit={handle}>
          <input
            required
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
          <button>Add</button>
        </form>
      </div>
      <div>{users}</div>
    </div>
  );
}

export default App;
