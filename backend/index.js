const express = require("express");
// const expressSession = require("express-session");
// const passport = require("passport");
// const passport = require('./passport')
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
// const LocalStrategy = require('passport-local').Strategy;
// const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
// const { PrismaClient } = require('@prisma/client')
const app = express();
// const path = require("node:path");

// const assetsPath = path.join(__dirname, "public");
// app.use(express.static(assetsPath));
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


// app.use(expressSession({
//     cookie: {
//      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
//     },
//     secret: 'a santa at nasa',
//     resave: true,
//     saveUninitialized: true,
//     store: new PrismaSessionStore(
//       new PrismaClient(),
//       {
//         checkPeriod: 2 * 60 * 1000,  //ms
//         dbRecordIdIsSessionId: true,
//         dbRecordIdFunction: undefined,
//       }
//     )
//   }));

// app.use(passport.session());
// app.use(passport.initialize())

// app.use(express.urlencoded({ extended: true }));



// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//         console.log(username, password)
//       try {
//         // const { rows } = await pool.query(`select * from allusers where email = '${username}'`)
//         const user = await prisma.user.findUnique({
//             where:{
//                 username: username
//             }
//         })
//         //  await db.getUserByEmail(email)
//         //  await poop.query(`SELECT * FROM allusers WHERE email = '${email}' `);
//         // const user = rows[0];
  
//         if (!user) {
//           return done(null, false, { message: "Incorrect username" });
//         }
//         const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//     // passwords do not match!
//       return done(null, false, { message: "Incorrect password" })
//     }
//         // if (user.password !== password) {
//         //   return done(null, false, { message: "Incorrect password" });
//         // }
        
//         return done(null, user);
//       } catch(err) {
//         return done(err);
//       }
//     })
//   );
//   passport.serializeUser((user, done) => {
//     console.log("ser is working")
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     console.log("des is working")
//     try {
//     //   const { rows } = await pool.query(`select * from allusers where id = ${id}`)
//       const  user  = await prisma.user.findUnique({
//         where: {
//             id:id
//         }
//       })
//     //    await db.getUser(id)
//     //    await pool.query(`SELECT * FROM allusers WHERE id = ${id}`);
//     //   const user = rows[0];
//       console.log('koojoij')
  
//       done(null, user);
//     } catch(err) {
//       done(err);
//     }
//   });


// const bodyParser = require("body-parser");
// app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
var cors = require('cors');
// const { stat } = require("node:fs");
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods : ["PUT", "DELETE", "POST", "GET"],
    credentials: true
}))

app.get("/",(req, res)=>{
    res.json({'kh':929})
})
app.get("/posts", async(req, res)=>{
    const posts = await prisma.post.findMany({
      include: {
        writer: true, // All posts where authorId == 20
        comments: true
      },
})
    // console.log(posts)
    res.status(200).json({data:posts})
})
app.get("posts/post/:id", async(req, res)=>{
    const post = await prisma.post.findUnique({
        where:{
            id:req.params.id
        }
    })
    res.status(200).json({data:post})
})
app.get("/posts/by/:id", async(req, res)=>{
    const posts = await prisma.post.findMany({
        where:{
            writerid:req.params.id
        }
    })
    res.status(200).json({data:posts})
})
app.get("/posts/post/comments/:id", async(req, res)=>{
    const comments = await prisma.comment.findMany({
        where:{
            postid:req.params.id
        },
        include:{
          writer: true
        }
    })
    res.status(200).json({data:comments})
})
app.get("/comments", async(req, res)=>{
    const comments = await prisma.comment.findMany()
    res.status(200).json({data:comments})
})
app.get("/users", async(req, res)=>{
    const users = await prisma.user.findMany()
    res.status(200).json({data:users})
})
app.post("/posts/post", async(req, res)=>{
  // console.log(req.user)
  const cookie = req.cookies['jwt']
  const claims = jwt.verify(cookie, "secret")
  // console.log(claims)
  if (!claims){
    return res.status(404).send({message:"unauthenticated"})
  }
  const user = await prisma.user.findUnique({
    where:{
      id:claims.userId
    }
  })
    const post = await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            posts:{
                create:{
                    title:req.body.title,
                    content:req.body.content
                }
            }
        }
    })
    res.status(200).json({status:"recived"})
})
app.post("/posts/post/:id/comment", async(req, res)=>{
  const cookie = req.cookies['jwt']
  const claims = jwt.verify(cookie, "secret")
  // console.log(claims)
  if (!claims){
    return res.status(404).send({message:"unauthenticated"})
  }
  const user = await prisma.user.findUnique({
    where:{
      id:claims.userId
    }
  })
    const comment = await prisma.comment.create({
        data:{
            content:req.body.content,
            writerid:user.id,
            postid:req.params.id
        }
    })
    res.status(200).json({status:'recived'})
})
app.put("/posts/post/comment/:id", async(req, res)=>{
  await prisma.comment.update({
    where:{
      id:req.params.id
    },
    data:{
      content:req.body.content
    }
  })
  res.status(200).json({message:'recived'})
})
// async (req, res, next)=>{
//   const { username, password } = req.body

// try {
//   let user = ''
//   const existingUser = await prisma.user.findUnique({
//     where: { username }
//   })

//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists.' })
//   }
//   else{
//   bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
//       // if err, do something
//       // otherwise, store hashedPassword in DB
//       if (err){
//         return next(err)
//       }
      
//       user = await prisma.user.create({
//           data:{
//               username: req.body.username,
//               password: hashedPassword
//           }
//       })
    
//     res.status(200).json({status:'recived'})
     
//     })
//   }
//   // const hashedPassword = await bcrypt.hash(password, 10)

//   // const user = await prisma.user.create({
//   //   data: {
//   //     username,
//   //     email,
//   //     password: hashedPassword,
//   //     role: role || 'USER'
//   //   }
//   // })



//   res.status(201).json({ message: 'User registered successfully.', user })
// } catch (error) {
//   res.status(500).json({ message: 'Server error.', error: error.message })
// }
   
// }
app.post("/signup", async (req, res)=>{
  const { username, password } = req.body
  try{
    
    const existingUser = await prisma.user.findUnique({
      where: {
         username: username
        }
    })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' })
    }

    // const salt = await bcrypt.genSalt(10)
    
    // const hashedPassword = await bcrypt.hash(password, salt)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
          data: {
            username: username,
            password: hashedPassword,
          }
        })
      //   await user.save()
      // console.log(user)
      // const {password, ...data} =  user
    res.send(user)

  }catch{
    res.send("hahahahhhahahah")
  }
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body
  
    try {
      const user = await prisma.user.findUnique({
        where: { username }
      })
      console.log(user)
      if (!user) {
        return res.status(400).json({ message: 'User doesnt exist.' })
      }
        if (username != 'frech'){
          return res.status(400).json({ message: 'Invalid credentials.' })
        }
      
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' })
      }
  
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        'secret',
        // { expiresIn: '1h' }
      )
      res.cookie('jwt', token, {
        httpOnly:true,
        maxAge: 24 *60 *60 * 1000
      })
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message })
    }
  })
app.get("/user", async(req, res)=>{
  try{
  const cookie = req.cookies['jwt']
  const claims = jwt.verify(cookie, "secret")
  // console.log(claims)
  if (!claims){
    return res.status(404).send({message:"unauthenticated"})
  }
  const user = await prisma.user.findUnique({
    where:{
      id:claims.userId
    }
  })
  res.send(user)

}catch{
  return res.status(404).send({message:"unauthenticated"})
}
})



app.get("/user/visitor", async(req, res)=>{
  try{
  const cookie = req.cookies['jwtv']
  const claims = jwt.verify(cookie, "secret")
  // console.log(claims)
  if (!claims){
    return res.status(404).send({message:"unauthenticated"})
  }
  const user = await prisma.user.findUnique({
    where:{
      id:claims.userId
    }
  })
  res.send(user)

}catch{
  return res.status(404).send({message:"unauthenticated"})
}
})
app.post("/login/visitor", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User doesnt exist.' })
    }
    if (req.body.admin != false){
      if (username != 'frech'){
        return res.status(400).json({ message: 'Invalid credentials.' })
      }
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'secret',
      // { expiresIn: '1h' }
    )
    res.cookie('jwtv', token, {
      httpOnly:true,
      maxAge: 24 *60 *60 * 1000
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})
app.post("/logout/visitor", (req, res)=>{
  res.cookie("jwtv", "", {maxAge:0})
  res.send({message:"secsess"})
})
app.post("/posts/post/:id/comment/visitor", async(req, res)=>{
  const cookie = req.cookies['jwtv']
  const claims = jwt.verify(cookie, "secret")
  // console.log(claims)
  if (!claims){
    return res.status(404).send({message:"unauthenticated"})
  }
  const user = await prisma.user.findUnique({
    where:{
      id:claims.userId
    }
  })
    const comment = await prisma.comment.create({
        data:{
            content:req.body.content,
            writerid:user.id,
            postid:req.params.id
        }
    })
    res.status(200).json({status:'recived'})
})



app.post("/logout", (req, res)=>{
  res.cookie("jwt", "", {maxAge:0})
  res.send({message:"secsess"})
})
// app.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).json({status:'recived'})
//     });
//   })
app.delete("/posts/post/:id", async(req, res)=>{
    await prisma.post.delete({
        where:{
            id:req.params.id
        }
    })
   
    res.status(200).json({status:'recived'})
})
app.delete("/posts/post/comment/:id", async(req, res)=>{
    await prisma.comment.delete({
        where:{
            id:req.params.id
        }
    })
    
    res.status(200).json({status:'recived'})
})
app.get("/auth", (req, res)=>{
    console.log('send first', req.lol)
    let data = ''
    if (req.user){
        data = req.user
    }
    console.log('send', data)
    res.status(200).json({data:data})
})
app.put("/posts/post/:id", async(req, res)=>{
  await prisma.post.update({
    where:{
      id:req.params.id
    },
    data:{
      title:req.body.title,
      content:req.body.content
    }
  })
  console.log('lpl')
  res.status(200).json({message:'recived'})
})
app.listen(3002)