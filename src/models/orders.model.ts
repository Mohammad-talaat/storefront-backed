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

}

export default OrderModel
