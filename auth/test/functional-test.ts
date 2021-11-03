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
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["username is required"]
                    })
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
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["password is required"]
                    })
                });
        });

        it('should failed because of password should be less then 10 characters', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: 'password32123111111'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["password should be less then 10 characters"]
                    })
                });
        });

        it('should failed because of password should be more then 4 characters', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: '1'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["password should be more then 4 characters"]
                    })
                });
        });

        it('should failed because of username should start from letter', () => {
            return request(app.getHttpServer())
                .post('/register')
                .send({
                    username: 'john',
                    password: '1'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["username should start from letter"]
                    })
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
                    const accessToken = res.body.accessToken;
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
                        message: ["username already exists"]
                    })
                });
        });
    });

	describe('/login (POST)', () => {
        it('should failed because of username is required', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    password: 'password'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["username is required"]
                    })
                });
        });

        it('should failed because of password is required', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'john'
                })
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["password is required"]
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
                .expect(404)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 400,
                        error: "Bad Request",
                        message: ["username or password is incorrect"]
                    })
                });
        });

        it('should failed because of incorrect credentials(password)', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    username: 'paul',
                    password: 'test'
                })
                .expect(404)
                .expect(function (res) {
                    expect(res.body).toEqual({
                        statusCode: 404,
                        error: "Not Found",
                        message: ["username or password is incorrect"]
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