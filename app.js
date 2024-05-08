import express from 'express';
import postRoute from './routes/post.route.js';

const app = express();

console.log("testing");

app.use("/api/posts", postRoute);

app.listen(8800, () => {
   console.log("Server is running");
})