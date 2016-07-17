'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
const app = require('../../app');

test('GET flowers', t => {
  request(app)
    .get('/admin/flowers')
    .set('Accept', 'text/html')
    .expect(200)
    .end(t.end);
});

test.onFinish(() => process.exit(0));
