import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ books });
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

    res.json({ book });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description: description || '',
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
    const { title, author, description } = req.body;

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

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        description: description || ''
      }
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
