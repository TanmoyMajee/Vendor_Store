import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Bank_Account_No: { type: Number, required: true },
  Bank_Name :  { type: String, required: true },
  Address_Line_1:{type: String},
  Address_Line_2:{type: String,required:true},
  City:{type: String},
   Country:{type: String},
    Zip_Code:{type: String},
  // add more fields as needed
});


VendorSchema.index({ Bank_Account_No: 1, Bank_Name: 1 }, { unique: true });


export default mongoose.models.Product || mongoose.model('vendor', VendorSchema);