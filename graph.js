
  var final =[];
  var present = [];
  var top10;
  var sortval;
  var m = 0;

function initGraph(newData) {
  loadDataGraph(newData);
  final = [];
  top10 = [];
  present = [];

}

function loadDataGraph(newData) {

  queue()   
    .defer(d3.json, '/api/data/' + newData)  
    .await(processDataGraph); 
}

function maxDataGraph(indicatorData) {
  top10 = [];
  top10 = indicatorData.sort(function(a, b) { return a.value < b.value ? 1 : -1; })
                .slice(0, 9);
}

function minDataGraph(indicatorData) {
  top10 = [];
  top10 = indicatorData.sort(function(a, b) { return a.value > b.value ? 1 : -1; })
                .slice(0, 9);
}

function processDataGraph(error, indicatorData) {
    for (var i=0 in indicatorData) {
          if (indicatorData[i].year == 2015) 
          {
            if (!isNaN(indicatorData[i].value)) {
            var code = indicatorData[i].code;
            var name = indicatorData[i].country_name;
            var val = indicatorData[i].value;
            var years = indicatorData[i].year;
            present.push({"year": years, "code": code, "country_name": name , "value": val});
          }
          }
    }

    if (m==0) {
      sortval = 'max';
      m++;
    }


    if (sortval == 'max') {
      maxDataGraph(present);
      for (var i=0 in indicatorData) {
        for (var j=0 in top10) {
          if (indicatorData[i].code == top10[j].code) {
            var code = indicatorData[i].code;
            var name = indicatorData[i].country_name;
            var val = indicatorData[i].value;
            var years = indicatorData[i].year;
            final.push({"year": years, "code": code, "country_name": name , "value": val});
          }
        }
      }    
    }
    else if (sortval == 'min') {
      minDataGraph(present);
      for (var i=0 in indicatorData) {
        for (var j=0 in top10) {
          if (indicatorData[i].code == top10[j].code) {
            var code = indicatorData[i].code;
            var name = indicatorData[i].country_name;
            var val = indicatorData[i].value;
            var years = indicatorData[i].year;
            final.push({"year": years, "code": code, "country_name": name , "value": val});
          }
        }
      }    
    }

  initTable(top10);

  drawGraph(final);
}

function drawGraph(final) {


  var visualization = d3plus.viz()
    .container("#viz")  
    .data(final)  
    .type("line")       
    .id("country_name")         
    .text("country_name")      
    .y("value")         
    .x("year")          
    .draw()

}

d3.select('#indicatorGraph')
  .on('change', function() {
    var newData = (d3.select(this).property('value')); // str
    console.log(newData);
    $("#viz").empty();
  window.onload = initGraph(newData);
  closeNav();

  });

d3.select('#MaxvalueGraph')
  .on('change', function() {
    sortval = (d3.select(this).property('value'));
  });
  
d3.select('#MinvalueGraph')
  .on('change', function() {
    sortval = (d3.select(this).property('value'));
  });





