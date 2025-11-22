// src/lib/fetchModelData.js

const BACKEND_BASE_URL = "https://trlw3x-8081.csb.app";

function fetchModel(url) {
  const fullUrl = `${BACKEND_BASE_URL}${url}`;

  return window
    .fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        // ném lỗi để .catch phía trên component bắt được
        throw new Error(`HTTP ${response.status} for ${fullUrl}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.error("fetchModel error:", fullUrl, err);
      throw err;
    });
}

export default fetchModel;
