import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('auth service functional', () => {
	let app: INestApplication;

    beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	describe('/register (POST)', () => {
        it('should failed because of username is required', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    password: 'password'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Bad Request');
                    expect(res.body.message).toContain('username must be a string');
                });
        });

        it('should failed because of password is required', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Bad Request');
                    expect(res.body.message).toContain('password must be a string');
                });
        });

        it('should failed because of password must be less than 10 characters', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: 'password32123111111'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Bad Request');
                    expect(res.body.message).toContain('password must be less than 10 characters');
                });
        });

        it('should failed because of password must be more than 4 characters', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: '1'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Bad Request');
                    expect(res.body.message).toContain('password must be more than 4 characters');
                });
        });

        it('should failed because of username must start from letter', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: '1john',
                    password: '13'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Bad Request');
                    expect(res.body.message).toContain('username must start from letter');
                });
        });

        it('should register and return accessToken', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: 'password'
                })
                .expect(200)
                .expect(function (res) {
                    const accessToken = res.body.access_token;
                    const parsedJWT = parseJwt(accessToken);
                    expect(parsedJWT.exp).toBeTruthy();
                    expect(accessToken).toBeTruthy();
                });
        });

        it('should failed because of username duplication', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: 'password'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: "username already exists"
                    })
                });
        });
    });

	describe('/login (POST)', () => {
        it('should failed because of incorrect credentials(lack of username)', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    password: 'password'
                })
                .expect(401)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 401,
                        message: 'Unauthorized'
                    })
                });
        });

        it('should failed because of incorrect credentials(lack of password)', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'john'
                })
                .expect(401)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 401,
                        message: 'Unauthorized'
                    })
                });
        });

        it('should failed because of incorrect credentials(username)', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'notExistingUserName',
                    password: 'test'
                })
                .expect(401)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 401,
                        message: 'Unauthorized'
                    })
                });
        });

        it('should failed because of incorrect credentials(password)', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'paul',
                    password: 'incorrectPassword'
                })
                .expect(401)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 401,
                        message: 'Unauthorized'
                    })
                });
        });

        it('success login, should return access token with exp time', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'paul',
                    password: 'test'
                })
                .expect(200)
                .expect(function (res) {
                    const accessToken = res.body.access_token;
                    const parsedJWT = parseJwt(accessToken);
                    expect(parsedJWT.exp).toBeTruthy();
                    expect(accessToken).toBeTruthy();
                });
        });
    });
    // TODO move to end-to-end testing
	describe('/logout (POST)', () => {
	    it('should return 200', () => {
            return request(app.getHttpServer())
                .post('/logout')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTYzMzUxMjIxNSwiZXhwIjoxNjMzNTEyMjc1fQ.YidKXBskDx4na6Wl-8D7osDs6DuAfA3VkLNMhDExutE')
                .expect(200)
        });
    })
});

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}