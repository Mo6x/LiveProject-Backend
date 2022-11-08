import 'dotenv/config';
import app from '../app';
import supertest from 'supertest';
import db from '../config/database.config';
const request = supertest(app);
beforeAll(async () => {
  await db
    .sync({ force: true })
    .then(() => {
      console.log('database connected successfully');
    })
    .catch((err) => {
      console.log(err);
    });
});
jest.setTimeout(30000);
describe('account test', () => {
  it('create account successfully', async () => {
    const response = await request.post('/account/createaccount').send({
      bankName: 'Access',
      accountNumber: '0036123445',
      accountName: 'podf',
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully created an account');
    expect(response.body).toHaveProperty('record');
    });
    it(' Successfully get bank accounts ', async () => {
        const response = await request.get('/account/getaccount');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successfully retrieved all accounts');
        expect(response.body).toHaveProperty('record');
        });
        it(' Successfully get bank accounts by id ', async () => {
            const response = await request.get('/account/getaccount/1');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully retrieved account');
            expect(response.body).toHaveProperty('record');
            }
            );
            it('Successfully Delete bank account', async () => {
                const response = await request.delete('/account/deleteaccount/1');
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Successfully deleted account');
                expect(response.body).toHaveProperty('record');
                }
                );
});
