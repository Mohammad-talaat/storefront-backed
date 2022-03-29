import supertest from 'supertest'
import db from '../../database'
import User from '../../types/user.type'
import app from '../../index'
import UserModel from '../../models/user.model'
import product from '../../types/products.type'
import ProductModel from '../../models/products.model'

const productModel = new ProductModel();
const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('### Products API Endpoints', () => {
    const product = {
          name:"product 1",
          price:12
    } as product
  
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123',
    } as User
    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      user.id = createdUser.id
    })
  
    afterAll(async () => {
      // clean db
      const connection = await db.connect()
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })
  
    beforeAll(async () => {
      const createdProduct = await productModel.createProduct(product)
      product.id = createdProduct.id
    })
  
    afterAll(async () => {
      // clean db
      const connection = await db.connect()
      const sql = 'DELETE FROM products;'
      await connection.query(sql)
      connection.release()
    })
    describe('### Test Authenticate methods', () => {
      it('should be able to authenticate to get token', async () => {
        const res = await request
          .post('/api/v1/users/authenticate')
          .set('Content-type', 'application/json')
          .send({
            email:"test@test.com",
            password: 'test123',
          })
        expect(res.status).toBe(200)
        console.log(res.body)
        const {  email, token: userToken } = res.body.data
        expect(email).toBe('test@test.com')
        token = userToken
      })})
})  