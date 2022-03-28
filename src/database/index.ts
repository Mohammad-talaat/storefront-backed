import {Pool} from 'pg'
import config from '../middleware/config'

const pool = new Pool({
    host:config.dbHost,
    database:config.database,
    user:config.user,
    password:config.dbPass,
    port: parseInt(config.dbPort as string, 10)
})
 
pool.on('error',(error:Error)=>{
    console.error(error.message)
})
export default pool