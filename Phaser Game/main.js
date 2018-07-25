
    
var deathCounter = 0;
var mainState = {  
    preload: function() { 
        game.load.spritesheet('player', 'media/orangehatlady.png' , 48 , 48 , 12)

        
        
        // Here we preload the assets
        
        //name image on the left, give path to image on the right 
    },

    create: function() { 
        // Here we create the game
        
        //change the game's background color
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = game.add.sprite(100, 125, 'player');
        
    this.player.animations.add('wd', [0,1,2],10, true);
    this.player.animations.add('wl', [3,4,5],10, true);
    this.player.animations.add('wr', [6,7,8],10, true);
    this.player.animations.add('wu', [9,10,11],10, true);
    
    this.player.animations.play('wl');
        
//var upkey;
//var downkey;
//var leftkey;
//var rightkey;
//var jumpkey;
        
        
//    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
//    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
//    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
//    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
          
        },

    update: function() {  
        // Here we update the game 60 times per second
        this.player.body.gravity.y = 600
        
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown){ 
            this.player.body.velocity.x = -200;
        }else if(this.cursor.right.isDown) {
           this.player.body.velocity.x = 200;
       }else{            this.player.body.velocity.x = 0;
        } 

//        Make the player jump if he is touching the ground
     if (this.cursor.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -250; 
        }
    },
//    
//    // Function to kill a coin
//    takeCoin: function(player, coin) {
//        coin.kill();
//        this.score++;
//    },
//
//// Function to restart the game
//    restart: function() {
//        deathCounter++;
 //       game.state.start('main');
    }
//};

// Initialize the game and start our state
var game = new Phaser.Game(500, 400);  
game.state.add('main', mainState);  
game.state.start('main');