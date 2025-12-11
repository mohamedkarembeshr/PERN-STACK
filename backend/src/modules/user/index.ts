/**
 * User Module Entry Point
 *
 * This file exports the main classes for the user module:
 * - UserService: Business logic layer
 * - User: Database model
 * - userRoutes: Express router instance
 *
 * DEPENDENCY INJECTION PATTERN:
 * We instantiate dependencies here (composition root) rather than inside classes because:
 *
 * 1. LOOSE COUPLING - Classes don't know how their dependencies are created
 * 2. TESTABILITY - Easy to mock dependencies in unit tests by injecting mocks
 * 3. FLEXIBILITY - Can swap implementations without changing class code
 * 4. SINGLE RESPONSIBILITY - Each class focuses on its own logic, not instantiation
 *
 * INJECTION CHAIN (within module):
 * UserRepository → UserService → UserController → UserRoutes
 *
 * Each layer only knows about the layer directly below it:
 * - Repository: Only injected into Service (NEVER exposed outside module)
 * - Service: Only injected into Controller
 * - Controller: Only injected into Routes
 *
 * CROSS-MODULE INJECTION:
 * - Service is the ONLY class allowed to be injected into other modules' services
 * - Example: If OrderService needs user functionality, inject UserService into OrderService
 * - NEVER inject Repository, Controller, or Routes into other modules
 */

import User from './user.model';
import UserRepository from './user.repo';
import UserRoutes from './user.routes';
import UserService from './user.services';
import UserController from './usercontroller';

// Create instances with dependency injection
// Repository handles database operations
const userRepository = new UserRepository();

// Service handles business logic, receives repository via constructor
const userService = new UserService(userRepository);

// Controller handles HTTP request/response, receives service via constructor
const userController = new UserController(userService);

// Routes define API endpoints, receives controller via constructor
const userRoutesInstance = new UserRoutes(userController);

// Export the router for use in routes.index.ts
export const userRoutes = userRoutesInstance.router;

// Export classes for external use
export { User, UserService };
