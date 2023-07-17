//--------------------------------------- VARIABLES ---------------------------------------//
// For Pose Detection
let detector; 
let poses; 
let video;
let speech;
let in_frame; 

// Games to be initialized
let main_start = false;
let game1=false; //Pose1
let game2=false; //Pose2
let game3=false; //Pose3
let game4=false; //Pose4
let game5=false; //Pose5
let game6=false; //Pose6
let game7=false; //Pose7
let game8=false; //Pose8
let game9=false; //Pose1
let game10=false; //Pose2
let game11=false; //Pose3
let game12=false; //Pose4
let game13=false; //Pose5
let game14=false; //Pose6
let game15=false; //Pose7
let game16=false; //Pose8
let game17=false; //Pose1
let game18=false; //Pose2
let game19=false; //Pose3
let game20=false; //Pose4
let game21=false; //Pose5
let game22=false; //Pose6
let game23=false; //Pose7
let game24=false; //Pose8


// Game Variables
let correct; // The amount of correct joints
let win=false; // Has the player won?
let index = 0; // Stretch we are currently on
let done = false; // if the entire game is done

// Game Loop
let startCountDown;
let mainStartTime;// Main game loop start time

//Start Times
let game1StartTime;
let game2StartTime;
let game3StartTime;
let game4StartTime;
let game5StartTime;
let game6StartTime;
let game7StartTime;
let game8StartTime;
let game9StartTime;
let game10StartTime;
let game11StartTime;
let game12StartTime;
let game13StartTime;
let game14StartTime;
let game15StartTime;
let game16StartTime;
let game17StartTime;
let game18StartTime;
let game19StartTime;
let game20StartTime;
let game21StartTime;
let game22StartTime;
let game23StartTime;
let game24StartTime;

// Win Times, Checks Wins
let game1WinTime;
let game2WinTime;
let game3WinTime;
let game4WinTime;
let game5WinTime;
let game6WinTime;
let game7WinTime;
let game8WinTime;
let game9WinTime;
let game10WinTime;
let game11WinTime;
let game12WinTime;
let game13WinTime;
let game14WinTime;
let game15WinTime;
let game16WinTime;
let game17WinTime;
let game18WinTime;
let game19WinTime;
let game20WinTime;
let game21WinTime;
let game22WinTime;
let game23WinTime;
let game24WinTime;

let numWins = 0;

// Stretch Images
let img_pose1;
let img_pose2;
let img_pose3;
let img_pose4;
let img_pose5;
let img_pose6;
let img_pose7;
let img_pose8;

//Onboarding Images
let gif_welcome;
let img_gamestart;

// Joint Positions, Establishes the joints that can be used
// Wrists
let leftwristx;
let leftwristy;

let rightwristx;
let rightwristy;

// Elbows
let leftelbowx;
let leftelbowy;

let rightelbowx;
let rightelbowy;

// Shoulders
let leftshoulderx;
let leftshouldery;

let rightshoulderx;
let rightshouldery;

// Hips
let righthipx;
let righthipy;

let lefthipx;
let lefthipy;

// Knees
let leftkneex;
let leftkneey;

let rightkneey;
let rightkneex;

//Foot
let leftfootx;
let leftfooty;

let rightfootx;
let rightfooty;

// Is the joint in the right place?
let leftwristcorrect;
let leftelbowcorrect;
let leftkneecorrect;
let leftfootcorrect;
let rightwristcorrect;
let rightelbowcorrect;
let rightkneecorrect;
let rightfootcorrect;

// Sensors, determines if the joint is in the right place
let img_sensor;
let img_sensorgood;

let leftwristsensor;
let leftelbowsensor;
let leftkneesensor;
let leftfootsensor;
let rightwristsensor;
let rightelbowsensor;
let rightkneesensor;
let rightfootsensor;

// Star Count/Score

let img_result;


//--------------------------------------- LOADING GAME ---------------------------------------//
function preload() {
  // preload() runs once, loads all required images
  img_pose1 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/a2d8929a-500f-45f6-ba08-530d494fe409.Pose%201%20(1).png?v=1689616946306');
  img_pose2 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/94a0e3c4-7a72-42d8-91a8-a66091cd5c21.Pose%202%20(1).png?v=1689616946195');
  img_pose3 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/c795003c-007a-4bb2-a386-6a60279768af.Pose%2013.png?v=1689616945921');
  img_pose4 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/9450f93e-9e3d-404d-a270-600bb5f25b89.Pose%2014.png?v=1689616945849');
  img_pose5 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/48c9bd5c-c429-497b-b1ea-4265c71415e5.Pose%2025.png?v=1689616945587');
  img_pose6 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/54cc9fe9-b15c-427b-a7bd-cf65781ffab5.Pose%2026.png?v=1689616945629');
  img_pose7 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/e81cb448-0d80-4bc6-806f-2b0b5de79425.Pose%2037.png?v=1689616946243');
  img_pose8 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/94d66c71-6b31-4480-9868-fe7cdcbb5934.Pose%2038.png?v=1689616945954');
  gif_welcome = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/d5e3ff65-2f7f-4dd3-ab7a-77dbd6c4b854.Welcome-Copy%20(1).png?v=1689616945762');
  img_gamestart = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/3c03b4d1-6717-4f06-8f77-6e05af2d0301.Instruction-Copy%20(1).png?v=1689616946459');
  img_result = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/3825f6e1-5716-49f7-b8f7-fd4ed97ad467.Instructions%20(final%20screen)%20-%20Copy%20(1).png?v=1689616945528');
  img_sensor = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/sensor.png?v=1689170812652')
  img_sensorgood = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/sensorcorrect.png?v=1689170812819')
}

async function init() {
  //Loads the pose detector
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.PoseNet,
    detectorConfig
  );
}

async function videoReady() {
  // Loads the video + the points in the poses
  console.log("video ready");
  await getPoses();
}

async function setup() {
  // Creates canvas to display game.
  frameRate(60);
  createCanvas(640, 480);
    
  countDown = 15*1000;//10 sec countdown, put 15 bc movenet setup takes 5
  console.log(countDown);
  
  video = createCapture(VIDEO, videoReady);
  video.hide();
  console.log(video.width);
  console.log(video.height);
  await tf.ready();

  await init();
  await getPoses();
}

async function getPoses() {
  // Gets points in the poses
  poses = await detector.estimatePoses(video.elt);
  requestAnimationFrame(getPoses);
}

function draw() {
  // Draws the current game state
  background(0);
  
  // Sets time for the game
  let currentTime = int(millis()/1000);
  
  //----------------DISPLAY GAME STATE----------------
  if (done){
    // If you have finished the game, shows you your earned stars
    fill(0);
    textSize(30);
    image(img_result,0,0);
  }
  
  if (in_frame >= 4 && !main_start){
    //checking if player in frame to start main game loop
    mainStartTime = currentTime;
    main_start=true;
  }
  
  //----------------GAME START SCREEN----------------
  if (main_start && !game1 && !game2 && !game3 && !game4&& !game5 && !game6 &&!game7 &&!game8 && !game9 && !game10 && !game11 && !game12&& !game13 && !game14 &&!game15 &&!game16&& !game17 && !game18 && !game19 && !game20&& !game21 && !game22 &&!game23 &&!game24 &&!done){
    image(img_gamestart,0,0);
    let startCountDown = currentTime - mainStartTime;
    //console.log(10-startCountDown);
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(10-startCountDown, 300, 230);
    if (startCountDown >= 8){
      //start timer for the 1st posture, this is usually logged at the prev WIN
      game1StartTime = currentTime;
      game1 = true;
      console.log("posture1!");
    }
  }
  //----------------Game 1 Pose1 5sec----------------
  else if (main_start && game1){ 
      image(img_pose1, 0,0);
    
      //Countdown
      startCountDown = currentTime - game1StartTime;
      fill("yellow");
      textSize(50);
      //translate(width, 0); // Translate to the right edge of the canvas
      //scale(-1, 1); // Flip the canvas horizontally    
      text(3-startCountDown, 300, 230);
  }
  //----------------Game 2 Pose2----------------
    else if (main_start && game2){
      image(img_pose2, 0,0);
      startCountDown = currentTime - game2StartTime;
      fill("yellow");
      textSize(50);
      //translate(width, 0); // Translate to the right edge of the canvas
      //scale(-1, 1); // Flip the canvas horizontally    
      text(3-startCountDown, 300, 230);
  }
  //----------------Game 3 Pose3----------------
  else if (main_start && game3){
      image(img_pose1, 0,0);
      startCountDown = currentTime - game3StartTime;
      fill("yellow");
      textSize(50);
      //translate(width, 0); // Translate to the right edge of the canvas
      //scale(-1, 1); // Flip the canvas horizontally    
      text(3-startCountDown, 300, 230);
  }
  //----------------Game 4 Pose4----------------
  else if (main_start &&game4){
    image(img_pose2,0,0);
    startCountDown = currentTime - game4StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }
  //----------------Game 5 pose5----------------
  else if (main_start &&game5){
    image(img_pose1,0,0);
    startCountDown = currentTime - game5StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }
  //----------------Game 6 pose6----------------
  else if (main_start &&game6){
    image(img_pose2,0,0);
    startCountDown = currentTime - game6StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }
  //-------------------------------------------------------------------------
  //----------------Game 7 Pose7----------------
  else if (main_start &&game7){
    image(img_pose3,0,0);
    // Need = Countdown
    startCountDown = currentTime - game7StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }
  //----------------Game 8 Pose8----------------
    else if (main_start &&game8){
    image(img_pose4,0,0);
    // Need = Countdown
    startCountDown = currentTime - game8StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game9){
    image(img_pose3,0,0);
    // Need = Countdown
    startCountDown = currentTime - game9StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game10){
    image(img_pose4,0,0);
    // Need = Countdown
    startCountDown = currentTime - game10StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game11){
    image(img_pose3,0,0);
    // Need = Countdown
    startCountDown = currentTime - game11StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game12){
    image(img_pose4,0,0);
    // Need = Countdown
    startCountDown = currentTime - game12StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game13){
    image(img_pose5,0,0);
    // Need = Countdown
    startCountDown = currentTime - game13StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game14){
    image(img_pose6,0,0);
    // Need = Countdown
    startCountDown = currentTime - game14StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game15){
    image(img_pose5,0,0);
    // Need = Countdown
    startCountDown = currentTime - game15StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game16){
    image(img_pose6,0,0);
    // Need = Countdown
    startCountDown = currentTime - game16StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game17){
    image(img_pose5,0,0);
    // Need = Countdown
    startCountDown = currentTime - game17StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game18){
    image(img_pose6,0,0);
    // Need = Countdown
    startCountDown = currentTime - game18StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game19){
    image(img_pose7,0,0);
    // Need = Countdown
    startCountDown = currentTime - game19StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game20){
    image(img_pose8,0,0);
    // Need = Countdown
    startCountDown = currentTime - game20StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game21){
    image(img_pose7,0,0);
    // Need = Countdown
    startCountDown = currentTime - game21StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game22){
    image(img_pose8,0,0);
    // Need = Countdown
    startCountDown = currentTime - game22StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game23){
    image(img_pose7,0,0);
    // Need = Countdown
    startCountDown = currentTime - game23StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }    else if (main_start &&game24){
    image(img_pose8,0,0);
    // Need = Countdown
    startCountDown = currentTime - game24StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(3-startCountDown, 300, 230);
  }

  // Fail safe game start screen
  else if (!main_start){
    image(gif_welcome,0,0);
    //gif_welcome.play();
  }
  //tint(255, 100);
  translate(width, 0); // Flip the canvas horizontally
  scale(-1, 1); // Flip the video horizontally
  //image(video, 0, 0);
  //console.log("(", mouseX,",",mouseY,")");
  //console.log(correct, win);
  //countDown-=deltaTime;
  //console.log(countDown);

  
  //----------------CHECK WINS----------------
  //can potentially move this part to body tracking code part
 if (game1 && correct >= 3  && !win){
    win=true;
    game1WinTime = currentTime;
    console.log("User wins game 1");
    numWins++;
    console.log("Game 1 win time is "+game1WinTime);
  } else if (game2 && correct >= 3  && !win){
    win=true;
    game2WinTime = currentTime;
    console.log("User wins game 2");
    numWins++;
    console.log("Game 2 win time is "+game2WinTime);
  }
  else if (game3 && correct >= 3  && !win){
    win=true;
    game3WinTime = currentTime;
    console.log("User wins game 2");
    numWins++;
    console.log("Game 2 win time is "+game2WinTime);
  }
  else if (game4 && correct >= 3  && !win){
    win=true;
    game4WinTime = currentTime;
    console.log("User wins game 2");
    numWins++;
    console.log("Game 2 win time is "+game2WinTime);
  }
  
  else if (game5 && correct >= 3  && !win){
    win=true;
    game5WinTime = currentTime;
    console.log("User wins game 5");
    numWins++;
    console.log("Game 5 win time is "+game5WinTime);
  } else if (game6 && correct >=3  && !win){
    win=true;
    game6WinTime = currentTime;
    console.log("User wins game 6");
    numWins++;
    console.log("Game 6 win time is "+game6WinTime);
  } else if (game7 && correct >=3  && !win){
    win=true;
    game7WinTime = currentTime;
    console.log("User wins game 7");
    numWins++;
    console.log("Game 7 win time is "+game7WinTime);
  } else if (game8 && correct >=3  && !win){
    win=true;
    game8WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game9 && correct >=3  && !win){
    win=true;
    game9WinTime = currentTime;
    console.log("User wins game 9");
    numWins++;
    console.log("Game 9 win time is "+game9WinTime);
  }else if (game10 && correct >=3  && !win){
    win=true;
    game10WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game11 && correct >=3  && !win){
    win=true;
    game11WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game12 && correct >=3  && !win){
    win=true;
    game12WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game13 && correct >=3  && !win){
    win=true;
    game13WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game14 && correct >=3  && !win){
    win=true;
    game14WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game15 && correct >=3  && !win){
    win=true;
    game15WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game16 && correct >=3  && !win){
    win=true;
    game16WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game17 && correct >=3  && !win){
    win=true;
    game17WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game18 && correct >=3  && !win){
    win=true;
    game18WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game19 && correct >=3  && !win){
    win=true;
    game19WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game20 && correct >=3  && !win){
    win=true;
    game20WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game21 && correct >=3  && !win){
    win=true;
    game21WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game22 && correct >=3  && !win){
    win=true;
    game22WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game23 && correct >=3  && !win){
    win=true;
    game23WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }else if (game24 && correct >=3  && !win){
    win=true;
    game24WinTime = currentTime;
    console.log("User wins game 8");
    numWins++;
    console.log("Game 8 win time is "+game8WinTime);
  }
  
  
  //----------------WIN LOGIC----------------
  //display you win, and move on to the next game
  if (win==true){
    fill(255);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally
    text("YOU GOT IT!", 300, 230);

    if (game1 && currentTime-game1WinTime ==1){
        game1 = false;
        win = false;
        game2StartTime = currentTime;
        game2 = true;
        }
     else if (game2 && currentTime-game2WinTime==1){
      game2 = false;
      win = false;
      game3StartTime = currentTime;
      game3 = true;
    } 
    //crab
    else if (game3 && currentTime-game3WinTime==1){
      game3 = false;
      win = false;
      game4StartTime = currentTime;
      game4 = true;
    } 
    //when game4 win
    else if (game4 && currentTime-game4WinTime==1){
      //image(img_1star,0,0);
      game4 = false;
      win = false;
      game5StartTime = currentTime;
      game5 = true;
      //done=true;
    }
    //when game5 win
    else if (game5 && currentTime-game5WinTime==1){
      game5 = false;
      win = false;
      game6StartTime = currentTime;
      game6 = true;
    }
    //when game6 win
    else if (game6 && currentTime-game6WinTime==1){
      game6 = false;
      win = false;
      game7StartTime = currentTime;
      game7 = true;
    }
    //when game7 win
    else if (game7 && currentTime-game7WinTime==1){
      game7 = false;
      win = false;
      game8StartTime = currentTime;
      game8 = true;
    }
    //when game8 win
    else if (game8 && currentTime-game8WinTime==1){
      game8 = false;
      win = false;
      game9StartTime = currentTime;
      game9 = true;
    }
    else if (game9 && currentTime-game9WinTime==1){
      game9 = false;
      win = false;
      game10StartTime = currentTime;
      game10 = true;
    }
    else if (game10 && currentTime-game10WinTime==1){
      game10 = false;
      win = false;
      game11StartTime = currentTime;
      game11 = true;
    }
    else if (game11 && currentTime-game11WinTime==1){
      game11 = false;
      win = false;
      game12StartTime = currentTime;
      game12 = true;
    }
    else if (game12 && currentTime-game12WinTime==1){
      game12 = false;
      win = false;
      game13StartTime = currentTime;
      game13 = true;
    }
    else if (game13 && currentTime-game13WinTime==1){
      game13 = false;
      win = false;
      game14StartTime = currentTime;
      game14 = true;
    }
    else if (game14 && currentTime-game14WinTime==1){
      game14 = false;
      win = false;
      game15StartTime = currentTime;
      game15 = true;
    }
    else if (game15 && currentTime-game15WinTime==1){
      game15 = false;
      win = false;
      game16StartTime = currentTime;
      game16 = true;
    }
    else if (game16 && currentTime-game16WinTime==1){
      game16 = false;
      win = false;
      game17StartTime = currentTime;
      game17 = true;
    }
    else if (game17 && currentTime-game17WinTime==1){
      game17 = false;
      win = false;
      game18StartTime = currentTime;
      game18 = true;
    }
    else if (game18 && currentTime-game18WinTime==1){
      game18 = false;
      win = false;
      game19StartTime = currentTime;
      game19 = true;
    }
    else if (game19 && currentTime-game19WinTime==1){
      game19 = false;
      win = false;
      game20StartTime = currentTime;
      game20 = true;
    }
    else if (game20 && currentTime-game20WinTime==1){
      game20 = false;
      win = false;
      game21StartTime = currentTime;
      game21 = true;
    }
    else if (game21 && currentTime-game21WinTime==1){
      game21 = false;
      win = false;
      game22StartTime = currentTime;
      game22 = true;
    }
    else if (game22 && currentTime-game22WinTime==1){
      game22 = false;
      win = false;
      game23StartTime = currentTime;
      game23 = true;
    }
    else if (game23 && currentTime-game23WinTime==1){
      game23 = false;
      win = false;
      game24StartTime = currentTime;
      game24 = true;
    }
    else if (game24 && currentTime-game24WinTime==1){
      game24 = false;
      win = false;
      done = true;
    }
    }
  
  
  
  //----------------TIME ELAPSE CODE----------------
  //display times up, and move on to the next game
  //Times up for game1
  if(startCountDown >= 3 && game1){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game1");
    //this is used to time the posture
    game2StartTime = currentTime;
    // if (game1 && startCountDown>=5){
      console.log("STARTING GAME 2");
      game1 = false;
      win = false;
      game2 = true;
    // }
     } 
    //Times up for game2
  else if(startCountDown >= 3 && game2){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game2");

    //this is used to time the posture
    game3StartTime = currentTime;
    // if (game2 && startCountDown>=5){
      console.log("STARTING GAME 3");

      game2 = false;
      win = false;
      game3 = true;
    // }
     } 
  //Times up for game3
  else if (startCountDown >= 3 && game3){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally 
    text("TIME'S UP!", 300, 230);
    console.log("User loses game3");

    //this is used to time the posture
    game4StartTime = currentTime;
    // if (game3 && startCountDown>=5){
      game3 = false;
      win = false;
      game4 = true;
    // }
    }
  
  //Times up for game4
  else if (startCountDown >= 3 && game4){
    fill(255);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game4");

    game5StartTime = currentTime;

    // if (game4 && startCountDown>=5){
    game4 = false;
    win = false;
    game5 = true
    // }
  }
  
    //Times up for game5
  else if (startCountDown >= 3 && game5){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game5");

    game6StartTime = currentTime;

    // if (game5 && startCountDown>=5){//this might be 7 (alternate?)
    game5 = false;
    win = false;
    game6 = true;
    // }
  }
  
   //Times up for game6
  else if (startCountDown >= 3 && game6){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game6");
    game7StartTime = currentTime;

    // if (game6 && startCountDown>=5){
    game6 = false;
      console.log("Game 6 is now" + game6);
    win = false;
    game7 = true;
    // }
  }
  
  //Times up for game7
  else if (startCountDown >= 3 && game7){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game7");
    game8StartTime = currentTime;

    // if (game7 && startCountDown>=5){
    game7 = false;
      console.log("Game 7 is now" + game7);
    win = false;
    game8=true;
    // }
  }
  
   //Times up for game8
  else if (startCountDown >= 3 && game8){
    fill(0);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally    
    text("TIME'S UP!", 300, 230);
    console.log("User loses game8");
    game9StartTime = currentTime;

    // if (game8 && startCountDown>=5){
    game8 = false;
      console.log("Game 8 is now" + game8);
    win = false;
    game9=true;
    // }
  }
  
     //Times up for game8
     else if (startCountDown >= 3 && game9){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game10StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game9 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game10=true;
      // }
    }

         //Times up for game8
         else if (startCountDown >= 3 && game10){
          fill(0);
          textSize(30);
          translate(width, 0); // Translate to the right edge of the canvas
          scale(-1, 1); // Flip the canvas horizontally    
          text("TIME'S UP!", 300, 230);
          console.log("User loses game8");
          game11StartTime = currentTime;
      
          // if (game8 && startCountDown>=5){
          game10 = false;
            console.log("Game 8 is now" + game8);
          win = false;
          game11=true;
          // }
        }
     //Times up for game8
     else if (startCountDown >= 3 && game11){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game12StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game11 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game12=true;
      // }
    }
     //Times up for game8
     else if (startCountDown >= 3 && game12){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game13StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game12 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game13=true;
      // }
    }
         //Times up for game8
         else if (startCountDown >= 3 && game13){
          fill(0);
          textSize(30);
          translate(width, 0); // Translate to the right edge of the canvas
          scale(-1, 1); // Flip the canvas horizontally    
          text("TIME'S UP!", 300, 230);
          console.log("User loses game8");
          game14StartTime = currentTime;
      
          // if (game8 && startCountDown>=5){
          game13 = false;
            console.log("Game 8 is now" + game8);
          win = false;
          game14=true;
          // }
        }
     //Times up for game8
     else if (startCountDown >= 3 && game14){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game15StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game14 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game15=true;
      // }
    }

     //Times up for game8
     else if (startCountDown >= 3 && game15){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game16StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game15 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game16=true;
      // }
    }
         //Times up for game8
         else if (startCountDown >= 3 && game16){
          fill(0);
          textSize(30);
          translate(width, 0); // Translate to the right edge of the canvas
          scale(-1, 1); // Flip the canvas horizontally    
          text("TIME'S UP!", 300, 230);
          console.log("User loses game8");
          game17StartTime = currentTime;
      
          // if (game8 && startCountDown>=5){
          game16 = false;
            console.log("Game 8 is now" + game8);
          win = false;
          game17=true;
          // }
        }
     //Times up for game8
     else if (startCountDown >= 3 && game17){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game18StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game17 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game18=true;
      // }
    }
     //Times up for game8
     else if (startCountDown >= 3 && game18){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game19StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game18 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game19=true;
      // }
    }
     //Times up for game8
     else if (startCountDown >= 3 && game19){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game20StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game19 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game20=true;
      // }
    }
     //Times up for game8
     else if (startCountDown >= 3 && game20){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game21StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game20 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game21=true;
      // }
    }
     //Times up for game8
     else if (startCountDown >= 3 && game21){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      game22StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game21 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      game22=true;
      // }
    }
         //Times up for game8
         else if (startCountDown >= 3 && game22){
          fill(0);
          textSize(30);
          translate(width, 0); // Translate to the right edge of the canvas
          scale(-1, 1); // Flip the canvas horizontally    
          text("TIME'S UP!", 300, 230);
          console.log("User loses game8");
          game23StartTime = currentTime;
      
          // if (game8 && startCountDown>=5){
          game22 = false;
            console.log("Game 8 is now" + game8);
          win = false;
          game23=true;
          // }
        }
       //Times up for game8
       else if (startCountDown >= 3 && game23){
        fill(0);
        textSize(30);
        translate(width, 0); // Translate to the right edge of the canvas
        scale(-1, 1); // Flip the canvas horizontally    
        text("TIME'S UP!", 300, 230);
        console.log("User loses game8");
        game24StartTime = currentTime;
    
        // if (game8 && startCountDown>=5){
        game23 = false;
          console.log("Game 8 is now" + game8);
        win = false;
        game24=true;
        // }
      }
     //Times up for game8
     else if (startCountDown >= 3 && game24){
      fill(0);
      textSize(30);
      translate(width, 0); // Translate to the right edge of the canvas
      scale(-1, 1); // Flip the canvas horizontally    
      text("TIME'S UP!", 300, 230);
      console.log("User loses game8");
      //game10StartTime = currentTime;
  
      // if (game8 && startCountDown>=5){
      game24 = false;
        console.log("Game 8 is now" + game8);
      win = false;
      done=true;
      // }
    }



  //----------------BODY TRACKING----------------
  if (poses && poses.length > 0 && !done) {
      index1=0;
  
//-----------------SKELETON-------------
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        if (index1==10){
          rightwristx = x;
          rightwristy = y;
        } else if (index1==8){
          rightelbowx = x;
          rightelbowy = y;
        }else if (index1==6){
          rightshoulderx = x;
          rightshouldery = y;
        }else if (index1==9){
          leftwristx = x;
          leftwristy = y;
        }else if (index1==7){
          leftelbowx = x;
          leftelbowy = y;
        }else if (index1==5){
          leftshoulderx = x;
          leftshouldery = y;
        }else if (index1==11){
          lefthipx = x;
          lefthipy = y;
        }else if (index1==13){
          leftkneex = x;
          leftkneey = y;
        }else if (index1==15){
          leftfootx = x;
          leftfooty = y;
        }else if (index1==12){
          righthipx = x;
          righthipy = y;
        }else if (index1==14){
          rightkneex = x;
          rightkneey = y;
        }else if (index1==16){
          rightfootx = x;
          rightfooty = y;
        }
      }
       index1++;
    }
    
    stroke(255,255,255,128);
    strokeWeight(2);
    line(rightwristx,rightwristy,rightelbowx,rightelbowy);
    line(leftwristx,leftwristy,leftelbowx,leftelbowy);
    line(rightelbowx,rightelbowy,rightshoulderx,rightshouldery);
    line(leftelbowx,leftelbowy,leftshoulderx,leftshouldery);
    line(rightshoulderx,rightshouldery,leftshoulderx,leftshouldery);
    line(rightshoulderx,rightshouldery,righthipx,righthipy);
    line(leftshoulderx,leftshouldery,lefthipx,lefthipy);
    line(lefthipx,lefthipy,righthipx,righthipy);
    line(lefthipx,lefthipy,leftkneex,leftkneey);
    line(righthipx,righthipy,rightkneex,rightkneey);
    line(rightkneex,rightkneey,rightfootx,rightfooty);
    line(leftkneex,leftkneey,leftfootx,leftfooty);

    if (!main_start){
      index=0;
      in_frame=0;
      for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 5){
          //console.log("coordinate for left wrist is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
            
          }
        } else if(index==6){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        } else if (index==11){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        } else if (index==12){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        }else if (index==0){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
          if (x>214 && x<435){
            in_frame++;
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
    //1 - pose1
    else if (main_start && game1 || main_start && game3 ||main_start && game5){
      index=0;
      correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
          //circle(x, y, 10);
          image(img_sensor, x-5, y-5);
          if (x>390 && x<450 && y>194 && y<242){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          //circle(x, y, 10);
          image(img_sensor, x-5, y-5);
          if (x>187 && x<251 && y>195 && y<257){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>360 && x<418 && y>145 && y<202){
            correct++;
            image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>232 && x<282 && y>148 && y<213){
            correct++;
            image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>315 && x<377 && y>311 && y<365){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>265 && x<325 && y>308 && y<373){
            correct++;
            image(img_sensorgood, x-20,y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
    //2 - pose2
    else if (main_start && game2||main_start && game4||main_start && game6){
      index=0;
      correct = 0;
      console.log("Currently in game2 loop");
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
        console.log("JOINT 9 is "+x+" "+y);
        //circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>382 && x<466 && y>13 && y<75){
            console.log("Sensor Should Show");
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        }
        else if(index==10){
          console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>206 && x<285 && y>5 && y<75){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>369 && x<440 && y>55 && y<121){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>241 && x<317 && y>52 && y<129){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>334 && x<400 && y>305 && y<371){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>282 && x<353 && y>302 && y<373){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
    //3 - pose3
    else if(main_start && game7 || main_start && game9 ||main_start && game11){
    index=0;
    correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
        circle(x, y, 10);
        leftwristsensor = image(img_sensor, x-5, y-5);
          if (x>323 && x<392 && y>172 && y<240){
            correct++;
            console.log("Sensor Should Show");
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>246 && x<316 && y>172 && y<242){
            correct++;
            console.log("Sensor Should Show");
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>322 && x<390 && y>223 && y<290){
            correct++;
            console.log("Sensor Should Show");
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>246 && x<313 && y>228 && y<298){
            correct++;
            console.log("Sensor Should Show");
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>295 && x<362 && y>298 && y<369){
            correct++;
            console.log("Sensor Should Show");
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>248 && x<316 && y>304 && y<378){
            correct++;
            console.log("Sensor Should Show");
            rightkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
    //4 - pose4
    else if (main_start && game8||main_start && game10||main_start && game12){
      index=0;
      console.log(poses);
     for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill(255);
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
        //circle(x, y, 10);
          leftwristy = y;
          fill(255);
        leftwristsensor = image(img_sensor, x-5, y-5);
        if (x>323 && x<392 && y>152 && y<220){
          correct++;
          leftwristsensor = image(img_sensorgood, x-20, y-20);
        }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        //circle(x, y, 10);
          rightwristy = y;
        rightwristsensor = image(img_sensor, x-5, y-5);
        if (x>246 && x<316 && y>152 && y<222){
          correct++;
          rightwristsensor = image(img_sensorgood, x-20, y-20);
        }
        } else if (index==7){
          //console.log("coordinate for left elbow is: "+x+" "+y);
            circle(x, y, 10);
            leftelbowsensor = image(img_sensor, x-5, y-5);
              if (x>322 && x<390 && y>203 && y<270){
                correct++;
                console.log("Sensor Should Show");
                leftelbowsensor = image(img_sensorgood, x-20, y-20);
              }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>246 && x<313 && y>208 && y<278){
            correct++;
            console.log("Sensor Should Show");
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
        //console.log("coordinate for left knee is: "+x+" "+y);
        //circle(x, y, 10);
        leftkneey = y;
        leftkneesensor = image(img_sensor, x-5, y-5);
        if (x>295 && x<362 && y>298 && y<369){
          correct++;
          console.log("Sensor Should Show");
          leftkneesensor = image(img_sensorgood, x-20, y-20);
        }
        }else if (index==14){
        //console.log("coordinate for right knee is: "+x+" "+y);
        //circle(x, y, 10);
        rightkneey = y;
        rightkneesensor = image(img_sensor, x-5, y-5);
        if (x>248 && x<316 && y>304 && y<378){
          correct++;
          console.log("Sensor Should Show");
          rightkneesensor = image(img_sensorgood, x-20, y-20);
        }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
   }
    }
    
     //5 - pose5
    else if(main_start && game13||main_start && game15||main_start && game17){
    index=0;
    correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
        //circle(x, y, 10);
        leftwristsensor = image(img_sensor, x-5, y-5);
          if (x>326 && x<397 && y>5 && y<80){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>250 && x<325 && y>0 && y<74){
            correct++;
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>340 && x<422 && y>56 && y<133){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>228 && x<309 && y>59 && y<131){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>308 && x<386 && y>344 && y<418){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>289 && x<365 && y>305 && y<384){
            correct++;
            rightkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
    
     //6 - pose6
    else if(main_start && game14||main_start && game16||main_start && game18){
    index=0;
    correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
        circle(x, y, 10);
        leftwristsensor = image(img_sensor, x-5, y-5);
          if (x>342 && x<425 && y>53 && y<128){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>214 && x<296 && y>46 && y<128){
            correct++;
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>104 && x<188 && y>354 && y<448){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>204 && x<288 && y>115 && y<186){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>343 && x<406 && y>300 && y<383){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>291 && x<357 && y>311 && y<384){
            correct++;
            rightkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
    
     //7 - Pose7
    else if (main_start && game19||main_start && game21||main_start && game23){
      index=0;
      correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
          circle(x, y, 10);
          leftwristsensor = image(img_sensor, x-5, y-5);
          if (x>316 && x<386 && y>208 && y<295){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          circle(x, y, 10);
          rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>256 && x<322 && y>212 && y<282){
            rightwristsensor = image(img_sensorgood, x-20, y-20);
            correct++;
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5,y-5);
          if (x>335 && x<423 && y>160 && y<241){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5,y-5);
          if (x>215 && x<299 && y>161 && y<240){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>319 && x<410 && y>317 && y<400){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5,y-5);
          if (x>228 && x<319 && y>327 && y<400){
            correct++;
            rightkneesensor = image(img_sensorgood, x-20,y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    }
  
      //8 - Pose8
    else if (main_start && game20||main_start && game22||main_start && game24){
      index=0;
      correct = 0;
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
          //console.log("coordinate for left wrist is: "+x+" "+y);
          circle(x, y, 10);
          leftwristsensor = image(img_sensor, x-5, y-5);
          if (x>426 && x<516 && y>64 && y<150){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          circle(x, y, 10);
          rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>126 && x<210 && y>67 && y<151){
            rightwristsensor = image(img_sensorgood, x-20, y-20);
            correct++;
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5,y-5);
          if (x>367 && x<455 && y>82 && y<165){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5,y-5);
          if (x>187 && x<276 && y>79 && y<179){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>319 && x<425 && y>321 && y<409){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5,y-5);
          if (x>226 && x<319 && y>323 && y<404){
            correct++;
            rightkneesensor = image(img_sensorgood, x-20,y-20);
          }
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
    }
    } 
}
}
