let dataBG;
let dataArray;
let bgDict;
let startBgVal;
bgDict = new p5.TypedDict();

// preload table data
function preload() {
  dataBG = loadTable(
    'BG_parse_text_3.csv',
    'csv',
    'header');
}

function setup() {
  createCanvas(400, 400);
  //initialize where to start from in the table, so that there's enough room to retrieve values before and after the central value
  startBgVal = 3;
  // create a Dictionary key-value pair for each BG value, starting with key 0
  for (i = startBgVal; i < dataBG.getRowCount() - startBgVal; i++) {
    bgDict.create(i - startBgVal, [dataBG.getNum(i, "mmol/L")]);
    // count 3 backwards and add these to the array of values stored at each key, then count 3 forwards and add these to the array of values stored at each key - this works, but maybe it could be cleaned up a bit
    e = startBgVal;
    f = 0;
    while (e > 0) {
      e = e - 1;
      bgDict.set(i - startBgVal, append(bgDict.get(i - startBgVal), dataBG.getNum(i - startBgVal + e, "mmol/L")));
    }
    while (f < 3) {
      f = f + 1;
      bgDict.set(i - startBgVal, append(bgDict.get(i - startBgVal), dataBG.getNum(i + f, "mmol/L")));
    }


  }
  console.log(bgDict.size());
  console.log(bgDict.get(44));

}


function draw() {
  background(220);
}