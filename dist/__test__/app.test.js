"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("../app"));
// import bcrypt from 'bcryptjs';
const supertest_1 = __importDefault(require("supertest"));
// import { UserInstance } from '../models/userModel';
const database_config_1 = __importDefault(require("../config/database.config"));
const request = (0, supertest_1.default)(app_1.default);
// jest.setTimeout(100000);
beforeAll(async () => {
    await database_config_1.default.sync({ force: true }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Database connected successfully to test');
    });
});
describe('it should test our user apis', () => {
    it('should create a user', async () => {
        const response = await request.post('/users/register').send({
            firstName: 'Imeh',
            lastName: 'Usoro',
            username: 'iusoro',
            email: 'imeu@gmail.com',
            phoneNumber: '09093215044',
            password: '1111',
            confirmPassword: '1111',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('user created successfully');
        expect(response.body).toHaveProperty('record');
    });
    // Login with email
    it('should login a user with email', async () => {
        const response = await request.post('/users/login').send({
            email: 'imeu@gmail.com',
            password: '1111',
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('User');
    });
    // Login with username
    it('should login a user with email', async () => {
        const response = await request.post('/users/login').send({
            username: 'iusoro',
            password: '1111',
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('User');
    });
    // verifyUser
    it('should verify a user', async () => {
        const response = await request.post('/users/register').send({
            firstName: 'Imeh',
            lastName: 'Usoro',
            username: 'iiiusoro',
            email: 'imeuiis@gmail.com',
            phoneNumber: '09093215063',
            password: '1111',
            confirmPassword: '1111',
        });
        const token = response.body.token;
        const response2 = await request.get(`/users/verify/${token}`);
        expect(response2.status).toBe(302);
    });
    it('should check if verification email is sent', async () => {
        const response = await request.post('/users/forgotpassword').send({
            email: 'imeuiis@gmail.com',
        });
        expect(response.status).toBe(200);
    });
    it('should change user password', async () => {
        const response = await request.post('/users/login').send({
            username: 'iusoro',
            password: '1111',
        });
        const { id } = response.body.User;
        const response2 = await request.patch(`/users/change-password/${id}`).send({
            password: '12345',
            confirmPassword: '12345',
        });
        expect(response2.status).toBe(200);
    });
});
