import request from "supertest"; 
import dotenv from "dotenv"; 
dotenv.config(); 
import app from "/index.js"
import { pool } from "../database.js";
import {generateAccessToken} from "../utils/jwt.js";
/**
 * Apuohjelmafunktio: Luo kelvollinen JWT-tunnus testausta varten.
 * Käytetään simuloimaan onnistuneesti sisäänkirjautunutta käyttäjää.
 * @param {string} user 
 * @returns {string} -
 */
let credentials;

afterAll(async () => {

  await pool.end();
});

// --- Testitapaukset ---
test("1) POST register → 400, liian lyhyt salasana", async () => {
  const res = await request(app)
    .post("/register") 
    .send({ username: "testuser", password: "123412", email: "testemail@test.com"});
  expect(res.status).toBe(400);
});

test("2) POST register → 400, email väärä formaatti", async () => {
  const res = await request(app)
    .post("/register") 
    .send({ username: "testuser", password: "12341234", email: "testemail.com"});
  expect(res.status).toBe(400);
});

test("3) POST register → 201, luo käyttäjän onnistuneesti", async () => {
  const res = await request(app)
    .post("/register")
    .send({ username: "testuser", password: "12341234", email: "testemail@test.com"});
  expect(res.status).toBe(201);
});

test("4) POST register → 409, tarkastaa username dublikaatit, unique constraint violation", async () => {
  const res = await request(app)
    .post("/register")
    .send({ username: "testuser", password: "12341234", email: "testemail@test.com"});
  expect(res.status).toBe(409);
});


test("5) POST set account for deletion → 200, asettaa käyttäjän poistoa varten", async () => {
    const token = generateAccessToken("testuser")
    const res = await request(app)
    .put("/setDeletionFlag")
    .set('Authorization', `Bearer ${token}`)
    .send({ username: "testuser"});
  expect(res.status).toBe(200);
});

test("6) POST login → 400, tyhjä username tai password kenttä", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "", password: "12341234"});
  expect(res.status).toBe(400);
});

test("7) POST login → 401, väärä salasana", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "testuser", password: "1234123422"});
  expect(res.status).toBe(401);
});

test("8) POST login & logout → 200, kirjaudutaan sisälle ja ulos onnistuneesti", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "testuser", password: "12341234"});
  expect(res.status).toBe(200);

  credentials = JSON.stringify(res.headers["set-cookie"])
  credentials = credentials.slice(credentials.indexOf('[') + 2, credentials.indexOf(']') -1)
  console.log("tässä on cookie data: "+credentials) //haetaan refreshtoken 

  const resposelogout = await request(app)
    .post("/logout")
    .set('Cookie', [credentials])
  expect(resposelogout.status).toBe(200);
});

test("9) POST deleteaccount → 200", async () => {
  const token = generateAccessToken("testuser")
  const id = await request(app)
  .get("/getid/testuser")
  .set('Authorization', `Bearer ${token}`)

  const numbers = JSON.stringify(id.text).replace(/\D/g, ""); // käyttäjän id tulee hankalassa muodossa, pitää sorttia tällä
  console.log(numbers)
  const res = await request(app)
    .delete(`/deleteaccount/${numbers}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200);

});



