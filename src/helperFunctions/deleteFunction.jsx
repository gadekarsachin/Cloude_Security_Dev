const handleDelete = (dbtable, id, fetchData) => {
  // Send an API request to delete the record with the given id
  fetch(`http://localhost:8000/v1/collection/${dbtable}/${id}`, {
    method: "DELETE",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTY0ODc0MjgsImV4cCI6MTY5OTA3OTQyOCwidHlwZSI6InJlZnJlc2gifQ.PUx7UBTSDgEz4fLIwDxNSYz1W8tq5BBTNfsGhGzFTog",
    },
  })
    .then((response) => {
      if (response) {
        fetchData();
      } else {
        console.error("Failed to delete the record.");
      }
    })
    .catch((error) => console.error("Error:", error));
};
export default handleDelete;
