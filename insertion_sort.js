function insertionSort(array) {
    const moves = [];
    
    let n = array.length;

    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = array[i];
        // The last element of our sorted subarray
        let j = i-1; 
        while ((j > -1) && (current < array[j])) {
            array[j+1] = array[j];
            moves.push(
                {indices:[j+1,j],swap:true}
            );
            j--;
        }
        array[j+1] = current;
    }

    return moves;
}