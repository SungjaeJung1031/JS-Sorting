const n = 20;
const array = [];
for (let i = 0; i < n; i++) {
    array[i] = Math.random();
}
// console.log(array)

const cols = [];
const canvasBubbleSort = document.getElementsByClassName("bubbleSort")[0];
const spacing = canvasBubbleSort.width / n;
const ctxBubbleSort = canvasBubbleSort.getContext("2d");

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
    
    const x = i * spacing + spacing / 2;
    const y = canvasBubbleSort.height;
    const width = spacing;
    const height = canvasBubbleSort.height * array[i];
    cols[i] = new Column(x, y, width, height);
    cols[i].draw(ctxBubbleSort);
}
