import { connectToDatabase } from '@/lib/db';
import vendorModel from '@/model/vendorModel';
import { z } from 'zod';

// Zod schema for validation (adjust field names to match your model)
const vendorSchema = z.object({
  name: z.string().min(1, "Vendor Name is required"),
  Bank_Account_No: z.number({ invalid_type_error: "Bank Account No. must be a number" }),
  Bank_Name: z.string().min(1, "Bank Name is required"),
  Address_Line_1: z.string().optional(),
  Address_Line_2: z.string().min(1, "Address Line 2 is required"),
  City: z.string().optional(),
  Country: z.string().optional(),
  Zip_Code: z.string().optional(),
});

// GET /api/vendor/[id]
export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const vendor = await vendorModel.findById(id);
    if (!vendor) {
      return Response.json({ error: 'Vendor not found' }, { status: 404 });
    }
    return Response.json(vendor);
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/vendor/[id]
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const data = await request.json();
    // Validate input
    const result = vendorSchema.safeParse(data);
    if (!result.success) {
      return Response.json({ error: result.error.errors }, { status: 400 });
    }
    const updatedVendor = await vendorModel.findByIdAndUpdate(id, result.data, { new: true });
    if (!updatedVendor) {
      return Response.json({ error: 'Vendor not found' }, { status: 404 });
    }
    return Response.json(updatedVendor);
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/vendor/[id]
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const result = await vendorModel.findByIdAndDelete(id);
    if (!result) {
      return Response.json({ error: 'Vendor not found' }, { status: 404 });
    }
    return Response.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}