import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const DEFAULT_COVER_IMAGE = 'https://placehold.co/300x400?text=No+Cover+Image';

async function migrateCoverImages() {
  console.log(' Starting cover image migration...');
  
  try {
    // Get all books without cover_image
    const booksWithoutCover = await prisma.book.findMany({
      where: {
        cover_image: null
      }
    });

    console.log(` Found ${booksWithoutCover.length} books without cover images`);

    if (booksWithoutCover.length === 0) {
      console.log(' All books already have cover images. Migration complete!');
      return;
    }

    // Update books in batches to avoid overwhelming the database
    const batchSize = 50;
    let updatedCount = 0;

    for (let i = 0; i < booksWithoutCover.length; i += batchSize) {
      const batch = booksWithoutCover.slice(i, i + batchSize);
      
      console.log(` Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(booksWithoutCover.length / batchSize)}`);

      // Update each book in the batch
      const updatePromises = batch.map(book => 
        prisma.book.update({
          where: { id: book.id },
          data: { cover_image: DEFAULT_COVER_IMAGE }
        })
      );

      await Promise.all(updatePromises);
      updatedCount += batch.length;

      console.log(` Updated ${updatedCount}/${booksWithoutCover.length} books`);
    }

    console.log(' Migration completed successfully!');
    console.log(` Total books updated: ${updatedCount}`);

  } catch (error) {
    console.error(' Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateCoverImages()
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export default migrateCoverImages;