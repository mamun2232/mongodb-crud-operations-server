const express = require("express");
const cors = require("cors");
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// use middleware 
app.use(cors())
app.use(express.json())

// mongodb user 
// user : dbuser2 
// password: rcMCJ4HZScf6PVG5


/* const uri = "mongodb+srv://dbuser2:rcMCJ4HZScf6PVG5@cluster0.jrvob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
      try{
            // then client cannet korbo 
            await client.connect()

            // then database er sate cannet korbo
            const useCollection = client.db("foodExpress").collection("user");

            // ebar ja patabo ta ekhane likbo 
            const user = {name: 'Mohammd nadim' , email: 'juborajvai22@gmail.com'}

            // etike mongodb te patiye dewar jonno insertOne() er bitor patiye debo 
            const result = await useCollection.insertOne(user)

            console.log(`A document was inserted with the _id: ${result.insertedId}`);
           

      }
      finally{
      //      await client.close()
      }

} */
const uri = "mongodb+srv://dbuser2:rcMCJ4HZScf6PVG5@cluster0.jrvob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
      try{
            //*** */ then client cannet korbo 
            await client.connect()

            //**** */ then database er sate cannet korbo
            const useCollection = client.db("foodExpress").collection("user");

            //**** */ ebar ja patabo ta ekhane likbo 

            // data database theke jevabe data anbo
            app.get('/user' , async (req, res) =>{
                  // find oporetion calate hobe  (collection.find()  korte hobe, then data pawar por toArray() korte hobe)
                  const query = {}
                  const cursor = useCollection.find(query)
                  const user = await cursor.toArray()
                  res.send(user)

            })



            //  resive data 
            app.post('/user' , async (req , res) =>{
                  // insite oporetion calate hobe 
                  const newuser = req.body
                  console.log('addding new user' , newuser);

                  // ebar databage e patanor jonno insertOne() diye patiye dite hobe 
                  const result = await useCollection.insertOne(newuser)
                  res.send({result : 'success'})
            })

            //**** */ etike mongodb te patiye dewar jonno insertOne() er bitor patiye debo 
            // const result = await useCollection.insertOne(user)

            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
           

      }
      finally{
      //      await client.close()
      }

}

run().catch(console.dir)


app.get('/' , (req, res)=>{
      res.send('Runing my curd opretion')
})

app.listen(port , ()=>{
      console.log('courd oporetion ', port);
})