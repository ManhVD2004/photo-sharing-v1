import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetchModel(`/api/photo/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data);
      })
      .catch((err) => {
        console.error(`Error loading /api/photo/photosOfUser/${userId}`, err);
      });
  }, [userId]);

  if (!photos.length) {
    return <div>No photos (or loading...)</div>;
  }

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          <Typography variant="subtitle1">
            {photo.file_name} - {photo.date_time}
          </Typography>
          <img
            src={`/images/${photo.file_name}`}
            alt={photo.file_name}
            style={{ maxWidth: "300px", display: "block" }}
          />
          <div style={{ marginTop: "8px" }}>
            {photo.comments &&
              photo.comments.map((c) => (
                <div key={c._id}>
                  <b>
                    {c.user.first_name} {c.user.last_name}:
                  </b>{" "}
                  {c.comment}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
