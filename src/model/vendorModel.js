import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  Bank_Account_No: { type: Number, required: true },
  Bank_Name: { type: String, required: true, index: true },
  Address_Line_1: { type: String },
  Address_Line_2: { type: String, required: true },
  City: { type: String, index: true },
  Country: { type: String },
  Zip_Code: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Compound index for unique bank account and bank name combination
VendorSchema.index({ Bank_Account_No: 1, Bank_Name: 1 }, { unique: true });

// Text index for search functionality
VendorSchema.index({ 
  name: 'text', 
  Bank_Name: 'text', 
  City: 'text' 
});

export default mongoose.models.vendor || mongoose.model('vendor', VendorSchema);