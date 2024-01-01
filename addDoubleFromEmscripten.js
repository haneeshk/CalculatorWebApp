import { _addDoublesEmscripten } from './addDoublesEmscripten.js';

document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.getElementById('myInput').value;
  const result = _addDoublesEmscripten(input);
  console.log(result);
  document.getElementById('result').textContent = result;
});