import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "mp",
  password: "123",
  port: 5432,
});
const saltround=10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
db.connect();

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.get("/signin",(req,res)=>{
    res.render("signin.ejs")
});

app.get("/signup",(req,res)=>{
  res.render("signin.ejs");
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
      const result = await db.query("SELECT * FROM register WHERE email = $1", [username]);

      if (result.rows.length === 0) {
          return res.status(400).send("User not found");
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
          res.redirect("/");
      } else {
          res.status(401).send("Wrong password");
      }
  } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).send("Internal server error");
  }
});

app.post('/signup',async (req, res) => {
    const { username, email, password } = req.body;
    // Process sign-up (e.g., save to database)
    await db.query("insert into register(name,email,password) values($1,$2,$3)",[req.body["username"],req.body["email"],req.body["password"]])
    res.redirect("/signin")
    
});

app.post("/signin",(req,res)=>{
   const email= req.body["email"]
   console.log(email)
   res.redirect("/signin")
})
const port=3000;
app.listen(port,()=>{
    console.log("serve running")
})