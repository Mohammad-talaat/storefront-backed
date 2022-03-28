
import express,{Application} from 'express'

const app:Application = express()


app.get('/',(req,res)=>{
    res.send('<h1>Welcome to our app</h1>')
})


app.listen(3000,()=>{
    console.log('port is running on port 3000')
})

export default app;