var inAir;

var mainState = {
   preload: function(){
 
       game.load.spritesheet('chef', 'media/orangehatlady.png',48, 48, 12);
       game.load.image('back', 'media/backg.png');
       game.load.image('spill1', 'media/minibox1.png');
       game.load.image('spill2', 'media/minibox2.png');
       game.load.spritesheet('loud', 'media/redhatchef.png');
       game.load.spritesheet('louds', 'media/greenhatchef.png');
       game.load.spritesheet('lady', 'media/bluehat.png');
        
       
   },
   
   create: function(){
       inAir = false;
       
       var background = game.add.tileSprite(0, 0, 450,600, 'back'); 
       background.tileScale.x = 1/2;
       background.tileScale.y = 1/2;
       
       game.physics.startSystem(Phaser.Physics.ARCADE);
       game.world.enableBody = true;
       this.loud = game.add.sprite(300,240, 'loud')
       this.louds = game.add.sprite(90,180,'louds')
       this.lady = game.add.sprite(100,400, 'lady')
       this.spill1 = game.add.sprite(136,175, 'spill1')
       this.spill2 = game.add.sprite(70, 272, 'spill2')
       
       
       this.badChef = game.add.group();
       
       this.badChef.add(this.lady);
       this.badChef.add(this.loud);
       this.badChef.add(this.louds);
       this.badChef.add(this.spill1);
       this.badChef.add(this.spill2);
       
       this.chef = game.add.sprite(150,10, 'chef');
       this.chef.frame = 4; 
       
       this.chef.animations.add('walk down', [0,1,2], 10, true);
       this.chef.animations.add('walk left', [3,4,5], 10, true);
       this.chef.animations.add('walk right', [6,7,8], 10, true);
       this.chef.animations.add('walk up', [9,10,11], 10, true);
       this.chef.animations.add('stop',[1], 10, true);
       
       //this.chef.animations.play('walk up');      
       
       this.chef.scale.setTo(.9,.9);
           
      this.cursor = game.input.keyboard.createCursorKeys();
       
       let space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
       space.onDown.add(() => {
           if (inAir) {
               return;
           }
           
           inAir = true;
           console.log("in air")
           setTimeout(() => {
               inAir = false;
               console.log("on ground")
           }, 2000)
       })
      
   },

   update: function(){
       
       game.physics.arcade.overlap(this.chef,this.badChef, this.onOil, null, this);       
       var dir;
       if(this.cursor.down.isDown){
           dir = "down"
       }
       if(this.cursor.up.isDown){
           dir = "up"
       }
       if(this.cursor.right.isDown){
           dir = "right";
       }
       if(this.cursor.left.isDown){
           dir = "left";
       }
        if(this.chef.position.x < 70 && dir  === "left"){
           this.chef.body.velocity.x = 0;
           this.chef.animations.play('stop');
       }
       else if(this.chef.position.x > 350 && dir  === "right"){
           this.chef.body.velocity.x = 0;
           this.chef.animations.play('stop');
           
       }else if(this.chef.position.y < 0 && dir  === "up"){
           this.chef.body.velocity.y = 0;
           this.chef.animations.play('stop');
           
       }else if(this.chef.position.y > 540 && dir  === "down"){
           this.chef.body.velocity.y = 0;
           this.chef.animations.play('stop');
       }
        else if(this.cursor.right.isDown){
            console.log(this.chef.position);
          this.chef.body.velocity.x = 75;
           this.chef.body.velocity.y = 0;
           this.chef.animations.play('walk right');
      } 
       else if(this.cursor.left.isDown){
           console.log(this.chef.position);
           dir = "left";
          this.chef.body.velocity.x = -75;
           this.chef.body.velocity.y = 0;
          this.chef.animations.play('walk left');
       }
       
              
       else if(this.cursor.up.isDown) {
             this.chef.body.velocity.y = -75;
           this.chef.body.velocity.x = 0;
           this.chef.animations.play('walk up');
       }  
        else if(this.cursor.down.isDown){
            dir = "down";
          this.chef.body.velocity.y = 75;
            this.chef.body.velocity.x = 0;
              this.chef.animations.play('walk down');
        }else{
             this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('stop');
        }
    
       },
       
       youLost: function() {
           game.state.start('main');
       },
       onOil: function() {
           if (!inAir) {
               this.youLost();
           }
       }
       
};

var game = new Phaser.Game(450,600);
game.state.add('main', mainState);
game.state.start('main');