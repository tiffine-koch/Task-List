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

function addNewTask() {
// event.preventDefault();

var name = $('#taskEntry').val();
var desc = $('#descEntry').val();
var date = $('#dateEntry').val();
// var newTask = $('#formEntry').val();
var newTask = JSON.stringify({name: name, desc: desc, date: date});
  $.post('/tasks', {task: newTask}) //new object
  .success(function(data) {
    var $li = $('<div>').text(task.name);
    $('#template').append($li);
  })
  .fail(function(err) {
    alert('fix me');
  });
}
function populateTasks() {
  $.get('/tasks', function(data) {
    var $task = makeItHappen(data);
    $('#template').append($tasks);
  })
}

function makeItHappen() {
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
  $(this).closest('tr').remove();
  // var indexJ = $(this).closest('tr').index();
  // var $checkbox = $('input:checked').closest('tr').remove();
}

function attachStatus() {
  var $change = $(this).closest('tr').css("color","red");
  console.log(this);
  var taskClicked = $change.index() - 1;
  $.post('./status', {"status": taskClicked})
    .succes(function(data) {
      $change.css("color", "red");
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
