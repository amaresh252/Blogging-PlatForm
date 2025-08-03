import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

export const ViewBlog = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [topic, settopic] = useState("");
  const [detail, setdetail] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log(_id);
        const token = localStorage.getItem("token");
        const response = await fetch(`https://blogging-plat-form.vercel.app/api/blogs/${_id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setdetail(data.result.detail);

          settopic(data.result.topic);
          console.log(data.result.topic);
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
      <div className="bg-warning text-center py-2">
        <strong>Blog Detail</strong>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1>{topic}</h1>
          <p className="mt-4">{detail}</p>
        </div>
      </div>
    </div>
  );
};
