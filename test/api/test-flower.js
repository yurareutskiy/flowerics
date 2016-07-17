'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
const app = require('../../app');

test('GET flowers', t => {
  request(app)
    .get('/api/flowers')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(t.end);
});

test.onFinish(() => process.exit(0));
