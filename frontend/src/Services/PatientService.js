const API_URL = import.meta.env.VITE_API_URL;
const createPatient = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/patient`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
             body: JSON.stringify(formData),
        });
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create patient");
        }

        return response.json();
    } catch (error) {
        console.error("Error creating patient:", error);
        throw error;
    }
}
const getPatients = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    data = { message: "Server did not return JSON" };
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch patients");
  }

  return data;
};
const getPatientByBiometric = async (biometricId) => {
  try {
    const response = await fetch(`${API_URL}/api/patient/${biometricId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch patient info");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching patient info:", error);
    throw error;
  }
};
export const patientService={
    createPatient,
    getPatients,
    getPatientByBiometric
}
export default patientService;