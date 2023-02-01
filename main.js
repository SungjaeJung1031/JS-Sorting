const n = 20;
const margin = 10;
const array = [];

for (let i = 0; i < n; i++) {
    array[i] = Math.random();
}
// console.log(array)

const cols = [];
const canvasBubbleSort = document.getElementById("bubbleSort");
const spacing = (canvasBubbleSort.width-margin*2) / n;
const ctxBubbleSort = canvasBubbleSort.getContext("2d");

const maxColumnHeight = canvasBubbleSort.height - 60;

for (let i = 0; i < array.length; i++) {
    //              width
    //  (left, top)   ∨  
    //          x-----------┐
    //          │           │
    //          │           │  < height
    //          │           │
    //          └-----x-----┘
    //              (x,y)
    //
    
    const x = i * spacing + spacing / 2 + margin;
    const y = canvasBubbleSort.height - margin - i *2;
    const width = spacing-3;
    const height = maxColumnHeight * array[i];
    cols[i] = new Column(x, y, width, height);
}

let moves = bubbleSort(array);

animate();

function animate(){
    ctxBubbleSort.clearRect(0,0,canvasBubbleSort.width, canvasBubbleSort.height);
    
    let changed=false;

    for(let i=0;i<cols.length;++i){
        changed=cols[i].draw(ctxBubbleSort)||changed;
    }

    if(!changed && moves.length>0){
        const move=moves.shift();
        const [i,j]=move.indices;
        if(move.swap){
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i],-1);
            [cols[i],cols[j]]=[cols[j],cols[i]];
        }else{
            // TODO::
        }
    }

    requestAnimationFrame(animate);
}