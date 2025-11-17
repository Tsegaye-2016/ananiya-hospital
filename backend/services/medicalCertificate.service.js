const pool = require("../config/db.config");
async function createMedicalCertificate(certificate) {
    try {
        const query = `
            INSERT INTO medical_certificate (
                patient_id,
                weight,
                height,
                previous_illness_history,
                hospitalization_history,
                declaration_date,
                general_appearance,
                hearing_ability,
                vision_accuracy,
                respiratory_system,
                cardiovascular_system,
                nervous_system,
                pregnancy_status,
                rbs_level,
                urine_analysis,
                liver_function,
                renal_function,
                esr_level,
                cbc_count,
                hbsag,
                heab,
                vdrl,
                hiv_test,
                blood_film,
                chest_xray,
                ecg,
                lft,
                rft
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22,$23, $24, $25, $26, $27, $28
            )
            RETURNING *`;

        const values = [
            certificate.patient_id,
            certificate.weight,
            certificate.height,
            certificate.previous_illness_history,
            certificate.hospitalization_history,
            certificate.declaration_date,
            certificate.general_appearance,
            certificate.hearing_ability,
            certificate.vision_accuracy,
            certificate.respiratory_system,
            certificate.cardiovascular_system,
            certificate.nervous_system,
            certificate.pregnancy_status,
            certificate.rbs_level,
            certificate.urine_analysis,
            certificate.liver_function,
            certificate.renal_function,
            certificate.esr_level,
            certificate.cbc_count,
            certificate.hbsag,
            certificate.heab,
            certificate.vdrl,
            certificate.hiv_test,
            certificate.blood_film,
            certificate.chest_xray,
            certificate.ecg,
            certificate.lft,
            certificate.rft
        ];

        const result = await pool.query(query, values);
        return result.rows[0];

    } catch (error) {
        console.error("Error creating medical certificate:", error);
        throw error;
    }
}
module.exports = {
    createMedicalCertificate
}
