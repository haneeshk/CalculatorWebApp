function arange(start, stop, step) {
  let arr = [];
  for (let i = start; i < stop; i += step) {
      arr.push(i);
  }
  return arr;
}

Module.onRuntimeInitialized = function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input value
        var inputValue1 = document.getElementById('myInput1').value;
        var inputValue2 = document.getElementById('myInput2').value;
        var myFunction = Module.cwrap('addDoublesEmscripten', 'number', ['number', 'number']);
        var result1 = myFunction(inputValue1, inputValue2);
        document.getElementById('output2').textContent = result1;
        console.log(result);  
    });



    document.getElementById('myForm2').addEventListener('submit', function(event) {
      event.preventDefault();
     var inputValue3 = document.getElementById('myInput3').value;
     var ComputeBesselJ0 = Module.cwrap('ComputeBesselJ0', 'number', ['number']);     
     var result2 = ComputeBesselJ0(inputValue3);
      document.getElementById('output3').textContent = result2;  

      
    

    // Set the dimensions of the canvas
    var width = 500;
    var height = 300;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

    // Define the line
    var valueline1 = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
    let besselplot_div = document.getElementById('besselplot');
    besselplot_div.innerHTML = '';
      // Define the chart
    var svg = d3.select('#besselplot').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data in the domains
    // x.domain(data.map(function(d) { return d.name; }));
    // y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var xrange=arange (-inputValue3, inputValue3, 0.1);
    var yrange=xrange.map(ComputeBesselJ0);
    // console.log(xrange);
    // console.log(yrange);
    x.domain([Math.min(...xrange), Math.max(...xrange)]);
    y.domain([Math.min(...yrange), Math.max(...yrange)]);

    
    
    
    let data = xrange.map((value, index) => {
        return {x: value, y: yrange[index]};
    });
    
    // console.log(data);

// Add the valueline1 path.
svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
        )
    // // Append the rectangles for the bar chart
    // svg.selectAll('.bar')
    //     .data(data)
    //     .enter().append('rect')
    //     .attr('class', 'bar')
    //     .attr('x', function(d) { return x(d.x); })
    //     .attr('width', x.bandwidth())
    //     .attr('y', function(d) { return y(d.y); })
    //     .attr('height', function(d) { return height - y(d.value); })
    //     .on('mouseover', function() { d3.select(this).classed('highlight', true); })
    //     .on('mouseout', function() { d3.select(this).classed('highlight', false); });

    // Add the x Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append('g')
        .call(d3.axisLeft(y));
    
    
    
  });
    
};