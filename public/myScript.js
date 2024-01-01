

Module.onRuntimeInitialized = function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input value
        var inputValue1 = document.getElementById('myInput1').value;
        var inputValue2 = document.getElementById('myInput2').value;
        var inputValue3 = document.getElementById('myInput3').value;

        // Allocate memory for the string
        
        
        var myFunction = Module.cwrap('addDoublesEmscripten', 'number', ['number', 'number']);
        var ComputeBesselJ0 = Module.cwrap('ComputeBesselJ0', 'number', ['number']);
        // Call a function from your C/C++ code
        var result1 = myFunction(inputValue1, inputValue2);
        var result2 = ComputeBesselJ0(inputValue3);

        // Deallocate memory
        document.getElementById('output2').textContent = result1;
        document.getElementById('output3').textContent = result2;  

        // Display the result
      console.log(result);  
    });
    
};