import ProductModel from '../products.model'
import db from '../../database'
import product from '../../types/products.type'

const productModel = new ProductModel()

describe('#### Product Model', () => {
  describe('### Test methods exists', () => {
    it('should have an Get All product method', () => {
      expect(productModel.getAllProducts).toBeDefined()
    })

    it('should have a Get One product method', () => {
      expect(productModel.getProduct).toBeDefined()
    })

    it('should have a Create product method', () => {
      expect(productModel.createProduct).toBeDefined()
    })
  })

  describe('Test Product Model Logic', () => {
    const product = {
      name:"product 1",
      price:12
    } as product

    beforeAll(async () => {
      const createdProduct = await productModel.createProduct(product)
      product.id = createdProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM products;'
      await connection.query(sql)
      connection.release()
    })

    it('Create product method should return a New Product', async () => {
      const createdProduct = await productModel.createProduct({
       name:"product 2",
       price:14
      } as product)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
       name: 'product 2',
       price: 14
      } as product)
    })

    it('Get all products method should return All available Products in DB', async () => {
      const products = await productModel.getAllProducts()
      expect(products.length).toBe(3) // becauase we created another one in orderSpec
    })

    it('Get product method should return testProduct when called with ID', async () => {
      const returnedProduct = await productModel.getProduct(product.id as string)
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
    })
  })
})
