const express = require("express");
const cors = require("cors");
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { set } = require("express/lib/application");
const ObjectId = require('mongodb').ObjectId;
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

            // data database theke jevabe data anbo (user pawar jonno)
            app.get('/user' , async (req, res) =>{
                  // find oporetion calate hobe  (collection.find()  korte hobe, then data pawar por toArray() korte hobe)
                  const query = {}
                  const cursor = useCollection.find(query)
                  const user = await cursor.toArray()
                  res.send(user)

            })


            // database theke specipex ekta data anar jonno 
            app.get('/user/:id' , async (req , res) =>{
                  // find a document theke findOne() oporetion calate hobe 
                  const id = req.params.id
                  const query = {_id: ObjectId(id)}
                  const result = await useCollection.findOne(query)
                  res.send(result)
            })


            //  resive data database e patabo(user add)
            app.post('/user' , async (req , res) =>{
                  // insite oporetion calate hobe 
                  const newuser = req.body
                  console.log('addding new user' , newuser);

                  // ebar databage e patanor jonno insertOne() diye patiye dite hobe 
                  const result = await useCollection.insertOne(newuser)
                  res.send({result : 'success'})
            })

            // database theke delect er jonno 
            app.delete('/user/:id', async ( req , res) =>{
                  const id = req.params.id
                  const query = {_id : ObjectId(id)}
                  const result = await useCollection.deleteOne(query)
                  res.send(result)
                  console.log(id);

            })
             
            // database update korar jonno 
            app.put('/user/:id' , (req , res) =>{
                  // update opretion korte hobe 
                  const id = req.params.id
                  const update = req.body
                  const filter = {_id : ObjectId(id)}
                  const options = { upsert: true }

                  const updateDoc ={
                        $set: {
                              name: update.name,
                              email: update.email
                        }
                       
                  }
                  const result = await useCollection.updateOne(filter, updateDoc, options);
                  res.send(result)
                  
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