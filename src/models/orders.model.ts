import db from '../database'
import order from '../types/orders.type';
import order_products from '../types/order_products.type';
import ProductModel from './products.model';
class OrderModel{
    // create an order
    async createOrder(order:order):Promise<order>{
        const {products} = order
        try {
            const connection = await db.connect();
            const query = `INSERT INTO orders (users_id,order_status) 
            values ($1, $2) 
            RETURNING order_id,users_id,order_status`
            const result = await connection.query(query,[
                order.users_id,
                order.order_status])
                
      const orderProductsSql = "INSERT INTO order_products (orders_id, products_id, product_quantity) VALUES($1, $2, $3) RETURNING products_id, product_quantity"
      const orderProducts = []
            console.log(products)
      for (const product of products) {
        const {products_id, product_quantity} = product

        const {rows} = await connection.query(orderProductsSql, [result.rows[0].order_id, products_id, product_quantity])

        orderProducts.push(rows[0])
      }
            connection.release();  
            return {...result.rows[0],products:orderProducts}
        } catch (error) {
            throw new Error(`Unable to create order (${order.order_id}): ${(error as Error).message}`)
        }
    }

    // show index (getAll products)
    async getAllOrders(): Promise<order[]> {
        try {
        const connection = await db.connect()
        const sql = "SELECT * FROM orders"
  
        const {rows} = await connection.query(sql)
        const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE orders_id=($1)"
        // const orderProductsSql = "SELECT order_products.products_id, order_products.product_quantity FROM order_products JOIN orders ON order_products.orders_id = ($1);"
        const orders = []
            
            for (const order of rows) {
                const  orderProductRows = await connection.query(orderProductsSql,[order.order_id])
          orders.push({
            ...order,
            products: orderProductRows.rows
          })
        }
  
        connection.release()
  
        return orders
        } catch (error) {
        throw new Error(`Error at retrieving orders ${(error as Error).message}`)
        }
    }
 // get specific product
 async getOrder(order_id: string): Promise<order> {
    try {
      const sql = `SELECT order_id, users_id,
      order_status FROM orders 
      WHERE order_id= $1 `

      const connection = await db.connect()

      const result = await connection.query(sql, [order_id])
      const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE orders_id=($1)"
      const {rows: orderProductRows} = await connection.query(orderProductsSql, [order_id])

      connection.release()
      return {...result.rows[0],products:orderProductRows}
    } catch (error) {
      throw new Error(`Could not find order ${order_id}, ${(error as Error).message}`)
    }
  }


}

export default OrderModel
