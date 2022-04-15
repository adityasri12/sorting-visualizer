// variables needed
window.type = "none"
running = "stop"
window.isgenerated = "false"

// getting type of sorting
function bubble() {
  window.type = "bubble"
}

function merge() {
  window.type = "merge"
}

function selection() {
  window.type = "selection"
}

function heap() {
  window.type = "heap"
}

// generating array
function generate(){
  if (running == "start"){
    alert("You can generate a new array after clicking stop as an array is still being sorted")
    return
  }
  window.size = document.getElementById("myRange").value;
  window.time = document.getElementById("Ranges").value;
  destroyarray()
  window.isgenerated = "true"
  window.arr = []
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  for (var i = 0; i <= window.size - 1; i++) {
      window.arr[i] = getRandomInt(100);
  }
  printarray()
}

// starting sort
function sort(){
  if (window.isgenerated == "false"){
    alert("Please generate the array first")
    return
  }
  if (window.type == "none"){
    alert("Please select the type of sorting first")
    return
  }
  running = "start"

  if (window.type == "selection"){
    selectionSort()
  }

  if (window.type == "bubble"){
    bubbleSort()
  }

  if (window.type == "heap"){
    heapSort()
  }

  if (window.type == "merge"){
    window.output = mergeSort(window.arr)
    window.um = 0;
    print = setInterval(
      function (){
        if (running == "stop"){
          return
        }
        document.getElementsByClassName("d" + window.um)[0].style.height = (window.output[window.um] * 5) + "px";
        document.getElementsByClassName("d" + window.um)[0].style.background = "blue";
        window.um ++;
        if (window.um >= window.output.length){
          running = "stop"
          clearInterval(print)
        }
      }
    ,window.time);
  }
}

// stopping the process
function stop(){
  running = "stop"
}

// swaapping two indexes for selection sort
function swap()
{
  var tk = document.getElementsByClassName("d" + window.min_idx)[0]
  var uk = document.getElementsByClassName("d" + window.i)[0]
  tk.style.background = "blue"
  uk.style.background = "blue"
  var temp2 = tk.style.height
  tk.style.height = uk.style.height
  uk.style.height = temp2
  var temp = window.arr[window.min_idx];
  window.arr[window.min_idx] = window.arr[i];
  window.arr[window.i] = temp;
}

function selectionSort()
{
  if (running == "stop"){
    return
  }
    var j;
    window.min_idx;
    window.i = 0

    myInterval = setInterval(function (){
      if (running == "stop"){
        window.i = 0
        return
      }
      window.min_idx = window.i;
      for (j = window.i + 1; j < window.size; j++)
      if (window.arr[j] < window.arr[window.min_idx])
          window.min_idx = j;
      swap();
      window.i++
      if (window.size - 1 <= window.i){
        running = "stop"
        clearInterval(myInterval);
      }
    }, window.time);
}

function swapping()
{
  var tk = document.getElementsByClassName("d" + (window.i + 1))[0]
  var uk = document.getElementsByClassName("d" + window.i)[0]
  var temp2 = tk.style.height
  tk.style.height = uk.style.height
  uk.style.height = temp2
  var temp = window.arr[window.i + 1];
  window.arr[window.i + 1] = window.arr[i];
  window.arr[window.i] = temp;
}

function bubbleSort()
{
  if (running == "stop"){
    window.i = 0
    window.k = 0
    return
  }
    var j;
    window.i = 0
    window.k = 0

    myInterval = setInterval(
      function (){
      if (running == "stop"){
        window.i = 0
        return
      }
      if (window.i == window.arr.length - 1 - window.k){
        window.k ++
        window.i = 0
      }
      if (window.arr[window.i] > window.arr[window.i + 1]){
        swapping();
      }
      if (window.i + 1 == window.arr.length - window.k - 1){
        document.getElementsByClassName("d" + (window.i + 1))[0].style.background = "blue"
      }
      window.i++
      if (window.k >= window.arr.length - 1){
        document.getElementsByClassName("d0")[0].style.background = "blue"
        window.i = 0
        window.k = 0
        running = "stop"
        clearInterval(myInterval);
      }
    }, window.time/5);
}

function merging(L, R){
    if (running == "stop"){
      return
    }
    var output = []
    var i = 0;
    var j = 0;
    var k = 0;
    while(i < L.length && j < R.length){
        if (L[i] <= R[j]) {
            output[k] = L[i];
            i++;
        }
        else {
            output[k] = R[j];
            j++;
        }
        k++;
      }
    while (i < L.length){
        output[k] = L[i];
        i++;
        k++;
      }
    while(j < R.length){
        output[k] = R[j];
        j++;
        k++;
      }
    return output;
}

function mergeSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    const m = Math.floor(arr.length/2);
    const L = arr.slice(0,m);
    const R = arr.slice(m);
    return merging(
        mergeSort(L),
        mergeSort(R)
        );
}

function printarray()
{
  width = 500/window.size
  var left = 100
  for (var i = 0; i < window.arr.length; i++) {
    const division = document.createElement("div");
    division.style.height = (window.arr[i]*5) + "px";
    division.style.left = left + "px";
    division.style.width = width + "px";
    division.classList.add("division");
    division.classList.add("d" + i);
    document.getElementById("bdy").appendChild(division);
    left += width + 6;
  }
}

function destroyarray()
{
  if (!window.arr)
  return;
  for (var i = 0; i < window.arr.length; i++) {
    var elem = document.getElementsByClassName("d" + i)[0];
    elem.parentNode.removeChild(elem);
  }
}