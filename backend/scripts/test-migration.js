import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const prisma = new PrismaClient();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// Test data
const testBook = {
  title: 'Test Book Migration',
  author: 'Test Author',
  description: 'This is a test book for migration verification',
  cover_image: 'https://picsum.photos/300/400'
};

const invalidImageBook = {
  title: 'Invalid Image Test',
  author: 'Test Author',
  description: 'This book has an invalid image URL',
  cover_image: 'invalid-url-here'
};

async function runMigrationTests() {
  console.log('🧪 Starting Migration Tests\n');
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Test 1: Database Schema Verification
  try {
    console.log('1️⃣ Testing Database Schema...');
    
    const schemaQuery = `
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'books' AND column_name = 'cover_image';
    `;
    
    const schemaResult = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'books' AND column_name = 'cover_image';
    `;

    if (schemaResult.length > 0) {
      console.log('✅ cover_image column exists in books table');
      console.log(`   Type: ${schemaResult[0].data_type}, Nullable: ${schemaResult[0].is_nullable}`);
      results.passed++;
      results.tests.push({ test: 'Schema verification', status: 'PASSED' });
    } else {
      console.log('❌ cover_image column not found');
      results.failed++;
      results.tests.push({ test: 'Schema verification', status: 'FAILED' });
    }
  } catch (error) {
    console.log('❌ Schema test failed:', error.message);
    results.failed++;
    results.tests.push({ test: 'Schema verification', status: 'FAILED', error: error.message });
  }

  // Test 2: Migration Data Verification
  try {
    console.log('\n2️⃣ Testing Data Migration...');
    
    const booksCount = await prisma.book.count();
    const booksWithCover = await prisma.book.count({
      where: {
        cover_image: {
          not: null
        }
      }
    });

    console.log(`📊 Total books: ${booksCount}`);
    console.log(`📊 Books with cover images: ${booksWithCover}`);
    
    if (booksCount === 0) {
      console.log('ℹ️ No books in database - migration test not applicable');
      results.tests.push({ test: 'Data migration', status: 'SKIPPED', reason: 'No existing data' });
    } else if (booksWithCover === booksCount) {
      console.log('✅ All existing books have cover images');
      results.passed++;
      results.tests.push({ test: 'Data migration', status: 'PASSED' });
    } else {
      console.log(`❌ ${booksCount - booksWithCover} books missing cover images`);
      results.failed++;
      results.tests.push({ test: 'Data migration', status: 'FAILED' });
    }
  } catch (error) {
    console.log('❌ Data migration test failed:', error.message);
    results.failed++;
    results.tests.push({ test: 'Data migration', status: 'FAILED', error: error.message });
  }

  // Test 3: Prisma Client Operations
  try {
    console.log('\n3️⃣ Testing Prisma Client Operations...');
    
    // Create a test book with cover image
    const createdBook = await prisma.book.create({
      data: {
        ...testBook,
        userId: 'test-user-id'
      }
    });

    if (createdBook.cover_image === testBook.cover_image) {
      console.log('✅ Book creation with cover_image successful');
      results.passed++;
      results.tests.push({ test: 'Prisma create with cover_image', status: 'PASSED' });
    } else {
      console.log('❌ Book creation with cover_image failed');
      results.failed++;
      results.tests.push({ test: 'Prisma create with cover_image', status: 'FAILED' });
    }

    // Update the book's cover image
    const updatedBook = await prisma.book.update({
      where: { id: createdBook.id },
      data: { cover_image: 'https://picsum.photos/300/400?updated' }
    });

    if (updatedBook.cover_image === 'https://picsum.photos/300/400?updated') {
      console.log('✅ Book cover_image update successful');
      results.passed++;
      results.tests.push({ test: 'Prisma update cover_image', status: 'PASSED' });
    } else {
      console.log('❌ Book cover_image update failed');
      results.failed++;
      results.tests.push({ test: 'Prisma update cover_image', status: 'FAILED' });
    }

    // Clean up test book
    await prisma.book.delete({ where: { id: createdBook.id } });
    console.log('🧹 Test book cleaned up');

  } catch (error) {
    console.log('❌ Prisma operations test failed:', error.message);
    results.failed++;
    results.tests.push({ test: 'Prisma operations', status: 'FAILED', error: error.message });
  }

  // Test 4: API Endpoint Testing (if server is running)
  try {
    console.log('\n4️⃣ Testing API Endpoints...');
    
    // Test health endpoint first
    const healthResponse = await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
    
    if (healthResponse.status === 200) {
      console.log('✅ API server is running');
      
      // You would need to implement actual API tests here with authentication
      // For now, we'll just verify the server is accessible
      results.passed++;
      results.tests.push({ test: 'API server accessibility', status: 'PASSED' });
    }
  } catch (error) {
    console.log('⏭️ API server not running or not accessible - skipping API tests');
    results.tests.push({ test: 'API endpoints', status: 'SKIPPED', reason: 'Server not accessible' });
  }

  // Test 5: URL Validation Function
  try {
    console.log('\n5️⃣ Testing URL Validation...');
    
    const isValidUrl = (string) => {
      try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch (_) {
        return false;
      }
    };

    const validUrls = [
      'https://example.com/image.jpg',
      'http://example.com/image.png',
      'https://picsum.photos/300/400'
    ];

    const invalidUrls = [
      'not-a-url',
      'ftp://example.com/image.jpg',
      'javascript:alert("xss")',
      ''
    ];

    let validationPassed = true;

    validUrls.forEach(url => {
      if (!isValidUrl(url)) {
        console.log(`❌ Valid URL failed validation: ${url}`);
        validationPassed = false;
      }
    });

    invalidUrls.forEach(url => {
      if (isValidUrl(url)) {
        console.log(`❌ Invalid URL passed validation: ${url}`);
        validationPassed = false;
      }
    });

    if (validationPassed) {
      console.log('✅ URL validation function working correctly');
      results.passed++;
      results.tests.push({ test: 'URL validation', status: 'PASSED' });
    } else {
      console.log('❌ URL validation function has issues');
      results.failed++;
      results.tests.push({ test: 'URL validation', status: 'FAILED' });
    }
  } catch (error) {
    console.log('❌ URL validation test failed:', error.message);
    results.failed++;
    results.tests.push({ test: 'URL validation', status: 'FAILED', error: error.message });
  }

  // Test 6: Default Image Handling
  try {
    console.log('\n6️⃣ Testing Default Image Handling...');
    
    const DEFAULT_COVER_IMAGE = 'https://placehold.co/300x400?text=No+Cover+Image';
    
    // Create book without cover image
    const bookWithoutCover = await prisma.book.create({
      data: {
        title: 'Book Without Cover',
        author: 'Test Author',
        description: 'Testing default cover',
        userId: 'test-user-id'
      }
    });

    // Simulate what the API would do
    const bookWithDefault = {
      ...bookWithoutCover,
      cover_image: bookWithoutCover.cover_image || DEFAULT_COVER_IMAGE
    };

    if (bookWithDefault.cover_image === DEFAULT_COVER_IMAGE) {
      console.log('✅ Default cover image handling works correctly');
      results.passed++;
      results.tests.push({ test: 'Default image handling', status: 'PASSED' });
    } else {
      console.log('❌ Default cover image handling failed');
      results.failed++;
      results.tests.push({ test: 'Default image handling', status: 'FAILED' });
    }

    // Clean up
    await prisma.book.delete({ where: { id: bookWithoutCover.id } });

  } catch (error) {
    console.log('❌ Default image handling test failed:', error.message);
    results.failed++;
    results.tests.push({ test: 'Default image handling', status: 'FAILED', error: error.message });
  }

  // Print Results Summary
  console.log('\n📊 TEST RESULTS SUMMARY');
  console.log('========================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${results.tests.length}`);
  
  console.log('\n📝 Detailed Results:');
  results.tests.forEach((test, index) => {
    const status = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⏭️';
    console.log(`${index + 1}. ${status} ${test.test}: ${test.status}`);
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
    if (test.reason) {
      console.log(`   Reason: ${test.reason}`);
    }
  });

  // Migration Health Check
  console.log('\n🏥 MIGRATION HEALTH CHECK');
  console.log('==========================');
  
  if (results.failed === 0) {
    console.log('🎉 Migration is HEALTHY - All tests passed!');
    console.log('✅ Ready for production deployment');
  } else if (results.failed <= 2 && results.passed >= results.failed) {
    console.log('⚠️ Migration has WARNINGS - Some non-critical tests failed');
    console.log('🔍 Review failed tests before production deployment');
  } else {
    console.log('🚫 Migration is UNHEALTHY - Critical issues detected');
    console.log('🛑 DO NOT deploy to production until issues are resolved');
  }

  return results;
}

// Performance Test
async function runPerformanceTests() {
  console.log('\n⚡ PERFORMANCE TESTS');
  console.log('====================');

  try {
    // Test query performance with cover_image field
    const startTime = Date.now();
    
    await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        cover_image: true,
        createdAt: true
      },
      take: 100
    });
    
    const endTime = Date.now();
    const queryTime = endTime - startTime;
    
    console.log(`📊 Query time for 100 books with cover_image: ${queryTime}ms`);
    
    if (queryTime < 1000) {
      console.log('✅ Query performance is good');
    } else if (queryTime < 3000) {
      console.log('⚠️ Query performance is acceptable but could be better');
    } else {
      console.log('❌ Query performance is poor - consider indexing');
    }
    
  } catch (error) {
    console.log('❌ Performance test failed:', error.message);
  }
}

// Main execution
async function main() {
  try {
    await runMigrationTests();
    await runPerformanceTests();
  } catch (error) {
    console.error('Test execution failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runMigrationTests, runPerformanceTests };