import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function rollbackCoverImages() {
  console.log('🔄 Starting cover image rollback...');
  
  try {
    // Get all books with the default cover image
    const booksWithDefaultCover = await prisma.book.findMany({
      where: {
        cover_image: 'https://placehold.co/300x400?text=No+Cover+Image'
      }
    });

    console.log(`📚 Found ${booksWithDefaultCover.length} books with default cover images`);

    if (booksWithDefaultCover.length === 0) {
      console.log('✅ No books to rollback. Process complete!');
      return;
    }

    // Set cover_image to null for these books
    const result = await prisma.book.updateMany({
      where: {
        cover_image: 'https://placehold.co/300x400?text=No+Cover+Image'
      },
      data: {
        cover_image: null
      }
    });

    console.log('🎉 Rollback completed successfully!');
    console.log(`📊 Total books rolled back: ${result.count}`);

  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run rollback
if (import.meta.url === `file://${process.argv[1]}`) {
  rollbackCoverImages()
    .catch((error) => {
      console.error('Rollback script failed:', error);
      process.exit(1);
    });
}

export default rollbackCoverImages;