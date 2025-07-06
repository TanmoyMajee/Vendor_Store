import { connectToDatabase } from '../../../lib/db';
import vendorModel from '@/model/vendorModel';
import { z } from 'zod';

const vendorSchema = z.object({
  name: z.string().min(1, "Vendor Name is required"),
  Bank_Account_No: z.number().min(1, "Bank Account No. is required"),
  Bank_Name: z.string().min(1, "Bank Name is required"),
  Address_Line_1: z.string().optional(),
  Address_Line_2: z.string().min(1, "Address Line 2 is required"),
  City: z.string().optional(),
  Country: z.string().optional(),
  Zip_Code: z.string().optional(),
});

export async function GET(request) {
  try {
    // Check authentication
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');

    if (!userId || !userEmail) {
      return Response.json(
        { error: 'Authentication required', message: 'User not authenticated' },
        { status: 401 }
      );
    }

    console.log('✅ User authenticated:', userEmail);
    await connectToDatabase();

    // Extract pagination params from the request URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 6;
    const skip = (page - 1) * limit;

    // Simple pagination, no search
    const [vendors, total] = await Promise.all([
      vendorModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      vendorModel.countDocuments()
    ]);

    return Response.json({
      vendors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Check authentication
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');

    if (!userId || !userEmail) {
      return Response.json(
        { error: 'Authentication required', message: 'User not authenticated' },
        { status: 401 }
      );
    }

    console.log('�� User authenticated:', userEmail);
    await connectToDatabase();
    const data = await request.json();

    const result = vendorSchema.safeParse(data);
    if (!result.success) {
      return Response.json({
        msg: 'validation error',
        error: result.error.errors
      }, { status: 400 });
    }

    const newVendor = await vendorModel.create(result.data);
    return Response.json(newVendor, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}