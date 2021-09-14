const authHeader = () => {
  const token = localStorage.getItem("token");
  const header = {};
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
    return header;
  } else {
    return header;
  }
};

export default authHeader;
