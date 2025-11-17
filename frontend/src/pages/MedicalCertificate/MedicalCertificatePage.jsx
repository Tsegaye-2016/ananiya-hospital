import React from 'react'
import { useParams } from 'react-router-dom'
import AddMedicalCertificate from '../../component/MedicalCertificate/AddMedicalCertificate';
function MedicalCertificatePage() {
    const { patientId } = useParams();
  return (
    <div className='container'>
        <AddMedicalCertificate patientId={patientId} />
    </div>
  )
}

export default MedicalCertificatePage
