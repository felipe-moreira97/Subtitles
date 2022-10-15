const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({dest:'upload/'})
const fs = require('fs')
const port = 3001

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin','http://localhost:3000')
    res.header('Access-Control-Allow-Headers','*')
    res.header('Access-Control-Allow-Methods',['GET','POST','PUT','DELETE'])
    next()
})
app.post('/',upload.array('subtitle'),(req,res,next) => {
    const rows = req.files.map(files => fs.readFileSync(files.path).toString('utf-8'))
        .reduce((acc,cur) => `${acc}\n ${cur}`)
        .split('\n')
        .map(row => row.replace('\r',''))
        .map(row => row.replace('\d',''))
        .filter(row => row.search('-->') < 0)
        .map(row => row.replace(/[,.?!-:'"]/g,''))
        .map(row => row.replace(/(<[^>]+)>/ig,'').trim())
        .filter(row => !parseInt(row))
        .filter(row => row !== '')
        .reduce((acc,cur)=> acc.concat(cur.split(' ')),[])
        .map(words => words.replace())
        .map(words => words.toLowerCase())
        .reduce((obj,word) => {
            if (obj[word]) {
              obj[word] = obj[word] + 1
            } else {
              obj[word] = 1
            }
            return obj
        },{})
      const list = Object.keys(rows).map(key => ({word:key, amount:rows[key]}))
      .sort((w1,w2)=> w2.amount - w1.amount)
    res.status(200).send(list)
})


app.listen(port,() => console.log(`server rodando na porta: ${port}`))