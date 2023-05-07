const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new KoaRouter();
let {userData} = require('./data.js')

app.use(json()), app.use(cors()), app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

router.get("/userData", (ctx) => {
  if (userData) {
    ctx.body = userData;
  }
});

router.get('/',ctx =>{
  ctx.body='Server Running'
})
router.post("/addUser", add);
router.delete("/removeUser/:id", remove);
router.post("/updateUser/:id", update);

async function add(ctx) {
  const body = ctx.request.body;
  userData.push(body);
  ctx.body = "success";
}

async function remove(ctx) {
  let id = ctx.params.id;
  // console.log(ctx.params.id)
  let userToRemove = userData[id - 1];
  const objWithIdIndex = userData.findIndex((obj) => obj.id === +id);
  // console.log(objWithIdIndex)

  userData.splice(objWithIdIndex, 1);

  ctx.body = userToRemove + " removed successsfully";
}

async function update(ctx) {
  let index = ctx.params.id;
  let body = ctx.request.body;
  userData.splice(index, 1, body);
  ctx.body = "success";
  console.log(body);
}

app.listen(process.env.PORT || 4000, () => {
  console.log("server started...");
});
