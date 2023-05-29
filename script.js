      $(document).ready(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var game = 'pause'; //game state
    var cherry_coords = 0; //coords of current cherry
    var count = 0; //current count of collected cherries


    var ball = { //parameters of our pacman
        color: 'yellow',
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 11,
    };

    flag = 'with_mouth';
    direction = 'right'; 
    
    setInterval(function(){ //this is animation of our pacman
        requestAnimationFrame(function(){
            if (game != 'pause'){
            drawBall(direction);
        }
        });
    }, 200);
    
    var maze = [ //this is full maze. Comment in Ukrainian about aproximate location of coords and walls they define
        {x: 5, y: 5, width: 590},
        {x: 5, y: 5, height: 590},
        {x: 5, y: 593, width: 590},
        {x: 593, y: 5, height: 590}, //рамка
        {x: 297, y: 5, height:75}, 
        {x: 297, y: 80, width: 8},
        {x: 303, y: 5, height: 75}, //посередині зверху
        {x: 167, y: 120, height: 150},
        {x: 173, y: 120, height: 150},
        {x: 167, y: 120, width: 8},
        {x: 167, y: 270, width: 8},
        {x: 172, y: 187, width: 70},
        {x: 172, y: 193, width: 70},
        {x: 242, y: 187, height: 8},//зверху зліва
        {x: 360, y: 187, width: 68},
        {x: 360, y: 193, width: 68},
        {x: 360, y: 187, height: 8},
        {x: 427, y: 120, height: 150},
        {x: 433, y: 120, height: 150},
        {x: 427, y: 120, width: 8},
        {x: 427, y: 270, width: 8}, // зверху справа
        {x: 230, y: 122, width: 140},
        {x: 230, y: 128, width: 140},
        {x: 230, y: 122, height: 8},
        {x: 370, y: 122, height: 8}, 
        {x: 297, y: 127, height: 70},
        {x: 303, y: 127, height: 70},
        {x: 297, y: 195, width: 8},//посередині зверху
        {x: 230, y: 250, width: 50},
        {x: 236, y: 256, width: 44},
        {x: 236, y: 256, height: 68},
        {x: 236, y: 324, width: 128},
        {x: 320, y: 250, width: 50},
        {x: 320, y: 256, width: 44},
        {x: 364, y: 256, height: 68},
        {x: 230, y: 250, height: 80},
        {x: 370, y: 250, height: 80},
        {x: 230, y: 330, width: 142},
        {x: 280, y: 250, height: 8},
        {x: 320, y: 250, height: 8}, //центр
        {x: 167, y: 310, height: 80}, 
        {x: 173, y: 310, height: 80},
        {x: 167, y: 310, width: 8}, 
        {x: 167, y: 390, width: 8}, //справа знизу по центру
        {x: 427, y: 310, height: 80},
        {x: 433, y: 310, height: 80},
        {x: 427, y: 310, width: 7},
        {x: 427, y: 390, width: 7}, //знизу справа
        {x: 230, y: 382, width: 142},
        {x: 230, y: 388, width: 142},
        {x: 230, y: 382, height: 8},
        {x: 372, y: 382, height: 8},
        {x: 297, y: 457, width: 8},
        {x: 304, y: 387, height: 70}, 
        {x: 298, y: 387, height: 70}, // знизу по центру
        {x: 165, y: 447, width: 80},
        {x: 165, y: 453, width: 80},
        {x: 165, y: 447, height: 8},
        {x: 245, y: 447, height: 8}, //зліва по центру знизу
        {x: 360, y: 447, width: 80},
        {x: 360, y: 453, width: 80},
        {x: 360, y: 447, height: 8},
        {x: 440, y: 447, height: 8},//справа знизу по центру
        {x: 230, y: 512, width: 142},
        {x: 230, y: 518, width: 142},
        {x: 230, y: 511, height: 8},
        {x: 372, y: 511, height: 8},
        {x: 298, y: 517, height: 78},
        {x: 304, y: 517, height: 78}, //знизу по центру
        {x: 5, y: 190, width: 110},
        {x: 115, y: 190, height: 75},
        {x: 5, y: 265, width: 110},
        {x: 5, y: 315, width: 110},
        {x: 115, y: 315, height: 75},
        {x: 5, y: 390, width: 110},
        {x: 5, y: 515, width: 50},
        {x: 5, y: 521, width: 50},
        {x: 55, y: 515, height: 7}, //зліва знизу
        {x: 60, y: 570, height: 20},
        {x: 60, y: 570, width: 100},
        {x: 160, y: 500, height: 70},
        {x: 160, y: 500, width: 20},
        {x: 180, y: 500, height: 70},
        {x: 180, y: 570, width: 60},
        {x: 240, y: 570, height: 20},
        {x: 360, y: 570, height: 20},
        {x: 360, y: 570, width: 60},
        {x: 420, y: 500, height: 70},
        {x: 420, y: 500, width: 20},
        {x: 440, y: 500, height: 70},
        {x: 440, y: 570, width: 100},
        {x: 540, y: 570, height: 20},//
        {x: 50, y: 450, width: 60}, 
        {x: 50, y: 456, width: 54},
        {x: 50, y: 450, height: 8},
        {x: 104, y: 456, height: 64},
        {x: 103, y: 520, width: 8},
        {x: 110, y: 450, height: 70}, //знизу зліва
        {x: 490, y: 450, width: 60},
        {x: 496, y: 456, width: 54},
        {x: 496, y: 456, height: 64},
        {x: 548, y: 450, height: 8},
        {x: 490, y: 520, width: 8}, //знизу справа

        {x: 490, y: 450, height: 70},
        {x: 487, y: 190, width: 108},
        {x: 487, y: 190, height: 75},
        {x: 487, y: 265, width: 108},
        {x: 487, y: 315, width: 108},
        {x: 487, y: 315, height: 75}, 
        {x: 487, y: 390, width: 108},//справа посередині
        {x: 550, y: 515, width: 42},
        {x: 550, y: 521, width: 42},
        {x: 550, y: 515, height: 7}, //справа знизу
        {x: 55, y: 35, width: 60}, //зверху
        {x: 55, y: 35, height: 35},
        {x: 55, y: 70, width: 60},
        {x: 115, y: 35, height: 35},
        {x: 55, y: 120, width: 60},
        {x: 55, y: 120, height: 20},
        {x: 55, y: 140, width: 60},
        {x: 115, y: 120, height: 20},
        {x: 160, y: 35, width: 90}, 
        {x: 160, y: 35, height: 35},
        {x: 160, y: 70, width: 90},
        {x: 250, y: 35, height: 35},
        {x: 350, y: 35, width: 90},
        {x: 350, y: 35, height: 35},
        {x: 350, y: 70, width: 90},
        {x: 440, y: 35, height: 35},
        {x: 485, y: 35, width: 60},
        {x: 485, y: 35, height: 35},
        {x: 485, y: 70, width: 60},
        {x: 545, y: 35, height: 35},
        {x: 485, y: 120, width: 60},
        {x: 485, y: 120, height: 20},
        {x: 485, y: 140, width: 60},
        {x: 545, y: 120, height: 20}
    ] 
    var cherriesLocation = [ //possible location of cherries
        {x: 30, y: 30},
        {x: 570, y: 30},
        {x: 570, y: 550},
        {x: 30, y: 550},
        {x: 300, y: 490},
        {x: 300, y: 230},
        {x: 580, y: 290},
        {x: 30, y: 290}
    ]


    function checkCollisions(direction) { //function for pacman not going through walls 
        if (direction == 'left'){
            for (var i = 0; i < maze.length; i++) {
                var wall = maze[i];
                if (wall.height != undefined){
                if (ball.x - ball.radius > wall.x){ //this how we determine that wall is on the left
                    if(wall.x >= ball.x - 10 - ball.radius && ball.y > wall.y && ball.y < wall.y + wall.height){
                        return false;
                    }
                }
            }
        }
    }
    if (direction == 'right'){
            for (var i = 0; i < maze.length; i++) {
                var wall = maze[i];
                if (wall.height != undefined){
                if (ball.x + ball.radius < wall.x){ //this how we determine that wall is on the right
                    if(wall.x <= ball.x + 10 + ball.radius && ball.y > wall.y && ball.y < wall.y + wall.height){
                        return false;
                    }
                }
            }
        }
    }
    if (direction == 'up'){
            for (var i = 0; i < maze.length; i++) {
                var wall = maze[i];
                if (wall.width != undefined){
                if (ball.y - ball.radius > wall.y){ //this how we determine that wall is at the top
                    if(wall.y >= ball.y - ball.radius - 10 && wall.x <= ball.x  && wall.x + wall.width >= ball.x ){ 
                        return false;
                    }
                }
            }
        }

    }
    if (direction == 'down'){
            for (var i = 0; i < maze.length; i++) {
                var wall = maze[i];
                if (wall.width != undefined){
                if (ball.y + ball.radius < wall.y){ //this how we determine that wall is ar the bottom
                    if(wall.y <= ball.y + ball.radius + 10 && wall.x <= ball.x  && wall.x + wall.width >= ball.x ){ //немає ball.x +- ball.radius, щоб не було багу, коли половина пакмена вилазить за стіну і через це він проходить
                        return false;
                    }
                }
            }
        }

    }

      
        
        return true; // No collision, Pacman can move
    }

    $(document).keypress(function (e) {
        if (game != 'pause'){
        
            if ((e.keyCode == 65 || e.keyCode == 97) && checkCollisions('left')){ // A key
                ball.x = ball.x - 10; // Move left
                direction = 'left';
                drawBall(direction);
            }
            if ((e.keyCode == 87 || e.keyCode == 119) && checkCollisions('up')){ // W key
                ball.y -= 10; // Move up
                direction = 'up';
                drawBall(direction);
            }
            if ((e.keyCode == 68 || e.keyCode == 100) && checkCollisions('right')){ // D key
                ball.x += 10; // Move right
                direction = 'right';
                drawBall(direction);
            }
            if ((e.keyCode == 83 || e.keyCode == 115) && checkCollisions('down')){ // S key
                ball.y += 10; // Move down
                direction = 'down';
                drawBall(direction);
            }

            if (checkCollisionCherry(cherry_coords.x, cherry_coords.y, direction, ball.x, ball.y)){ //here we check if our pacman will collide into cherry after movement
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    count += 1;
                    $('#current-count').text(count); //change count in top right corner
                    if (count == 3){
                        ctx.font = "48px serif";
                        ctx.fillText("You won!", canvas.width/2 - 20, canvas.height/2);
                        ctx.font = '24px serif';
                        ctx.fillText("Press SPACE if you want to start again", canvas.width/2 - 100, canvas.height/2 + 30);
                        cherry_coords = 0;
                        game = 'pause';
                        return;
                    }else{
                    drawBall();
                    decideNewCherry();
                }
                }
            
        }
        if (e.keyCode == 32) { //space key
            var elem = document.getElementById('game');
            if (game == 'pause'){
                game = 'play';
                var child = document.getElementById('play');
                elem.removeChild(child);
                elem.innerHTML += '<img src="pause.png" id="pause">';
                if (cherry_coords == 0){
                    decideNewCherry();

                }
            }else if (game == 'play'){
                game = 'pause';
                var child = document.getElementById('pause');
                elem.removeChild(child);
                elem.innerHTML += '<img src="play.png" id="play">';
            }
        }
    
    });

    function drawBall(direction){
        if (flag == "with_mouth"){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            ctx.fill();
            flag = "without_mouth";
            drawMaze();
            if (cherry_coords != 0){
                drawCherry(cherry_coords.x, cherry_coords.y);
            }
            
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            if (direction == 'left'){
                ctx.arc(ball.x, ball.y, ball.radius, Math.PI * 1.25, Math.PI * 0.75);
                ctx.lineTo(ball.x, ball.y);
            }else if (direction == 'right'){
                ctx.arc(ball.x, ball.y, ball.radius, Math.PI / 6, 11 * Math.PI / 6);
                ctx.lineTo(ball.x, ball.y);
            }else if (direction == 'down'){
                ctx.arc(ball.x, ball.y, ball.radius, Math.PI / 3, 2*Math.PI / 3, true);
                ctx.lineTo(ball.x, ball.y);
            }else if (direction == 'up'){
                ctx.arc(ball.x, ball.y, ball.radius, 4*Math.PI / 3, 5*Math.PI / 3, true);
                ctx.lineTo(ball.x, ball.y);
            }
            ctx.fill();
            flag = "with_mouth";
            drawMaze();

            if (cherry_coords != 0){
                drawCherry(cherry_coords.x, cherry_coords.y);
            }
        
            }
    }

    function drawMaze(){
        ctx.beginPath();
        for (var i = 0; i < maze.length; i++) {
            var wall = maze[i];
            ctx.moveTo(wall.x, wall.y);
            ctx.lineWidth = '3';
            if (wall.width !== undefined){
                ctx.lineTo(wall.x + wall.width, wall.y);
            } else if (wall.height !== undefined) {
                ctx.lineTo(wall.x, wall.y + wall.height);
            }
        }
        ctx.strokeStyle = "#000080";
       
        ctx.stroke();
    }

    function decideNewCherry() {
        previous = cherry_coords;
        cherry_coords = cherriesLocation[Math.floor(Math.random()*cherriesLocation.length)];
        while(cherry_coords == previous){ //to avoid situation, when new cherry will be located where the old one was
            cherry_coords = cherriesLocation[Math.floor(Math.random()*cherriesLocation.length)];
        }
        drawCherry(cherry_coords.x, cherry_coords.y);
    }

    function drawCherry(x, y){
        ctx.drawImage(document.getElementById('sourceCherry'), x - 15, y - 15, 30, 30);

    }

    function checkCollisionCherry(cherryX, cherryY, moveDirection, ballX, ballY) {
        if (moveDirection == 'left' && ballX - ball.radius > cherryX && cherryX + 15 >= ballX - ball.radius - 10 && cherryY + 15 >= ballY && cherryY - 15 <=ballY){ //here we are creating function for collision into cherry. First, we determine direction of pacman. Then we check if the next movement will collide in cherry. If yes, we return true. 10 in ballX - ball.radius - 10 represent speed of our pacman (which we've set in keypress event)
            return true;
        }
        if (moveDirection == 'right' && ballX + ball.radius < cherryX && cherryX - 15 <= ballX + ball.radius + 10 && cherryY + 15 >= ballY && cherryY - 15 <=ballY){ 
            return true;
        }

        if (moveDirection == 'up' && ballY - ball.radius > cherryY && cherryY + 15 >= ballY - ball.radius - 10 && cherryX + 15 >= ballX && cherryX - 15 <= ballX){ 
            return true;
        }
        if (moveDirection == 'down' && ballY + ball.radius < cherryY && cherryY - 15 <= ballY + ball.radius + 10 && cherryX + 15 >= ballX && cherryX - 15 <= ballX){ 
            return true;
        }
        return false;
    }

    drawBall();
});
