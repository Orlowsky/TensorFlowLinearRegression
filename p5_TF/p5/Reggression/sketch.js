//p5 and tensorflow
//We need
/* 1. Points created and displayed
2. dataset 
3. function y =mx+b for prediction 
4. optimizer for leaarning sgd
5. loss function
6. trainning - minimize the loss function with optimizer to adjust m and b in 
//in y = mx+b 
 */

// point initialized
let x_vals =[];
let y_vals =[];

// part of function y = mx +b
let m, b;

// 4.learnign rate and optimizer 
const learningRate = 0.1;
const optimizer = tf.train.sgd(learningRate);


function setup() {
  createCanvas(400,400);
  
  //initiate variable for function   y = mx +b
  m = tf.variable(tf.scalar(random(1)));
  b= tf.variable(tf.scalar(random(1)));

}
// 5. loss function - predictions from predict function , labels are actuall ys 
function loss(pred,label){
  // mean square error prediction - actual ys squared and mean (średnia)
  return  pred.sub(label).square().mean();
  //const loss = (pred, label) => pred.sub(label).square().mean();
}

  //given the the element xs we find and predict ys;
  //3.predict function and dataSet
  
function predict(x){
  const xs = tf.tensor1d(x);
  //y = mx+b;
  const ys = xs.mul(m).add(b);

  return ys;
}

function mousePressed(){

// creating point when mouse clicked
  let x = map(mouseX,0,width,0,1);
  let y = map(mouseY,0, height,1,0 );
  x_vals.push(x);
  y_vals.push(y);

}

function draw() {

  tf.tidy(()=>{
    if(x_vals.length>0){
      const ys=tf.tensor1d(y_vals); // creating tensor ys 
      optimizer.minimize(() => loss(predict(x_vals), ys));
      // minimizing the loss from predicting x_vals and y_vals 
    }

  })
  
  

  background(0);

//displaying and remembering points
  stroke(255);
  strokeWeight(6);

  for(let i=0; i<x_vals.length;i++){
    let px = map(x_vals[i],0,1,0,width);
    let py = map(y_vals[i],0,1,height,0);
    point(px,py);
    

  }
  //draw a line 
  const lineX = [0,1];
  const ys = predict(lineX);
  //ys.print();
  //xs.print();

  let x1= map(lineX[0],0,1,0,width);
  let x2= map(lineX[1],0,1,0,width);

  let lineY = ys.dataSync();
  let y1= map(lineY[0],0,1,height,0);
  let y2= map(lineY[1],0,1,height,0);
  strokeWeight(2);
  line(x1,y1,x2,y2);
  

//console.log(x_vals,y_vals)
 
}


function touchStarted() {
  getAudioContext().resume()
}