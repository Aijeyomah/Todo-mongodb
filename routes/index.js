import { Router } from 'express';
import { register } from "../controllers/user";

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({message: "Welcome to Todo"})
});

router.post('/register', register);

export default router;
