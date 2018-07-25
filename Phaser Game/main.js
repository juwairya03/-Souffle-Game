
    
var deathCounter = 0;
var mainState = {  
    preload: function() { 
        game.load.spritesheet('player', 'media/orangehatlady.png' , 48 , 48 , 12)

    create: function() { 
        
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();

        this.player = game.add.sprite(100, 125, 'player');
        
    this.player.animations.add('wd', [0,1,2],10, true);
    this.player.animations.add('wl', [3,4,5],10, true);
    this.player.animations.add('wr', [6,7,8],10, true);
    this.player.animations.add('wu', [9,10,11],10, true);
    
    this.player.animations.play('wl');
        
        },

    update: function() {  
        this.player.body.gravity.y = 600
        
        if (this.cursor.left.isDown){ 
            this.player.body.velocity.x = -200;
        }else if(this.cursor.right.isDown) {
           this.player.body.velocity.x = 200;
       }else{            this.player.body.velocity.x = 0;
        } 

     if (this.cursor.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -250; 
        }


var game = new Phaser.Game(500, 400);  
game.state.add('main', mainState);  
game.state.start('main');