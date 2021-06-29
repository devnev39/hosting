let canvas;
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner;

let boxes = [];
let def = 20;
let redi = 6;
function setup(){
  document.getElementById("defaultOpen").click();
  canvas = createCanvas(500,300);
  canvas.position(500,500);

  engine = Engine.create();
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  runner = Runner.create();
  world = engine.world;

  ground = Bodies.rectangle(width/2,height,width+10,30,{isStatic : true});
  up = Bodies.rectangle(width/2,0,width+10,30,{isStatic : true}); 
  right = Bodies.rectangle(width,height/2,30,height+10,{isStatic : true}); 
  left = Bodies.rectangle(0,height/2,30,height+10,{isStatic : true}); 
  ground.restitution = up.restitution=right.restitution=left.restitution = 1;

  document.getElementById('n_inp').value = def;
  for(let i=0;i<def;i++){
    boxes.push(new Box(getRandom(width),getRandom(height),redi));
  }

  boxes.forEach(box=>{
    box.changeState(10,radians(getRandom(360)),1,1,false);
  });
  
  World.add(world,[ground,up,left,right]);
  World.add(world,boxes);
  Runner.run(runner,engine);

  setInterval(deltaPos,1000);
  
}

function draw(){
  background('black');
  boxes.forEach(box=>{
    box.show();
  })
  fill(170);
  stroke('white');
  rectMode(CENTER);
  rect(width/2,height,width,30);
  rect(width/2,0,width,30);
  rect(width,height/2,30,height);
  rect(0,height/2,30,height);
}

function deltaPos(){
  let te = 0;
  boxes.forEach(box=>{
    te+=box.energy.TE;
  })
  console.log(te);
}

function n_changed(){
  let n = +document.getElementById('n_inp').value;
  if(n<41 && n>0){
    val = n - def; 
    if(val>=0){
      while(val--){
      bx = new Box(getRandom(width),getRandom(height),redi);
      bx.changeState(5,radians(getRandom(360)),1,1);
      boxes.push(bx);
      }
    }else{
      while(val++){
        boxes[-val].removeFromWorld();
        boxes.splice(-val,1);
      }
    }
    def = +document.getElementById('n_inp').value;
  }else{
    alert("Max 40 && Min 1");
    document.getElementById("n_inp").value = 20;
  }
}

function rotate_changed(obj){
  if(obj.checked){
    boxes.forEach(ele=>{
      Body.setInertia(ele.body,(Math.PI/4)*(ele.r**4));
    })
  }else{
    boxes.forEach(ele=>{
      Body.setInertia(ele.body,Infinity);
    })
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function Change(evt, tab, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].style.backgroundColor = "white";
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
  evt.currentTarget.style.backgroundColor = color;
}
// Get the element with id="defaultOpen" and click on it

