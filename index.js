var arr = [];

// taking input array from input field
document.getElementById("submitButton").addEventListener("click", function () {
  const input = document.getElementById("inputArray").value;
  arr = input.split(",").map(Number);

  // catching input-table  and output-tables
  var table = document.getElementById("chart-table");
  var outputtable = document.getElementById("output-table");
  var rows = table.rows[0].cells;
  var outputrows = outputtable.rows[0].cells;

  // declaring variables
  let wall = [];
  let water = [];
  let quantity = 0;

  // looping through each array elements
  for (let i = 0; i < arr.length; i++) {
    //if it's non zero element then enter
    if (arr[i] !== 0) {
      //collecting  index of start wall
      wall.push(i);
      i += 1;

      //itrating trough start of walls to next wall to find water in between
      while (arr[i] === 0 && i < arr.length) {
        //collecting  index of water
        water.push(i);
        i += 1;
      }
      //collecting  index of end wall
      if (i < arr.length) {
        wall.push(i);
      }
      //starting from end wall again;
      i += -1;
    }
  }

  // removing duplicates in wall array
  wall = [...new Set([...wall])];

  // ittrating through wach wall index
  for (let i = 0; i < wall.length; i++) {
    let start = wall[i]; //start of wall values
    let end = wall[i + 1]; //end of wall values
    // only if end exists enter
    if (end) {
      // calculating minimum water level needed
      let min = Math.min(arr[start], arr[end]);
      // manupulating DOM to change wall colour
      var cell = rows[start];
      cell.innerHTML =
        '<div class="wall" style="height: ' + arr[start] * 20 + 'px;"></div>';
      // looping from wall start till wall end to fill water
      for (let j = start + 1; j < end; j++) {
        // calculating quantity of water
        quantity += min;
        // manupulating DOM to change water colour in both input and output tables
        outputcell = outputrows[j];
        cell = rows[j];
        cell.innerHTML =
          '<div class="water" style="height: ' + min * 20 + 'px;"></div>';
        outputcell.innerHTML =
          '<div class="water" style="height: ' + min * 20 + 'px;"></div>';
      }

      // manupulating DOM to change end wall colour
      cell = rows[end];
      cell.innerHTML =
        '<div class="wall" style="height: ' + arr[end] * 20 + 'px;"></div>';
    }
  }
  // Displaying quantity of water
  var output = document.getElementById("output");
  output.innerText = quantity + " Units";
});
