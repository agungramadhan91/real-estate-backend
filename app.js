import express from 'express';

const app = express();

console.log("testing");

app.use("/test", (req, res) => {
   res.send("it works");
})

app.listen(8800, () => {
   console.log("Server is running");
})