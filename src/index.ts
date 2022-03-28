
import express,{Application} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorMiddleware from './middleware/error.middleware'
import config from './middleware/config'
import db from './database'
import { Client } from 'pg'

console.log(config);

const app:Application = express()
const port = config.port || 3000
//------------------  Middlewares ------------------//
app.use(express.json())
app.use(morgan('common')) 
app.use(helmet())
//------------------ Database ---------------------//
db.connect().then(client => {
    return client.query('SELECT NOW()').then((res)=>{
        client.release();
        console.log(res.rows);
        
    }).catch((err)=>{
        client.release()
        console.log(err.stack);
        
    })
})


app.get('/',(req,res)=>{
    res.send('<h1>Welcome to our app</h1>')
})

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

export default app;