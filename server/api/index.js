import { Router } from 'express'

import users from './users'
import polls from './polls'

const router = Router()

// Add USERS Routes
router.use(users)

// Add Polls Routes
router.use(polls)

export default router
