function Shape(state, x, y, w, h, fill, nodeParent, strokeParent) {
  "use strict";
  this.state = state;
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || '#AAAAAA';
  this.sonNodes = [];//shapes
  this.strokes = [];
  this.nodeParent = nodeParent || null;
  this.strokeParent = strokeParent || null;
}

function Stroke(state, nodeParent, nodeSon, fill) {
  "use strict";
  this.state = state;
  this.nodeParent = nodeParent || null;
  this.nodeSon = nodeSon || null;
  this.x1 = nodeParent.x || 0;
  this.y1 = nodeParent.y || 0;
  this.x2 = nodeSon.x || 0;
  this.y2 = nodeSon.y || 0;
  this.fill = fill || '#000000';
}

Stroke.prototype.draw = function(ctx, optionalColor) {
  "use strict";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);  
  ctx.lineJoin = 'round';
  ctx.stroke();  
};

Shape.prototype.draw = function(ctx, optionalColor) {
  "use strict";
  var i, cur, half;
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

Shape.prototype.contains = function(mx, my) {
  "use strict";
  return (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
};

Shape.prototype.addSonNode = function(shape){
  this.sonNodes.push(shape);
}
Shape.prototype.addStroke = function(stroke){
  this.strokes.push(stroke);
}

function CanvasState(canvas) {
  "use strict";
  
  
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');

  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop,
      html, myState, i;

  //mouse coordenates fix
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingLeft, 10) || 0;
    this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingTop, 10) || 0;
    this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).borderLeftWidth, 10) || 0;
    this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null).borderTopWidth, 10) || 0;
  }

  html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  
  this.valid = false; 
  this.shapes = [];
  this.strokes = [];
  this.dragging = false; 
  this.resizeDragging = false; 
  this.expectResize = -1; 

  this.selection = null;
  this.followerStroke = null;
  this.dragoffx = 0; 
  this.dragoffy = 0;

  this.parentx = 0;
  this.parenty = 0;
 
  this.selectionHandles = [];
  for (i = 0; i < 8; i += 1) {
    this.selectionHandles.push(new Shape(this));
  }
  
  myState = this;
  var mySel = null;
  
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  canvas.addEventListener('mousedown', function(e) {
    var mouse, mx, my, shapes, l, i;
    
    mouse = myState.getMouse(e);
    mx = mouse.x;
    my = mouse.y;
    shapes = myState.shapes;
    l = shapes.length;
    for (i = l-1; i >= 0; i -= 1) {
      if (shapes[i].contains(mx, my)) {
        mySel = shapes[i];

        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.dragging = true;
        myState.selection = mySel;

        myState.parentx = mySel.x;
        myState.parenty = mySel.y;
        
        myState.valid = false;
        return;
      }
    }

    if (myState.selection) {
      myState.selection = null;
      myState.valid = false; 
    }
  }, true);
  canvas.addEventListener('mousemove', function(e) {
    var mouse = myState.getMouse(e),
        mx = mouse.x,
        my = mouse.y,
        oldx, oldy, i, cur;
    if (myState.dragging){
      mouse = myState.getMouse(e);

      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;

      
      if(myState.shapes.length !== 0){
        //console.log(mySel.sonNodes);
        if(mySel.nodeParent === null){//Sin padre
          for(i = 0; i < mySel.strokes.length; i+=1){
            mySel.strokes[i].x1 = mouse.x - myState.dragoffx;
            mySel.strokes[i].y1 = mouse.y - myState.dragoffy;
          }
        }
        else{//con padre
          for(i = 0; i < mySel.strokes.length; i+=1){
            mySel.strokes[i].x1 = mouse.x - myState.dragoffx;
            mySel.strokes[i].y1 = mouse.y - myState.dragoffy;
          }          
          mySel.strokeParent.x2 = mouse.x - myState.dragoffx;
          mySel.strokeParent.y2 = mouse.y - myState.dragoffy;
        }
        /*for(i = 0; i < mySel.sonNodes.length; i+=1){
          
          if(mySel.strokes[i].nodeParent !== null){
            mySel.strokes[i].x1 = mouse.x - myState.dragoffx;
            mySel.strokes[i].y1 = mouse.y - myState.dragoffy;
          }

        }*/
        //console.log(mySel.strokes[0].x2);
      }
      
      myState.valid = false; 
    }
  
    if (myState.selection !== null && !myState.resizeDragging) {
      for (i = 0; i < 8; i += 1) {

        cur = myState.selectionHandles[i];
        
      }
      myState.resizeDragging = false;
      myState.expectResize = -1;
      this.style.cursor = 'auto';
    }
  }, true);

  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
    myState.resizeDragging = false;
    myState.expectResize = -1;
    
    if (myState.selection !== null) {
      if (myState.selection.w < 0) {
          myState.selection.w = -myState.selection.w;
          myState.selection.x -= myState.selection.w;
      }
      if (myState.selection.h < 0) {
          myState.selection.h = -myState.selection.h;
          myState.selection.y -= myState.selection.h;
      }
    }
  }, true);

  canvas.addEventListener('dblclick', function(e) {
    var mouse = myState.getMouse(e);

    var newShape = new Shape(myState, 
      mouse.x - 10, 
      mouse.y - 10, 
      20, 20, 
      'rgba(0,255,0,.6)', 
      mySel);

    myState.addShape(newShape);
    
    var newStroke = new Stroke(myState, mySel, newShape, 'rgb(0,0,0)');

    newShape.strokeParent = newStroke;

    myState.addStroke(newStroke);

    mySel.addSonNode(newShape);
    mySel.addStroke(newStroke);
  }, true);

  //color selected item
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;
  this.selectionBoxSize = 6;
  this.selectionBoxColor = 'darkred';
  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addStroke = function(stroke) {
  "use strict";
  this.strokes.push(stroke);
  this.valid = false;
};

CanvasState.prototype.addShape = function(shape) {
  "use strict";
  this.shapes.push(shape);
  this.valid = false;
};

CanvasState.prototype.clear = function() {
  "use strict";
  this.ctx.clearRect(0, 0, this.width, this.height);
};

CanvasState.prototype.draw = function() {
  "use strict";
  var ctx, shapes, l, i, shape, mySel, strokes, stroke;
  if (!this.valid) {
    ctx = this.ctx;
    shapes = this.shapes;
    strokes = this.strokes;
    this.clear();
      
    
    l = shapes.length;
    for (i = 0; i < l; i += 1) {
      shape = shapes[i];
      if (shape.x <= this.width && shape.y <= this.height &&
          shape.x + shape.w >= 0 && shape.y + shape.h >= 0) {
        shapes[i].draw(ctx);
      }
    }

    
    l = strokes.length;
    for (i = 0; i < l; i += 1) {
      stroke = strokes[i];
      strokes[i].draw(ctx);
 
    }
    
    if (this.selection !== null) {
      ctx.strokeStyle = this.selectionColor;
      ctx.lineWidth = this.selectionWidth;
      mySel = this.selection;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    this.valid = true;
  }
};

CanvasState.prototype.getMouse = function(e) {
  "use strict";
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }

  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  return {x: mx, y: my};
};

  var s = new CanvasState(document.getElementById('canvas1'));

  s.addShape(new Shape(s, 260, 70, 150, 50, 'rgba(0,205,0,0.7)'));
