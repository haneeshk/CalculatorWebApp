

Module.onRuntimeInitialized = function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input value
        var inputValue = document.getElementById('myInput').value;

        // Allocate memory for the string
        
        
        var myFunction = Module.cwrap('addDoublesEmscripten', 'number', ['number', 'number']);
        // Call a function from your C/C++ code
        var result = myFunction(inputValue, inputValue);

        // Deallocate memory
        document.getElementById('output2').textContent = result;  

        // Display the result
      console.log(result);  
    });
    
};