const API_URL = import.meta.env.VITE_API_URL;
const createMedicalCertificate = async (patientId,formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/medicalCertificate/${patientId}`, {
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
export const medicalCertificateService={
    createMedicalCertificate
}
export default medicalCertificateService;