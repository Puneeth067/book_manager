import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Default cover image URL (you can host this image or use a placeholder service)
const DEFAULT_COVER_IMAGE = 'https://placehold.co/300x400?text=No+Cover+Image';

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    // Ensure all books have a cover_image value
    const booksWithCovers = books.map(book => ({
      ...book,
      cover_image: book.cover_image || DEFAULT_COVER_IMAGE
    }));

    res.json({ books: booksWithCovers });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await prisma.book.findFirst({
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Ensure book has a cover_image value
    const bookWithCover = {
      ...book,
      cover_image: book.cover_image || DEFAULT_COVER_IMAGE
    };

    res.json({ book: bookWithCover });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, description, cover_image } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    // Validate cover_image URL if provided
    let validCoverImage = cover_image;
    if (cover_image && !isValidUrl(cover_image)) {
      validCoverImage = DEFAULT_COVER_IMAGE;
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description: description || '',
        cover_image: validCoverImage || DEFAULT_COVER_IMAGE,
        userId: req.user.id
      }
    });

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, cover_image } = req.body;

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Validation
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    // Validate cover_image URL if provided
    let validCoverImage = cover_image;
    if (cover_image && !isValidUrl(cover_image)) {
      validCoverImage = existingBook.cover_image || DEFAULT_COVER_IMAGE;
    }

    const updateData = {
      title,
      author,
      description: description || ''
    };

    // Only update cover_image if it's provided
    if (cover_image !== undefined) {
      updateData.cover_image = validCoverImage || DEFAULT_COVER_IMAGE;
    }

    const book = await prisma.book.update({
      where: { id },
      data: updateData
    });

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await prisma.book.delete({
      where: { id }
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Utility function to validate URL
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}