
// ===== backend/routes/books.js =====
import express from 'express';
import { 
  getBooks, 
  getBook, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/bookController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All book routes require authentication
router.use(authenticateUser);

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;