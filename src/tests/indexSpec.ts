import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('images api', (): void => {
    it('/api/images?filename=cat', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
            '/api/images?filename=cat'
        );

        expect(response.status).toBe(200);
    });


})

