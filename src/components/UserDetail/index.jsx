import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetchModel(`/api/user/${userId}`)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(`Error loading /api/user/${userId}`, err);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>Location: {user.location}</Typography>
      <Typography>Occupation: {user.occupation}</Typography>
      <Typography>{user.description}</Typography>
    </div>
  );
}

export default UserDetail;
