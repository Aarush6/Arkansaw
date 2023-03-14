India1="";
India2="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_India1 = "";
song_India2 = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    India1 = loadSound("music2.mp3");
    India2 = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_India1 = India1.isPlaying();
    console.log(song_India1);

    song_India2 = India2.isPlaying();
    console.log(song_India2);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        India2.stop();
        if(song_India1 == false){
            India1.play();
        }
        else{
            console.log("Song Name: India 1");
            document.getElementById("song_id").innerHTML = "Song Name: Sittharala Sirapadu ";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        India1.stop();
        if(song_India2 == false){
            India2.play();
        }
        else{
            console.log("Song Name: India2");
            document.getElementById("song_id").innerHTML = "Song Name: I don't knoow";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}