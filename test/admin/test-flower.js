'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
const Admin = require('../../models/admin');
const Flower = require('../../models/flower');
const app = require('../../app');

const _admin = {
  login: 'foobar',
  password: 'qwe123'
};

test('Create admin', t => {
  const admin = new Admin(_admin);
  return admin.save(t.end);
});

test('GET flowers', t => {
  request(app)
    .get('/admin/flowers')
    .set('Accept', 'text/html')
    .expect(302)
    .end(t.end);
});

test('POST /flowers - when not logged in - should redirect to /login', t => {
  request(app)
  .get('/admin/flowers/new')
  .expect('Content-Type', 'text/plain; charset=utf-8')
  .expect(302)
  .expect('Location', '/admin/login')
  .expect(/Redirecting/)
  .end(t.end);
});

// login
test('Admin login', t => {
  request(app)
  .post('/admins/session')
  .field('login', _admin.login)
  .field('password', _admin.password)
  .expect('Location', '/admin/dashboard')
  .expect('Content-Type', 'text/html; charset=utf-8')
  .end(t.end);
});

test('POST /flowers - invalid form - should respond with error', t => {
  request(app)
  .post('/admin/flowers')
  .field('name', '')
  .field('price', -1)
  .expect('Content-Type', 'text/plain; charset=utf-8')
  .expect(200)
  .expect(/Flower name cannot be blank/)
  .end(err => {
    const count = Flower.count().exec();
    t.ifError(err);
    t.same(count, 0, 'Count should be 0');
    t.end();
  });
});

test('POST /flowers - valid form - should redirect to the flowers list', t => {
  request(app)
  .post('/flowers')
  .field('name', 'red roses')
  .field('price', 500)
  .field('description', 'description')
  .field('type', 'rose')
  .field('color', 'red')
  .expect('Content-Type', 'text/html; charset=utf-8')
  .expect('Location', '/admin/flowers')
  .expect(302)
  .expect(/Redirecting/)
  .end(err => {
    const count = Flower.count().exec();
    t.ifError(err);
    t.same(count, 1, 'Count should be 1');
    t.end();
  });
});

test.onFinish(() => process.exit(0));
