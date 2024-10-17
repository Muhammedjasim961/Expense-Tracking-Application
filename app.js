const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('HI ETA')
})

const port = 3005
app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})