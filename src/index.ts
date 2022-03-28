
import express,{Application} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
const app:Application = express()

//------------------  middlewares ------------------//
app.use(express.json())
app.use(morgan('common')) 
app.use(helmet())


app.get('/',(req,res)=>{
    res.send('<h1>Welcome to our app</h1>')
})


app.listen(3000,()=>{
    console.log('port is running on port 3000')
})

export default app;