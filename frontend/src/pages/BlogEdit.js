import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

export const BlogEdit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [topic, settopic] = useState("");
  const [detail, setdetail] = useState("");
  const [errors, setErrors] = useState({});

  const handleEditBlog = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!topic.trim()) {
      errors.topic = "topic is required";
    }
    if (!detail.trim()) {
      errors.detail = "detail is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/blogs/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ detail, topic }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log(response);
      const err = await response.json();
      errors.login = err.message;
      setErrors(errors);
    } else {
      navigate("/bloglist");
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log(_id);
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/blogs/${_id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setdetail(data.result.detail);
          settopic(data.result.topic);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [_id]);

  return (
    <div>
      <Navbar />

      <div className="bg-warning text-center py-2 fs-4">Edit Blog Post</div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <form onSubmit={handleEditBlog}>
            {/* Topic Field */}
            <div className="row mb-4">
              <div className="col-md-3 text-md-end">
                <label htmlFor="topic" className="form-label">
                  Topic
                </label>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => settopic(e.target.value)}
                />
                {errors.topic && <p className="text-danger">{errors.topic}</p>}
              </div>
            </div>

            {/* Detail Field */}
            <div className="row mb-4">
              <div className="col-md-3 text-md-end">
                <label htmlFor="detail" className="form-label">
                  Detail
                </label>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  id="detail"
                  rows="6"
                  value={detail}
                  onChange={(e) => setdetail(e.target.value)}
                ></textarea>
                {errors.detail && (
                  <p className="text-danger">{errors.detail}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <button className="btn btn-primary w-100">
                  Edit Blog Post
                </button>
                {errors.login && <p className="text-danger">{errors.login}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
