import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables defined in .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // 1. Get the form data (file)
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // 2. Convert file to a buffer for Cloudinary streaming
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Upload to Cloudinary using a Promise wrapper
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: 'image', 
          folder: 'skyfly_blogs', // Save to a specific folder in Cloudinary
          tags: ['blog-post']
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      // End the stream with the file buffer
      uploadStream.end(buffer);
    });

    // 4. Return the secure URL and public ID
    return NextResponse.json({ 
      imageUrl: result.secure_url,
      publicId: result.public_id 
    }, { status: 200 });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image to Cloudinary.' }, { status: 500 });
  }
}
