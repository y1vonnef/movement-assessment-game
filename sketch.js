//--------------------------------------- VARIABLES ---------------------------------------//
// For Pose Detection
let detector; 
let poses; 
let video;
let speech;
let isSpeaking = false;
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

// Win Times, Checks Wins
let game1WinTime;
let game2WinTime;
let game3WinTime;
let game4WinTime;
let game5WinTime;
let game6WinTime;
let game7WinTime;
let game8WinTime;

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
let img_1star;
let img_2star;
let img_3star;
let img_result;


//--------------------------------------- LOADING GAME ---------------------------------------//
function preload() {
  // preload() runs once, loads all required images
  img_pose1 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/bdc424a2-6175-4ded-a083-daf53f4d050a.Pose%201.png?v=1689563080108');
  img_pose2 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/85f7a967-4139-404e-81f2-bd42c97520f2.Pose%202.png?v=1689563080224');
  img_pose3 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/48e61a9d-e78e-4fd7-aa4d-f1691971fd7a.Pose%203.png?v=1689563079951');
  img_pose4 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/3ab9d87f-8781-4ea6-908a-6c691beaa456.Pose%204.png?v=1689563080261');
  img_pose5 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/e779e311-1c1f-48e3-b8ae-d7c4424fcad5.Pose%205.png?v=1689563080078');
  img_pose6 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/08d20676-e218-4c98-b68f-98570740af93.Pose%206.png?v=1689563079508');
  img_pose7 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/550536b1-243c-41c4-a50f-82880dc4d256.Pose%207.png?v=1689563079508');
  img_pose8 = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/fae7e3f9-50b5-496b-9ff5-734dfb56f435.Pose%208.png?v=1689563079585');
  gif_welcome = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/8450eefc-f005-444c-8763-95589366e49b.Welcome-Copy.png?v=1689563079736');
  img_gamestart = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/17ce4661-1975-4e40-a38b-63b100d3ceb5.Instruction-Copy.png?v=1689563080044');
  img_result = loadImage('https://cdn.glitch.global/a8aeaf2d-c691-48c6-bc27-dca922a68fa3/109bf45a-8c06-498b-99f4-9ad92922af42.Instructions%20(final%20screen)%20-%20Copy.png?v=1689563079779');
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
    // if (numWins<3){
    // image(img_1star,0,0); 
    //   //text("You won "+numWins+" out of 6!", 300, 230);
    // }else if (numWins>2 && numWins <5){
    //   image(img_2star,0,0);
    //   //text("You won "+numWins+" out of 6!", 300, 230);
    // }else{
    //   image(img_3star,0,0);
    //   //text("You won "+numWins+" out of 6!", 300, 230);
    // }
  }
  
  if (in_frame >= 4 && !main_start){
    //checking if player in frame to start main game loop
    mainStartTime = currentTime;
    main_start=true;
  }
  
  //----------------GAME START SCREEN----------------
  if (main_start && !game1 && !game2 && !game3 && !game4&& !game5 && !game6 &&!game7 &&!game8 &&!done){
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
      text(5-startCountDown, 300, 230);
  }
  //----------------Game 2 Pose2----------------
    else if (main_start && game2){
      image(img_pose2, 0,0);
      startCountDown = currentTime - game2StartTime;
      fill("yellow");
      textSize(50);
      //translate(width, 0); // Translate to the right edge of the canvas
      //scale(-1, 1); // Flip the canvas horizontally    
      text(5-startCountDown, 300, 230);
  }
  //----------------Game 3 Pose3----------------
  else if (main_start && game3){
      image(img_pose3, 0,0);
      startCountDown = currentTime - game3StartTime;
      fill("yellow");
      textSize(50);
      //translate(width, 0); // Translate to the right edge of the canvas
      //scale(-1, 1); // Flip the canvas horizontally    
      text(5-startCountDown, 300, 230);
  }
  //----------------Game 4 Pose4----------------
  else if (main_start &&game4){
    image(img_pose4,0,0);
    startCountDown = currentTime - game4StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(5-startCountDown, 300, 230);
  }
  //----------------Game 5 pose5----------------
  else if (main_start &&game5){
    image(img_pose5,0,0);
    startCountDown = currentTime - game5StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(5-startCountDown, 300, 230);
  }
  //----------------Game 6 pose6----------------
  else if (main_start &&game6){
    image(img_pose6,0,0);
    startCountDown = currentTime - game6StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(5-startCountDown, 300, 230);
  }
  
  //----------------Game 7 Pose7----------------
  else if (main_start &&game7){
    image(img_pose7,0,0);
    // Need = Countdown
    console.log("startCountDown"+startCountDown);
    console.log("currentTime"+currentTime);
    console.log("game7StartTime"+game7StartTime);
    startCountDown = currentTime - game7StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(5-startCountDown, 300, 230);
  }
  //----------------Game 8 Pose8----------------
    else if (main_start &&game8){
    image(img_pose8,0,0);
    // Need = Countdown
    startCountDown = currentTime - game8StartTime;
    fill("yellow");
    textSize(50);
    //translate(width, 0); // Translate to the right edge of the canvas
    //scale(-1, 1); // Flip the canvas horizontally    
    text(5-startCountDown, 300, 230);
  }
  // //----------------Game 9 Pose5/Pose6----------------
  //   else if (main_start &&game9){
  //   image(img_pose5,0,0);
  //   // Need = Countdown
  //   startCountDown = currentTime - game9StartTime;
  //   console.log(10-startCountDown);
  //   fill("red");
  //   textSize(50);
  //   //translate(width, 0); // Translate to the right edge of the canvas
  //   //scale(-1, 1); // Flip the canvas horizontally    
  //   text(10-startCountDown, 300, 230);
  // }
  // //----------------Game 10 Pose7/Pose8----------------
  //   else if (main_start &&game10){
  //   image(img_pose7,0,0);
  //   // Need = Countdown
  //   startCountDown = currentTime - game10StartTime;
  //   console.log(10-startCountDown);
  //   fill("red");
  //   textSize(50);
  //   //translate(width, 0); // Translate to the right edge of the canvas
  //   //scale(-1, 1); // Flip the canvas horizontally    
  //   text(10-startCountDown, 300, 230);
  // }
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
  } else if (game5 && correct >= 3  && !win){
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
  }

  
  
  
  
  
  //----------------WIN LOGIC----------------
  //display you win, and move on to the next game
  if (win==true){
    fill(255);
    textSize(30);
    translate(width, 0); // Translate to the right edge of the canvas
    scale(-1, 1); // Flip the canvas horizontally
    text("YOU GOT IT!", 300, 230);

    if (game1 && currentTime-game1WinTime ==2){
        game1 = false;
        win = false;
        game2StartTime = currentTime;
        game2 = true;
        }
     else if (game2 && currentTime-game2WinTime==2){
      game2 = false;
      win = false;
      game3StartTime = currentTime;
      game3 = true;
    } 
    //crab
    else if (game3 && currentTime-game3WinTime==2){
      game3 = false;
      win = false;
      game4StartTime = currentTime;
      game4 = true;
    } 
    //when game4 win
    else if (game4 && currentTime-game4WinTime==2){
      //image(img_1star,0,0);
      game4 = false;
      win = false;
      game5StartTime = currentTime;
      game5 = true;
      //done=true;
    }
    //when game5 win
    else if (game5 && currentTime-game5WinTime==2){
      game5 = false;
      win = false;
      game6StartTime = currentTime;
      game6 = true;
    }
    //when game6 win
    else if (game6 && currentTime-game6WinTime==2){
      game6 = false;
      win = false;
      game7StartTime = currentTime;
      game7 = true;
    }
    //when game7 win
    else if (game7 && currentTime-game7WinTime==2){
      game7 = false;
      win = false;
      game8StartTime = currentTime;
      game8 = true;
    }
    //when game8 win
    else if (game8 && currentTime-game8WinTime==2){
      game8 = false;
      win = false;
      done = true;
    }
    }
  
  
  
  //----------------TIME ELAPSE CODE----------------
  //display times up, and move on to the next game
  //Times up for game1
  if(startCountDown >= 5 && game1){
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
  else if(startCountDown >= 5 && game2){
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
  else if (startCountDown >= 5 && game3){
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
  else if (startCountDown >= 5 && game4){
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
  else if (startCountDown >= 5 && game5){
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
  else if (startCountDown >= 5 && game6){
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
  else if (startCountDown >= 5 && game7){
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
  else if (startCountDown >= 5 && game8){
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
    
    stroke("white");
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
    else if (main_start && game1){
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
          image(img_sensor, x-5, y-5);
          if (x>340 && x<410 && y>225 && y<305){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          circle(x, y, 10);
          image(img_sensor, x-5, y-5);
          if (x>220 && x<290 && y>260 && y<340){
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>340 && x<420 && y>165 && y<240){
            correct++;
            image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>240 && x<320 && y>135 && y<210){
            correct++;
            image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>300 && x<370 && y>315 && y<390){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5,y-5);
          if (x>270 && x<340 && y>315 && y<390){
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
    
    //2 - unicorn game
    else if (main_start && game2){
      index=0;
      correct = 0;
      console.log("Currently in game2 loop");
    for (let kp of poses[0].keypoints) {
      const { x, y, score } = kp;
      if (score > 0.8) {
        console.log("Certainty level high enough"+index+" "+x+" "+y+" "+score);
        stroke("black");
        fill("red");
        strokeWeight(2);
        //if y coordinate diff between left knee and left foot is less than 100, you are wrong!
        //left knee is red, right knee is green, left foot is blue, right foot is black
        if (index == 9){
        console.log("coordinate for left wrist is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>235 && x<320 && y>15 && y<75){
            console.log("Sensor Should Show");
            correct++;
            image(img_sensorgood, x-20, y-20);
          }
        }
        else if(index==10){
          console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>235 && x<320 && y>15 && y<75){
            correct++;
            console.log("Sensor Should Show");
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>325 && x<390 && y>60 && y<135){
            correct++;
            console.log("Sensor Should Show");
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>275 && x<340 && y>60 && y<135){
            correct++;
            console.log("Sensor Should Show");
            image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>400 && x<500 && y>280 && y<375){
            correct++;
            console.log("Sensor Should Show");
            image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        image(img_sensor, x-5, y-5);
          if (x>220 && x<285 && y>240 && y<400){
            correct++;
            console.log("Sensor Should Show");
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
    
    //3 - crab game
    else if(main_start && game3){
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
          if (x>400 && x<480 && y>60 && y<160){
            correct++;
            console.log("Sensor Should Show");
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>160 && x<240 && y>60 && y<160){
            correct++;
            console.log("Sensor Should Show");
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>390 && x<470 && y>150 && y<250){
            correct++;
            console.log("Sensor Should Show");
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>165 && x<245 && y>150 && y<250){
            correct++;
            console.log("Sensor Should Show");
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>400 && x<500 && y>290 && y<390){
            correct++;
            console.log("Sensor Should Show");
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>145 && x<245 && y>290 && y<390){
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
    
    //4 - tarantula game
    else if (main_start && game4){
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
          fill("red");
          //console.log("coordinate for left wrist is: "+x+" "+y);
        circle(x, y, 10);
          leftwristy = y;
          fill(255);
        leftwristsensor = image(img_sensor, x-5, y-5);
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
          rightwristy = y;
        rightwristsensor = image(img_sensor, x-5, y-5);

        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
         leftkneey = y;
        leftkneesensor = image(img_sensor, x-5, y-5);
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
         rightkneey = y;
        rightkneesensor = image(img_sensor, x-5, y-5);
        }else{
        fill(255);
        circle(x, y, 10);
        }
      }
      index++;
   }
      
      console.log(leftwristy, leftkneey, rightwristy, rightkneey);
      if (leftwristy>leftkneey || rightwristy>rightkneey && !win){
      win = true;
      numWins++;
      game4WinTime = currentTime;
    }
    }
    //end of tarantula game
    
     //5 - flamingo game
    else if(main_start && game5){
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
          if (x>350 && x<400 && y>10 && y<60){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>260 && x<310 && y>225 && y<275){
            correct++;
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>350 && x<400 && y>70 && y<120){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>250 && x<300 && y>165 && y<215){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>315 && x<365 && y>350 && y<400){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>285 && x<335 && y>340 && y<390){
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
    
    
     //6 - starfish game
    else if(main_start && game6){
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
          if (x>445 && x<505 && y>10 && y<70){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
        circle(x, y, 10);
        rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>160 && x<220 && y>10 && y<70){
            correct++;
            rightwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5, y-5);
          if (x>385 && x<445 && y>50 && y<110){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5, y-5);
          if (x>200 && x<260 && y>50 && y<110){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>340 && x<400 && y>350 && y<410){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5, y-5);
          if (x>230 && x<290 && y>350 && y<410){
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
    
     //7 - Pose 01/02
    else if (main_start && game7){
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
          if (x>340 && x<410 && y>225 && y<305){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          circle(x, y, 10);
          rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>220 && x<290 && y>260 && y<340){
            rightwristsensor = image(img_sensorgood, x-20, y-20);
            correct++;
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5,y-5);
          if (x>340 && x<420 && y>165 && y<240){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5,y-5);
          if (x>240 && x<320 && y>135 && y<210){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>300 && x<370 && y>315 && y<390){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5,y-5);
          if (x>270 && x<340 && y>315 && y<390){
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
  
      //8 - Pose 03/04
    else if (main_start && game8){
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
          if (x>340 && x<410 && y>225 && y<305){
            correct++;
            leftwristsensor = image(img_sensorgood, x-20, y-20);
          }
        } else if(index==10){
          //console.log("coordinate for right wrist is: "+x+" "+y);
          circle(x, y, 10);
          rightwristsensor = image(img_sensor, x-5, y-5);
          if (x>220 && x<290 && y>260 && y<340){
            rightwristsensor = image(img_sensorgood, x-20, y-20);
            correct++;
          }
        } else if (index==7){
      //console.log("coordinate for left elbow is: "+x+" "+y);
        circle(x, y, 10);
        leftelbowsensor = image(img_sensor, x-5,y-5);
          if (x>340 && x<420 && y>165 && y<240){
            correct++;
            leftelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==8){
      //console.log("coordinate for right elbow is: "+x+" "+y);
        circle(x, y, 10);
        rightelbowsensor = image(img_sensor, x-5,y-5);
          if (x>240 && x<320 && y>135 && y<210){
            correct++;
            rightelbowsensor = image(img_sensorgood, x-20,y-20);
          }
        } else if (index==13){
      //console.log("coordinate for left knee is: "+x+" "+y);
        circle(x, y, 10);
        leftkneesensor = image(img_sensor, x-5, y-5);
          if (x>300 && x<370 && y>315 && y<390){
            correct++;
            leftkneesensor = image(img_sensorgood, x-20, y-20);
          }
        }else if (index==14){
      //console.log("coordinate for right knee is: "+x+" "+y);
        circle(x, y, 10);
        rightkneesensor = image(img_sensor, x-5,y-5);
          if (x>270 && x<340 && y>315 && y<390){
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
