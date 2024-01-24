import PatientModel from '../models/patientModel.js'
import {
getTotalAmountService,
getThisMonthTotalAmountService,
totalNumberOfCaseCloseService,
totalNumberOfCaseCloseInMonthService,
totalNumberOfApproachService, totalNumberOfMonthApproachService,
findPendingCasesMoreThan5DaysService,
operatorDetailsBasedOnStatusService,
getTotalAmountGivenByMMHService,
getThisMonthTotalAmountOperatorService,
getTotalAmountSavedOperatorService
} from '../services/dashboardService.js'

export const dashboardController = async (req, res) => {

    try {
        const totalAmountSaved = await getTotalAmountService()
        // console.log(" Total  Amount saved ===>" ,totalAmountSaved);

        const monthAmountSaved = await getThisMonthTotalAmountService()
        // console.log( " Total month Amount Saved ===>" ,monthAmountSaved);


        const totalClosedCases = await totalNumberOfCaseCloseService()
        // console.log(totalClosedCases);


        const totalClosedCasesInMonth = await totalNumberOfCaseCloseInMonthService()
        // console.log("totalClosedCasesInMonth ===>" , totalClosedCasesInMonth);


        const totalNumberOfApproach = await totalNumberOfApproachService()
        // console.log("approach ===>",totalNumberOfApproach);


        const totalNumberOfMonthApproach = await totalNumberOfMonthApproachService()
        // console.log("month ===>",totalNumberOfMonthApproach);


        const PendingCasesMoreThan5Days = await findPendingCasesMoreThan5DaysService()
        // console.log("findPendingCasesMoreThan5DaysService==>" , findPendingCasesMoreThan5Days);


        const getTotalAmountGivenByMMH = await getTotalAmountGivenByMMHService();
        // console.log("getTotalAmountGivenByMMH===>" , getTotalAmountGivenByMM);


        res.status(200).json({
            success: true,
            totalAmountSaved: totalAmountSaved,
            getTotalAmountGivenByMMH:getTotalAmountGivenByMMH,
            monthAmountSaved: monthAmountSaved,
            totalClosedCases: totalClosedCases,
            totalClosedCasesInMonth: totalClosedCasesInMonth,
            totalNumberOfApproach: totalNumberOfApproach,
            totalNumberOfMonthApproach: totalNumberOfMonthApproach,
            PendingCasesMoreThan5Days: PendingCasesMoreThan5Days

        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error While Getting the result",
            error: error.message
        })
    }
}



export const dashboardOperatorDetailsController = async (req, res) => {

    try {
         const {phoneNumber} = req.query
        //  console.log( "number ==> cont " ,phoneNumber);
         const details = await operatorDetailsBasedOnStatusService(phoneNumber)

         const monthsAmountSavedDetails = await getThisMonthTotalAmountOperatorService(phoneNumber)
         const totalAmountSavedDetails = await getTotalAmountSavedOperatorService(phoneNumber)

         res.status(200).json({
            success: true,
            details,
            monthsAmountSavedDetails,
            totalAmountSavedDetails
         })

        } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error While Getting the result",
            error: error.message
        })
    }


    // http://localhost:4000/mmh/dashboard/operator?createdBy=8888888888
    // http://localhost:4000/mmh/dashboard/operator?createdBy=8888888888&status=Closed-Civil
}
