const n = 20;
const margin = 10;
const sort_type = {
    BubbleSort: 0,
    InsertionSort: 1,
    QuickSort: 2,
    CountingSort: 3,
    RadixSort: 4,
    BucketSort: 5,
    HeapSort: 6,
    ShellSort: 7,
    NumSortType: 8,
}
const sort_id = {
    BubbleSort: "bubbleSort",
    InsertionSort: "insertionSort",
    QuickSort: "quickSort",
    CountingSort: "countingSort",
    RadixSort: "radixSort",
    BucketSort: "bucketSort",
    HeapSort: "heapSort",
    ShellSort: "shellSort"
}
const array = new Array(sort_type.NumSortType);
const cols = new Array(sort_type.NumSortType);
const canvas = new Array(sort_type.NumSortType);
const ctx = new Array(sort_type.NumSortType);
const moves = new Array(sort_type.NumSortType);

for (var i = 0 ; i < array.length; ++i){
    array[i] = new Array(n);
    cols[i] = new Array(n);
}

for (let j = 0; j < n; j++) {
    array[0][j] = Math.random();
}

for (let i = 1; i < sort_type.NumSortType; ++i){
    for (let j = 0; j < n; j++) {
        array[i][j] = array[0][j];
    }
}

// console.log(array[0])
// console.log(Object.values(sort_id)[0]);
// const a = document.getElementById(Object.values(sort_id)[0])
// console.log(a.width);


for (let i = 0; i < sort_type.NumSortType; ++i){
    canvas[i] = document.getElementById(Object.values(sort_id)[i]);
    ctx[i] = canvas[i].getContext("2d");

    for (let j = 0; j < array[i].length; j++) {
        if (i == 0){
            const spacing = (canvas[i].width-margin*2) / n;
            const maxColumnHeight = canvas[i].height - 60;

            //              width
            //  (left, top)   ∨  
            //          x-----------┐
            //          │           │
            //          │           │  < height
            //          │           │
            //          └-----x-----┘
            //              (x,y)
            //
            const x = j * spacing + spacing / 2 + margin;
            const y = canvas[0].height - margin - j *2;
            const width = spacing-3;
            const height = maxColumnHeight * array[0][j];
            cols[0][j] = new Column(x, y, width, height);
        }
        else{
            cols[i][j] = cols[0][j];
        }
    }

    // initialize canvases
    ctx[i].clearRect(0,0,canvas[i].width,canvas[i].height);

    for (let j = 0; j < array[i].length; j++) {
        changed=cols[i][j].draw(ctx[i])
    }
}

moves[0] = bubbleSort(array[0]);
moves[1] = insertionSort(array[1]);

console.log(array[0])

// console.log(moves[1]);
animate(0);
// animate(1);
// for(let i = 0 ; i < sort_type.NumSortType; ++i){
// for(let i = 0 ; i < 2; ++i){
//     animate(i);
// }

function animate(sort_type){
    ctx[sort_type].clearRect(0,0,canvas[sort_type].width,canvas[sort_type].height);
    
    let changed=false;

    for(let i=0;i<cols[sort_type].length;++i){
        changed=cols[sort_type][i].draw(ctx[sort_type])||changed;
    }

    if(!changed && moves[sort_type].length>0){
        const move=moves[sort_type].shift();
        const [i,j]=move.indices;
        if(move.swap){
            cols[sort_type][i].moveTo(cols[sort_type][j]);
            cols[sort_type][j].moveTo(cols[sort_type][i],-1);
            [cols[sort_type][i],cols[sort_type][j]]=[cols[sort_type][j],cols[sort_type][i]];
        }else{
            // TODO::
        }
    }

    if (moves[sort_type].length>0){
        requestAnimationFrame(function() {animate(sort_type)});
    }
}