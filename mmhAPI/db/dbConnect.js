import mongoose from 'mongoose';

let dbConnect = async (dburl, dbname) => {
    try {
        await mongoose.connect(dburl+ dbname)
        console.log('connected to db ');

    } catch (error) {
        console.log(error);
    }
}


export { dbConnect } 







