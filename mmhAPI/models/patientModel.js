import mongoose from 'mongoose';

// Define the Patient Details schema
const patientDetailsSchema = new mongoose.Schema({
  name: { type: String,  trim: true , required: true },
  aadhar: { type: String,  trim: true },
  mobile: { type: String, trim: true , required: true },
  sex: { type: String,  trim: true ,required: true },
  age: { type: Number,  trim: true ,required: true },
  address: { type: String,  trim: true ,required: true },
  pin: { type: String, trim: true },
  talukha: { type: String,  trim: true  },
  district: { type: String, trim: true , required: true },
  state: { type: String,  trim: true  },
  maritalstatus: { type: String,  trim: true },
  rationcardnumber : {type: String , trim: true }
});


 
// Define the Family Detail schema
const familyDetailSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  relation: { type: String, trim: true, required: true },
  age: { type: Number, trim: true, required: true },
  occupation: { type: String, trim: true, required: true },
  monthlyIncome: { type: Number, trim: true, required: true },
});

// Define the CareTaker schema
const careTakerSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  mobile1: { type: String, trim: true, required: true },
  mobile2: { type: String, trim: true },
  particulars: { type: String, trim: true, required: true },
});

// Define the Disease Detail schema
const diseaseDetailSchema = new mongoose.Schema({
  name: { type: String,trim: true , required: true },
  diagnoseDate: { type: Date,trim: true , required: true },
  diagnoseBy: { type: String,trim: true  },
  investigationDone1: { type: String,trim: true  },
  investigationDone2: { type: String, trim: true },
  investigationDone3: { type: String, trim: true },
  currentHospitalName: { type: String,trim: true  },
  currentHospitalAddress: { type: String, trim: true  },
  currentHospitalContactNo: { type: String, trim: true },
  currentTreatmentDetail: { type: String, trim: true ,required: true },
  doctorAdviceForFurtherProcess: { type: String,trim: true , required: true },
});



// Define the Main schema
const patientSchema = new mongoose.Schema({

  patientDetails: { type: patientDetailsSchema, trim: true,required: true },
  patientID : {type : String, trim: true,required: true},
  amountSaved : {type : String, trim: true},
  amountGivenByMMH : {type : String, trim: true},
  familyDetail: { type: [familyDetailSchema], required: true },
  careTaker: { type: careTakerSchema, required: true },
  disease: { type: String, trim: true,required: true },
  // Assuming disease is a string, you can adjust the type as needed
  diseaseDetail: { type: diseaseDetailSchema, required: true },

  //documentes
  // documentname : {type: String , trim : true},
  documents:{type:Array},
  
  
  createdBy: { type: String , trim: true,required: true},
  registeredDate: { type: Date, default: Date.now },
  status: { type: String ,trim: true, required: true},
  referredBy : { type: String ,trim: true, required: true},
  comments : {type : String, trim: true},
  patientfeedback : {type : String, trim: true},
  closedate : {type : String},

  // at update
  schemeName: { type: String , trim: true},     
  hospital: { type: String , trim: true},       
  viewByMhh: { type: String , trim: true},      
  adviceByMhh: { type: String },    
  proposeHelpByMhh: { type: String , trim: true},
}, {timestamps : true});




// Create the Patient model
const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel;
