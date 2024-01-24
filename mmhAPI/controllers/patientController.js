
import PatientModel from "../models/patientModel.js";
import status from 'http-status'
import aws from 'aws-sdk'

export const getPatient = async (req, res) => {
    try {
        const result = await PatientModel.find()
        // console.log(result);

        if (!result) return res.status(404).json({
            success: false,
            message: "There Is No Users..."
        })

        return res.status(status.OK).json({
            success: true,
            result
        })
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error While Displaying Users...",
            error: error.message
        })
    }
}




const generateCustomId = async () => {
    const totalPatients = await PatientModel.countDocuments();
    const mmh = 'MMH';
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const count = (totalPatients + 1).toString().padStart(2, '0');
    const customId = `${mmh}/${year}/${month}/${day}/${count}`;
    console.log(customId);
    return customId;
};

export const createPatient = async (req, res) => {
    try {

        const customId = await generateCustomId();

        req.body.patientID = customId

        const newPatient = new PatientModel(req.body);

        const patientData = await newPatient.save();

        res.status(status.CREATED).json({
            success: true,
            message: "Patient created successfully",
            patientData,
        });
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error While Creating Patient...",
            error: error.message + error.name,
        });
    }
};

//AWS Upload Code
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SEC_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const uploadFile = async (file) => {
    // console.log('File Buffer:', file.buffer); // Log the file buffer
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
    };
    // console.log('Upload Params:', params);
    try {
        const data = await s3.upload(params).promise();
        return data;
    } catch (error) {
        throw new Error(`Error uploading file: ${error.message}`);
    }
};

export const updatePatient = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.files);
        let patient;
        console.log("body ===> " ,req.body);
        if (req.files != undefined) {

            // Assuming req.files is an array of files
            const patientDocuments = await Promise.all(req.files.map(file => uploadFile(file)));
            console.log("patient documents===>", patientDocuments);

            console.log('Uploaded Images:', patientDocuments);
            const uploadedImagesUrl = patientDocuments.map(file => ({
                imageUrl: file.Location,
                imageName: file.key,
                

            }));

            // console.log("uploaded Images URL:===>", uploadedImagesUrl);
            // console.log("uplaod file Async Function======>",uploadFile);

            patient = await PatientModel.findByIdAndUpdate(
                id,
                { ...req.body, documents: uploadedImagesUrl },
                { new: true }
            );

            if (!patient) {
                return res.status(status.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid ID",
                });
            }
        } else {
            patient = await PatientModel.findByIdAndUpdate(
                id,
                { ...req.body }, { new: true }
            );
            if (!patient) {
                return res.status(status.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid ID",
                });
            }
        }

        // console.log(patient);
        // await patient.save(); // Save patient changes

        return res.status(status.OK).json({
            success: true,
            message: "Patient record updated successfully",
            patient

        });

    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: "Error while updating patient",
            error: error.message,
        });
    }
};

export const deletePatient = async (req, res) => {
    const _id = req.params.id;

    try {
        const patient = await PatientModel.findByIdAndDelete({ _id });

        if (!patient) {
            return res.status(status.NOT_FOUND).json({
                success: false,
                message: "Invalid ID"
            });
        }

        res.json({
            success: true,
            message: "Patient deleted successfully..."
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error while deleting patient",
            error: error.message
        });
    }
};


//get patient by Id

export const getPatientById = async (req, res) => {
    const id = req.params.id
    const pateint = await PatientModel.findById(id)

    if (!pateint) return res.status(404).json({
        success: false,
        message: "Invalid ID"
    })

    res.send({
        success: true,
        message: "This is the Patient...",
        pateint
    })

} 
