const koa = require('koa')
const koaRouter = require('@koa/router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new koa();
const router = new koaRouter();

let userData = [
    {
        "email":'insafnilam.2000@gmail.com',
        "username":'InsafNilam',
        "password":'123456',
        "role": 'trader',
    },
    {
        "email":'ashfaqnilam.1997@gmail.com',
        "username":'AshfaqNilam',
        "password":'123456',
        "role": 'customer',
    },
]

let itemData = [
    {
        "name":'Watermelon',
        "price":'300',
        "promotion": '2%'
    }
]
let cartData = [
    {
        "name":'Watermelon',
        "price":'300',
        "promotion": '2%'
    }
]
let wishData = [
    {
        "name":'Watermelon',
        "price":'300',
        "promotion": '2%'
    }
]

app.use(bodyParser());
app.use(cors());
app.use(json());

router.get('/', readUserData);
router.post('/userinfo', getUserData);
router.post('/addinfo', addUserData);

router.post('/cartinfo', addCartData);
router.get('/viewcartinfo', viewCartData);

router.post('/wishinfo', addWishData);
router.get('/viewwishinfo', viewWishData);

router.post('/additem', addItem);
router.get('/getitem', getItem);

async function viewCartData(ctx){
    ctx.body = cartData;
}

async function addCartData(ctx){
    let data = ctx.request.body;
    cartData.push(data);

    ctx.body = cartData;
}
async function viewWishData(ctx){
    ctx.body = wishData;
}

async function addWishData(ctx){
    let data = ctx.request.body;
    wishData.push(data);

    if(index === -1){
        wishData.push(data);
    }

    ctx.body = wishData;
}

async function getItem(ctx){
    ctx.body = itemData;
}
async function addItem(ctx){
    let data = ctx.request.body;

    const index = itemData.findIndex(e => e.name === data.name);

    if(index === -1){
        itemData.push(data);
    }else{
        itemData[index] = data;
        message = "Updated"
    }

    ctx.body = itemData;
}

async function readUserData(ctx){
    let data = userData.filter(e => e.role === "customer");

    ctx.body = data;
}
async function getUserData(ctx){
    let data = ctx.request.body;
    const index = userData.findIndex(e => e.email === data.email && e.password === data.password && e.role === data.role);
    
    ctx.body = {status: index, data};
}
async function addUserData(ctx){
    let data = ctx.request.body;

    const index = userData.findIndex(e => e.email === data.email);
    
    if(index !== 1){
        userData.push(data);
    }

    ctx.body = {status: index===1 ? -1: 1, data};
}

app.use(router.routes()).use(router.allowedMethods());

app.listen('5000',(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log("Server is up and running")
})