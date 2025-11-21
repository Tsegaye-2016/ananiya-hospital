const API_URL = import.meta.env.VITE_API_URL;
export const signup = async (data) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const signin = async (data) => {
  console.log("API_URL:", API_URL);
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log("Response:", response);
  return response.json();
};
// export const signin = async (data) => {
//   console.log("API_URL:", API_URL);
//   console.log("Form data:", data);

//   try {
//     const response = await fetch(`${API_URL}/signin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//       mode: 'cors'
//     });

//     console.log("Raw response:", response);
//     const result = await response.json();
//     console.log("Response JSON:", result);
//     return result;
//   } catch (err) {
//     console.error("Fetch failed:", err);
//     return { message: err.message };
//   }
// };


