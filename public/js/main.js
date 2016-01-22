$(document).ready(init);

var tasks = [];
var newTask;

function init() {
  $('#newEntry').click(addNewTask);
  $('table').on('click', '#trash', removeEntries);
  console.log(this);
  // $('table').on('click', '#fav', attachStatus);
}

function addNewTask(event) {
// event.preventDefault();

var name = $('#taskEntry').val();
var desc = $('#descEntry').val();
var date = moment($('#dateEntry').val()).format('ll');
var newTask = ({name: name, desc: desc, date: date, isComplete: false})
  $.post('/tasks', {task: newTask}) //new object
  .success(function(data) {
    $('#taskList').append(data);
    populateTasks();
  })
  .fail(function(err) {
    alert('fix me');
  });
}

function populateTasks() {
  $.get('/tasks', function(data) {
    var $tasks = makeItHappen(data);
    $('#taskList').append($tasks);
  })
}

function makeItHappen(data) {
  return data.map(function(task){
    var $tr = $('#template').clone();
    $tr.removeAttr('id');
    $tr.children('.name').text(task.name);
    $tr.children('.desc').text(task.desc);
    $tr.children('.date').text(task.date);

    return $tr;
 });
}

function removeEntries() {
 $('input:checked').closest('tr').remove();
}
