import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors"


const prisma= new PrismaClient()
const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())


app.post('/api', async(req, res) => {
    const {email,name}=req.body
    if(!email&&!name) return res.status(400).json({message:"Email and name required fields!"})
   
    try {
        const createRow= await prisma.waitList.create({
            data:{email,name}
        })
        res.json(createRow);
    } catch (error) {
        res.status(400).send({message:error})
    }
});

const server=app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
