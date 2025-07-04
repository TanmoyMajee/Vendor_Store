import { connectToDatabase } from '../../../lib/db';
import vendorModel from '@/model/vendorModel';
import { z } from 'zod';

const vendorSchema = z.object({
  vendorName: z.string().min(1, "Vendor Name is required"),
  bankAccountNo: z.string().min(1, "Bank Account No. is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  addressLine1: z.string().optional(),
  addressLine2: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

// Get all vendors
export async function GET() {
try {
  await connectToDatabase();
  const allVendors = await vendorModel.find({});
  return Response.json(allVendors);
} catch (error) {
  return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
}
}


export async function POST(request) {
try {
  await connectToDatabase();
  const data = await request.json();

  const result = vendorSchema.safeParse(data);
  if (!result.success) {
    return Response.json( {msg:'validation error'}, { error: result.error.errors }, { status: 400 } );
  }

  const newVendor = await vendorModel.create(result.data);
  return Response.json(newVendor, { status: 201 });
} catch (error) {
  return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
}
}