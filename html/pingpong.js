
  var setting = null;

  //create canvas
  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");

  var socket = io();
  //get key event
  $('body').on('keydown', function(e){
    socket.emit('keydown', e.keyCode)
  });
  $('body').on('keyup', function(e){
    socket.emit('keyup', e.keyCode)
  });
  socket.on('connected', function(serverSetting){
    setting = serverSetting;
    $(canvas).attr("width", setting.WIDTH);
    $(canvas).attr("height", setting.HEIGHT);
    document.body.appendChild(canvas);
  });
  socket.on('update', function(statuses){

    if(setting == null) return;
    drawBackground();
    statuses.forEach(function(status){
      switch(status.shape){
        //paddle
        case "rectangle":
          context.fillStyle = status.color;
          context.fillRect(status.x,status.y,status.width,status.height);
          break;
        //ball
        case "circle":
          context.fillStyle = status.color;
          context.beginPath();
          context.arc(status.x,status.y,status.r,0,2*Math.PI);
          context.stroke();
          context.fill();
          break;
        case "text":
          context.font = status.size+"px "+status.font;
          context.fillStyle = status.color;
          context.textAlign = status.textAlign;
          context.fillText(status.text,   status.x ,status.y);
          break;
      }
    });
  });

  function drawBackground(){
    context.fillStyle = setting.BACKGROUND_COLOR;
    context.fillRect(0,0,setting.WIDTH,setting.HEIGHT);
    drawNet();
    drawBorder();
  }

  function drawBorder(){
    context.fillStyle = "#008080";
    context.fillRect(0,0,setting.WIDTH,setting.BORDER_WIDTH);
    context.fillRect(0,setting.HEIGHT-setting.BORDER_WIDTH,setting.WIDTH,setting.BORDER_WIDTH);
  }

  function drawNet(){
    var num = 10;
    var height = setting.HEIGHT/((num+1)*2);
    var y = height/2;
    var x = (setting.WIDTH-setting.NET.WIDTH)/2;
    context.fillStyle = "#EE82EE";
    while(y < setting.HEIGHT){
        context.fillRect(x,y,setting.NET.WIDTH,height);
        y += height*2;
    }
  }

  socket.on('waiting', function(){
    console.log("WAITING.....");
  });

  socket.on('in', function(){
    console.log("LET'S GO BABY !!");
  });
