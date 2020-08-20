
import Paint from './paint.class.js';

class Tool{
    static TOOL_LINE="line";
    static TOOL_RECTANGLE="rectangle";
    static TOOL_CIRCLE="circle";
    static TOOL_TRAIANGLE="triangle";
    static TOOL_FILLIN="fillin";
    static TOOL_PENCIL="pencil";
    static TOOL_BRUSH="brush";
    static TOOL_ERASER="eraser";

}

var paint= new Paint('canvas');
paint.activeTool="pencil";
paint.selectedColor='black';
paint.lineWidth=1;
paint.brushSize=4;
paint.init();

console.log(paint);

document.querySelectorAll('[data-command]').forEach(
    item => {
        item.addEventListener('click',e => {
            console.log(item.getAttribute('data-command'));
        });
    }
);


document.querySelectorAll('[data-tool]').forEach(
    item => {
        item.addEventListener('click',e => {
            
            document.querySelector("[data-tool].active").classList.toggle('active');
            item.classList.toggle('active');

            let selectedTool=item.getAttribute('data-tool');
            paint.activeTool=selectedTool;

            if(selectedTool=="brush"){
                document.querySelector('.group.for-shape').style.display="none";
                document.querySelector('.group.for-brush').style.display="block";

            }else if(selectedTool=="pencil"){
                document.querySelector('.group.for-shape').style.display="block";
                document.querySelector('.group.for-brush').style.display="none";
            }else if(selectedTool=="circle"){
                document.querySelector('.group.for-shape').style.display="block";
                document.querySelector('.group.for-brush').style.display="none";
            }else if(selectedTool=="rectangle"){
                document.querySelector('.group.for-shape').style.display="block";
                document.querySelector('.group.for-brush').style.display="none";
            }else if(selectedTool=="line"){
                document.querySelector('.group.for-shape').style.display="block";
                document.querySelector('.group.for-brush').style.display="none";
            }else if (selectedTool=="eraser"){
                document.querySelector('.group.for-shape').style.display="none";
                document.querySelector('.group.for-brush').style.display="none";
            }else{
                document.querySelector('.group.for-shape').style.display="none";
                document.querySelector('.group.for-brush').style.display="none";
            }
        });
    }
);

document.querySelectorAll('[data-line-width]').forEach(
    item => {
        item.addEventListener('click',e => {
            document.querySelector('[data-line-width].active').classList.toggle('active');
            item.classList.toggle('active');

            let lineWidth=item.getAttribute('data-line-width');
            paint.lineWidth=lineWidth;
        });
    }
);
document.querySelectorAll('[data-brush-size]').forEach(
    item => {
        item.addEventListener('click',e => {
            document.querySelector('[data-brush-size].active').classList.toggle('active');
            item.classList.toggle('active');

            let brushSize=item.getAttribute('data-brush-size');
            paint.brushSize=brushSize;
        });
    }
);


document.querySelectorAll('[data-color]').forEach(
    item => {
        item.addEventListener('click',e => {
            document.querySelector('[data-color].active').classList.toggle('active');
            item.classList.toggle('active');

            let color=item.getAttribute('data-color');
            paint.selectedColor=color;
        });

   
    }
);




