import Point from './point.model.js';
import {getMouseCordsonCanvas,findDistance} from './utility.js';



export default class Paint{
    constructor(canvasId){
        this.canvas=document.getElementById(canvasId);
        this.context=canvas.getContext('2d');
        
    }
    set activeTool(tool){
        this.tool=tool;
    }
    set selectedColor(color){
        this.color=color;
        this.context.strokeStyle=this.color;
    }
    set lineWidth(lineWidth){
        this._lineWidth=lineWidth;
        this.context.lineWidth=this._lineWidth;
    }
    set brushSize(brushSize){
        this._brushSize=brushSize;
        this.context.brushSize=this._brushSize;
    }

    init(){
        this.canvas.onmousedown=e =>this.onMouseDown(e);
    }
    onMouseDown(e){
        this.savedData=this.context.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        this.startPos=getMouseCordsonCanvas(e,this.canvas);
        console.log(this.startPos);

        this.canvas.onmousemove=e=> this.onMouseMove(e);
        document.onmouseup=e =>this.onMouseUp(e);

        if(this.tool=="eraser"){

            this.context.clearRect(this.startPos.x,this.startPos.y,10,10);

        }else if(this.tool=="pencil" || this.tool=="brush"){
            this.context.beginPath();

            this.context.moveTo(this.startPos.x,this.startPos.y);
        }

        console.log(this.tool);
    }
    onMouseMove(e){
        this.currentPos=getMouseCordsonCanvas(e,this.canvas);
        console.log(this.currentPos); 
        switch(this.tool){
            case "line":
            case "rectangle":
            case "circle":
                this.drawShape();
                break;

            case "pencil":
                this.drawFreeLine(this._lineWidth);
                break;
            case "brush":
                this.drawFreeLine(this._brushSize);
                break;
            case "eraser":
                this.context.clearRect(this.currentPos.x,this.currentPos.y,10,10);
                break;
            default:
                break;
        }
   
    }
    onMouseUp(){
        this.canvas.onmousemove=null;
        document.onmouseup=null;
    }

    drawShape(){
        this.context.putImageData(this.savedData,0,0);
        this.context.beginPath();
        if(this.tool=='line'){
            this.context.moveTo(this.startPos.x,this.startPos.y);
            this.context.lineTo(this.currentPos.x,this.currentPos.y);
        } else if(this.tool=='rectangle'){
            this.context.rect(this.startPos.x,this.startPos.y,this.currentPos.x-this.startPos.x,this.currentPos.y-this.startPos.y);
        }else if(this.tool=='circle'){
            let distance=findDistance(this.startPos,this.currentPos);
            this.context.arc(this.startPos.x,this.startPos.y,distance,0,2*Math.PI,false)
        }
        this.context.stroke();


    }
    
 
    drawFreeLine(lineWidth){
        this.context.lineWidth=lineWidth;
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        this.context.stroke();
    }

   
} 

