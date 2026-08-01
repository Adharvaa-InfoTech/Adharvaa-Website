import { NextResponse } from 'next/server';
import { getGalleryFolders } from '@/lib/cloudinary';

export async function GET() {
  try {
    const folders = await getGalleryFolders();
    return NextResponse.json(folders || []);
  } catch (error) {
    console.error('Error fetching gallery folders:', error);
    return NextResponse.json([]);
  }
}
