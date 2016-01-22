$(document).ready(init);

var taskArray = [];
var newTask;

function init() {
  populateTasks();
  $('#newEntry').click(addNewTask);
  $('.dropList').on('click', findCat)
  // $('#formEntry').submit(newEntry);
  console.log(this);
  $('#catDropDown').on('change', findCat);
  $('table').on('click', '#trash', removeEntries);
  $('table').on('click', '#fav', attachStatus);
  $('table').on('dblclick', 'th', sortHeaders);
}

function addNewTask(event) {
event.preventDefault();

var name = $('#taskEntry').val();
var desc = $('#descEntry').val();
var date = moment($('#dateEntry').val()).format('llll');
// var newTask = $('#formEntry').val();
// var newTask = JSON.stringify({name: name, desc: desc, date: date});
var newTask = ({name: name, desc: desc, date: date});
  $.post('/tasks', {task: newTask}) //new object
  .success(function(data) {
    var $td = $('<td>').text(task.name);
    $('#template').append($td);
  })
  .fail(function(err) {
    alert('fix me');
  });
}

function populateTasks() {
  $.get('/tasks', function(data) {
    var $task = makeItHappen(data);
    $('#template').append($task);
  })
}

function makeItHappen(data) {
  data.forEach(function(task){
   var $tr = $('#template').clone();
   $tr.removeAttr('id');
   $tr.children('.name').text(task.name);
   $tr.children('.desc').text(task.desc);
   $tr.children('.date').text(task.date);
   $('tbody').append($tr);
  appendComplete(task.complete, $tr);

 });
}

function removeEntries() {
 $('input:checked').closest('tr').remove();
}

function attachStatus() {
  var $change = $(this).closest('tr').css("color","#00c3ff");
  console.log(this);
  var taskClicked = $change.index() - 1;
  $.post('./status', {"status": taskClicked})
    .succes(function(data) {
      $change.css("color", "#00c3ff");
  })
}

function findCat(event) {
  event.preventDefault();
  var text = $(this).text();
  $('#catEntry').text(text).append('<span class="caret"></span>');
  console.log(text);
}

function addTask() {
  var contact = $('#formEntry').val()
  contactList.push(contact);

}

function updateList() {
var taskList = $('#taskList');

taskList.children().not('#template').remove();

  var $tasks = taskArray.map(function(task, index) {
    var $tr = $('#template').clone();
    $tr.removeAttr('id');
    $tr.children('.name').text(task.name);
    $tr.children('.desc').text(task.desc);
    $tr.children('.date').text(task.date);
    return $tr
    });
  taskList.append($tasks);
}

function sortHeaders(e) {
  var $target = $(e.target);
  console.log($target);
  var $targetClass = $target.attr('class');

  taskArray = _.sortBy(taskArray, $targetClass);
}
