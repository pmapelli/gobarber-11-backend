import { Router } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordService = new ResetPasswordService();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordService.create);

export default passwordRouter;
