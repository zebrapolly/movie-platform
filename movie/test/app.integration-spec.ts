import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { emptyDb, fillDb } from './fill-db';
import { Connection, getConnectionManager } from 'typeorm';
import typeormConfig = require('../src/config/typeorm.config');
import * as faker from 'faker';
import { genre3, movie1, movie2, movie3, person2, role1 } from './datasets';

describe('Movie api integration', () => {
	let app: INestApplication;
	const token =
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiJjZDU4MDI2OS01ODMwLTRiN2QtOTU1ZC04MDRiYjQ5MTlkMDkiLCJpYXQiOjE2MzYxODA2NTMsImV4cCI6MTYzNjE4MDcxM30.y0f3HgoxloQFSI4xYvVdh2H731Ii5KnDVY-blR5NvNA';
	let connection: Connection;
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		const connectionManager = getConnectionManager();
		connection = connectionManager.create({
			...typeormConfig,
			name: 'testing',
		});
		await connection.connect();
	});

	afterEach(async () => {
		await connection.close();
	});

	describe.skip('genres', () => {
		it('should create genre', () => {
			return request(app.getHttpServer())
				.post('/genres')
				.set('Authorization', token)
				.expect(200);
		});
		it('/genres (GET)', () => {
			return request(app.getHttpServer())
				.get('/genres')
				.set('Authorization', token)
				.expect(200);
		});
	});

	describe('movies', () => {
		beforeEach(async () => {
			await fillDb(connection);
		});
		afterEach(async () => {
			await emptyDb(connection);
		});
		it('/movies (GET) all movies', () => {
			return request(app.getHttpServer())
				.get('/movies')
				.set('Authorization', token)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(3);
				});
		});
		it('/movies (POST)', () => {
			const payload = {
				title: faker.lorem.word(),
				synopsis: faker.lorem.text(500),
				releaseDate: faker.date.past().toISOString(),
				people: [
					{
						roleId: role1.id,
						personId: person2.id,
					},
				],
				genres: [
					{
						id: genre3.id,
					},
				],
			};
			return request(app.getHttpServer())
				.post('/movies')
				.set('Authorization', token)
				.send(payload)
				.expect(200)
				.expect(function (res) {
					expect(res.body).toBeTruthy();
					expect(res.body.title).toEqual(payload.title);
					expect(res.body.synopsis).toEqual(payload.synopsis);
					expect(res.body.releaseDate).toEqual(payload.releaseDate);
					expect(
						res.body.people.some((item) => item.person.id === person2.id),
					).toBeTruthy();
					expect(
						res.body.people.some((item) => item.role.id === role1.id),
					).toBeTruthy();
					expect(
						res.body.genres.some((item) => item.id === genre3.id),
					).toBeTruthy();
					expect(res.body.userId).toEqual(parseJwt(token).sub);
				});
		});

		it('/movies search by title (get)', () => {
			const param = 'gree';
			return request(app.getHttpServer())
				.get('/movies')
				.set('Authorization', token)
				.query(`title=${param}`)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(2);
					expect(res.body.every((item) => item.title.includes(param)));
				});
		});

		it('/movies search by genre (get)', () => {
			const param = 'action';
			return request(app.getHttpServer())
				.get('/movies')
				.set('Authorization', token)
				.query(`genre=${param}`)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(2);
				});
		});

		it('/movies filter by releaseDateBefore (get)', () => {
			const param = '2020-05-14T10:23:23.568Z';
			return request(app.getHttpServer())
				.get('/movies')
				.set('Authorization', token)
				.query(`releaseDateBefore=${param}`)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(2);
					expect(
						res.body.every(
							(item) => new Date(item.releaseDate) < new Date(param),
						),
					).toBeTruthy();
				});
		});

		it('/movies filter by releaseDateAfter (get)', () => {
			const param = '2020-05-14T10:23:23.568Z';
			return request(app.getHttpServer())
				.get('/movies')
				.set('Authorization', token)
				.query(`releaseDateAfter=${param}`)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(1);
					expect(
						res.body.every(
							(item) => new Date(item.releaseDate) > new Date(param),
						),
					).toBeTruthy();
				});
		});
	});
	describe('favourites', () => {
		beforeEach(async () => {
			await fillDb(connection);
		});
		afterEach(async () => {
			await emptyDb(connection);
		});
		it('/favourites my favourites (get)', () => {
			return request(app.getHttpServer())
				.get('/favourites')
				.set('Authorization', token)
				.expect(200)
				.expect(function (res) {
					expect(res.body.length).toEqual(2);
				});
		});

		it('/favourites add movie to my favourites (POST)', () => {
			return request(app.getHttpServer())
				.post('/favourites')
				.set('Authorization', token)
				.send({ movieId: movie3.id })
				.expect(200)
				.expect(function (res) {
					expect(res.body).toBeTruthy();
				})
				.then(() =>
					request(app.getHttpServer())
						.get('/favourites')
						.set('Authorization', token)
						.expect(200)
						.expect(function (res) {
							expect(res.body.length).toEqual(3);
						}),
				);
		});

		it('/favourites add movie to my favourites if it already exists (POST)', () => {
			return request(app.getHttpServer())
				.post('/favourites')
				.set('Authorization', token)
				.send({ movieId: movie3.id })
				.expect(200)
				.expect(function (res) {
					expect(res.body).toBeTruthy();
				})
				.then(() =>
					request(app.getHttpServer())
						.get('/favourites')
						.set('Authorization', token)
						.expect(200)
						.expect(function (res) {
							expect(res.body.length).toEqual(3);
						}),
				);
		});

		it('/favourites delete movie to my favourites (DELETE)', () => {
			return request(app.getHttpServer())
				.delete('/favourites')
				.set('Authorization', token)
				.send({ movieId: movie1.id })
				.expect(200)
				.expect(function (res) {
					expect(res.body).toBeTruthy();
				})
				.then(() =>
					request(app.getHttpServer())
						.get('/favourites')
						.set('Authorization', token)
						.expect(200)
						.expect(function (res) {
							expect(res.body.length).toEqual(1);
						}),
				);
		});
	});
});

function parseJwt(token) {
	let base64Payload = token.split('.')[1];
	let payload = Buffer.from(base64Payload, 'base64');
	return JSON.parse(payload.toString());
}
