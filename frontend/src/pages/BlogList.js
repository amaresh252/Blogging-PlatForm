import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

export const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`https://blogging-plat-form.vercel.app/api/blogs`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBlogData(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://blogging-plat-form.vercel.app/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setBlogData((prevData) => prevData.filter((data) => data._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredEmployees = blogData.filter((employee) =>
    employee.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row bg-warning">
        <div className="col">Blog List</div>
      </div>

      <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-4 ">Total Count: {blogData.length}</div>
            <div className="col-md-6  me-1">
              <Link to="/createblog" className="text-decoration-none text-dark">
                <button className="btn btn-success mx-2">Create Blog</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-secondary">
        <div className="col-md-8"></div>
        <div className="col-md-4 ">
          <div className="row">
            <div className="col-md-2 ">Search</div>
            <div className="col-md-10 pe-0">
              <input
                className="w-100 text-center"
                type="text"
                name="search"
                placeholder="Input Search Keyword"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <table className="table table-bordered">
          <thead>
            <tr className="table-secondary">
              <th scope="col">Topic</th>
              <th scope="col">Detail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((data) => (
              <tr key={data._id}>
                <td>{data.topic}</td>
                <td>{data.detail}</td>

                <td>
                  <Link
                    className="text-dark text-decoration-none"
                    to={`/viewblog/${data._id}`}
                  >
                    <button className="btn btn-dark mx-2">View</button>
                  </Link>

                  {data.User == id && (
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/editblog/${data._id}`}
                    >
                      <button className="btn btn-dark mx-2">Edit</button>
                    </Link>
                  )}
                  {data.User == id && (
                    <button
                      className="btn btn-dark mx-2"
                      onClick={(e) => handleDelete(e, data._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
