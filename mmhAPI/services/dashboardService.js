
import PatientModel from "../models/patientModel.js"



//Admin Dashboard
export const getTotalAmountService = async () => {
  try {
    const result = await PatientModel.aggregate([
      {
        $group: {
          _id: null,
          amountSaved: { $sum: { $toInt: '$amountSaved' } }, // Convert to integer if 'amountSaved' is a string
        },
      },
    ]);

    if (result.length > 0) {
      const totalAmount = result[0].amountSaved;
      // console.log('Total Amount:', totalAmount);
      return totalAmount;
    } else {
      console.log('No records found.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total amount:', error);
    throw error;
  }
};



export const getTotalAmountGivenByMMHService = async () => {
  try {
    const result = await PatientModel.aggregate([
      {
        $match: {
          amountGivenByMMH: { $exists: true, $ne: '' }, // Match documents where amountGivenByMMH field exists and is not an empty string
        },
      },
      {
        $group: {
          _id: null,
          totalAmountGivenByMMH: { $sum: { $toDouble: "$amountGivenByMMH" } },
        },
      },
    ]);

    if (result.length > 0) {
      const totalAmountGivenByMMH = result[0].totalAmountGivenByMMH;
      // console.log('Total Amount Given by MMH:', totalAmountGivenByMMH);
      return totalAmountGivenByMMH;
    } else {
      console.log('No records found with amountGivenByMMH field.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total amount given by MMH:', error);
    throw error;
  }
};




export const getThisMonthTotalAmountService = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

    const result = await PatientModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$registeredDate' }, currentMonth],
          },
        },
      },
      {
        $group: {
          _id: null,
          amountSaved: { $sum: { $toInt: '$amountSaved' } },
        },
      },
    ]);

    if (result.length > 0) {
      const monthAmount = result[0].amountSaved;
      // console.log('Total Amount for the current month:', monthAmount);
      return monthAmount;
    } else {
      console.log('No records found for the current month.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total amount for the current month:', error);
    throw error;
  }
};




export const totalNumberOfCaseCloseService = async () => {
  try {
    const closedStatusValues = [
      'Closed-Patient Rejected',
      'Closed-Civil Hospital',
      'Closed-Ayushman Bharat',
      'Closed-Private',
      'Closed-MJPJA',
      'Application Closed',
      'Closed-Other'
    ];

    const result = await PatientModel.aggregate([
      {
        $match: {
          status: { $in: closedStatusValues },
        },
      },
      {
        $group: {
          _id: null,
          totalClosedCases: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      const totalClosedCases = result[0].totalClosedCases;
      // console.log('Total number of closed cases:', totalClosedCases);
      return totalClosedCases;
    } else {
      console.log('No closed cases found.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total number of closed cases:', error);
    throw error;
  }
};


export const totalNumberOfCaseCloseInMonthService = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

    const closedStatusValues = [
      'Closed-Patient Rejected',
      'Closed-Civil Hospital',
      'Closed-Ayushman Bharat',
      'Closed-Private',
      'Closed-MJPJA',
      'Application Closed',
      'Closed-Other'
    ];

    const result = await PatientModel.aggregate([
      {
        $match: {
          status: { $in: closedStatusValues },
          $expr: {
            $eq: [{ $month: '$registeredDate' }, currentMonth],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalClosedCases: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      const totalClosedCases = result[0].totalClosedCases;
      // console.log('Total number of closed cases for the current month:', totalClosedCases);
      return totalClosedCases;
    } else {
      console.log('No closed cases found for the current month.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching total number of closed cases for the current month:', error);
    throw error;
  }
};



export const totalNumberOfApproachService = async () => {

  try {
    const totalNumberOfApproach = await PatientModel.find()
    return totalNumberOfApproach.length
  } catch (error) {
    console.log("error while getting approch ");
  }

}

export const totalNumberOfMonthApproachService = async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

    const totalNumberOfMonthApproach = await PatientModel.find({
      $expr: {
        $eq: [{ $month: '$registeredDate' }, currentMonth],
      },
    });

    return totalNumberOfMonthApproach.length;
  } catch (error) {
    console.error('Error while getting the total number of approaches for the month:', error);
    throw error;
  }
};


export const findPendingCasesMoreThan5DaysService = async () => {
  try {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const pendingCases = await PatientModel.find({
      status: 'Patient Registered', // Assuming 'Patient Registered' is your pending status
      registeredDate: { $lte: fiveDaysAgo },
    });

    // Log the pending cases open for more than 5 days
    // console.log('Pending cases open for more than 5 days:', pendingCases);

    return pendingCases.length;
  } catch (error) {
    console.error('Error fetching pending cases:', error);
    throw error;
  }
};




//Operator Dashboards
export const operatorDetailsBasedOnStatusService = async (phoneNumber) => {
  try {

    //Pending cases by operator
    const pendingPatients = await PatientModel.find({
      createdBy: phoneNumber,
      status: 'Patient Registered'
    })
    const pendingPatientsCount = pendingPatients.length


    //Documents uploaded by operetor 
    const uploadDocuments = await PatientModel.find({
      createdBy: phoneNumber,
      status: 'Documents Uploaded'
    })
    const uploadDocumentsCount = uploadDocuments.length


    //hospital and scheme by operetor 
    const hospitalAndScheme = await PatientModel.find({
      createdBy: phoneNumber,
      status: 'Scheme & Hospital Selected'
    })
    const hospitalAndSchemeCount = hospitalAndScheme.length


    //close patients by operator
    const closePatientDetails = await PatientModel.find({
      createdBy: phoneNumber,
      status: ['Closed-Patient Rejected',
        'Closed-Civil Hospital',
        'Closed-Ayushman Bharat',
        'Closed-Private Hospital',
        'Closed-MJPJA',
        'Closed-Other']
    })
    const closePatientDetailsCount = closePatientDetails.length


  
  

    console.log("res" , getThisMonthTotalAmountOperatorService);


    const allDataResponse = [...pendingPatients, ...uploadDocuments, ...hospitalAndScheme, ...closePatientDetails ]
    // console.log("alll data===>", allDataResponse);

    const response = {
      pendingPatientsCount: pendingPatientsCount,
      uploadDocumentsCount: uploadDocumentsCount,
      hospitalAndSchemeCount: hospitalAndSchemeCount,
      closePatientDetailsCount: closePatientDetailsCount,
      getThisMonthTotalAmountOperatorService : getThisMonthTotalAmountOperatorService,
      allDataResponse: allDataResponse
    }
    return response;

  } catch (error) {
    console.error('Error fetching Details:', error);
    throw error;
  }
}


//getThisMonthTotalAmountOperatorService
export const getThisMonthTotalAmountOperatorService = async (phoneNumber) => {
  try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based in JavaScript

      const result = await PatientModel.aggregate([
          {
              $match: {
                  $expr: {
                      $and: [
                          { $eq: [{ $month: '$registeredDate' }, currentMonth] },
                          { $eq: ['$createdBy', phoneNumber] },
                      ],
                  },
              },
          },
          {
              $group: {
                  _id: null,
                  amountSaved: { $sum: { $toInt: '$amountSaved' } },
              },
          },
      ]);

      if (result.length > 0) {
          const monthAmount = result[0].amountSaved;
          // console.log('Total Amount for the current month:', monthAmount);
          return monthAmount;
      } else {
          console.log('No records found for the current month.');
          return 0;
      }
  } catch (error) {
      console.error('Error fetching total amount for the current month:', error);
      throw error;
  }
};



//get total amount
export const getTotalAmountSavedOperatorService = async (phoneNumber) => {
  try {
      const result = await PatientModel.aggregate([
          {
              $match: {
                  createdBy: phoneNumber,
              },
          },
          {
              $group: {
                  _id: null,
                  amountSaved: { $sum: { $toInt: '$amountSaved' } },
              },
          },
      ]);

      if (result.length > 0) {
          const totalAmount = result[0].amountSaved;
          // console.log('Total Amount till date:', totalAmount);
          return totalAmount;
      } else {
          console.log('No records found.');
          return 0;
      }
  } catch (error) {
      console.error('Error fetching total amount till date:', error);
      throw error;
  }
};
