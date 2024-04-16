
const fs = require("fs");
const http = require("http");
const url = require("url");


const data = fs.readFileSync("./data.json", "utf-8");


const recipe = JSON.parse(data).recipes;


const HtmlTemplate = `
    <!DOCTYPE HTML>
    <HTML>
        <HEAD>
        <style>
                * {
                    font-family : poppins;
                    box-sizing: border-box;
                }
            
                
            
                 div {
                    width: 450px;
                    margin: 25px auto;
                    border: 8px solid black;
                    border-radius: 5px;
                    padding: 12px;
                    object-fit: fit-content;
                    
                }
            img {
                heigth: 200px;
                width: 200px;
                
            }

            

            </style>
                
            </HEAD>    

            <BODY>RECIPE_CARDS</BODY>
        
    </HTML>
    `
const searchTemplate=`
<div>
<input type="search"placeholder="search here"></input>
</div>
`




const cardTemplate = `   

<div class = "recipe-card">
    <h1>Name</h1>
    <img src="$dish$"></img>
    <a href="$product_link$">more info </a>
    <h3>recipe</h3>
    <p>ingridents</p>
    <hr>
    
    </div>
`


const allCards = recipe.map((elem) => {
  let newRecipe = cardTemplate;
  newRecipe = newRecipe
    .replace("$product_link$", elem.id)
    .replace("Name", elem.name)
    .replace("$dish$", elem.image)
    .replace("recipe", elem.ingredients)
    .replace("ingridents", elem.instructions)
    
    

  return newRecipe;
});


const allCardsString = allCards.join(" ");


const page = HtmlTemplate.replace("RECIPE_CARDS", allCardsString);

const server = http.createServer((req, res) => {
  console.log("recived");
  console.log(req.url);
  res.writeHead(200, {
    "content-type": "text/html",
  });
  res.end(page);
});


server.listen(1500, () => {
  console.log(".......Server Start.......");
});