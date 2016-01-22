$(document).ready(init);

var taskArray = [];

function init() {

  $('.dropList').on('click', findCat)
  $('#formEntry').submit(newEntry);
  console.log(this);
  $('#catDropDown').on('change', findCat);
  $('table').on('click', '#trash', deleteTrans);
  $('table').on('click', '#fav', attachFav);
  $('table').on('dblclick', 'th', sortHeaders);

}

function removeEntries() {
  $('input:checked').closest('tr').remove();
}

function newEntry(event) {
  // event.preventDefault();
  console.log(this);

  var name = $('#taskEntry').val();
  var desc = $('#descEntry').val();
  var date = $('#dateEntry').val();

 var task = {
   "name": name,
   "desc": desc,
   "date": date,
 };

taskArray.push(task);

var $tr = $('#template').clone();
 $tr.removeAttr('id');
 $tr.children('.name').text(task.name);
 $tr.children('.desc').text(task.desc);
 $tr.children('.date').text(task.date);

console.log(this);
 }

function deleteTrans() {
  $(this).closest('tr').remove();
}

function attachFav() {
  $(this).closest('tr').css("color","red");
  console.log(this);
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
// 
// 'use strict';
//
// $(document).ready(init);
//
// function init() {
//   populateNames();
//   $('#newEntry').click(addTask);
// }
//
// function addTask() {
//   var newTask = $('#formEntry').val();
//   $.post('/names', {name: newTask})
//   .success(function(data) {
//     var $li = $('<li>').text(newTask);
//     $('#template').append($li);
//   })
//   .fail(function(err) {
//     alert('fix me');
//   });
// }
//
// function populateTasks() {
//   $.get('/tasks', function(data) {
//     var $task = data.map(function(tasks) {
//       return $('<li>').text(task);
//     });
//     $('#template').append($tasks);
//   });
// }
// ---$(document).ready(init);
//
// var taskArray = [];
//
// function init() {
//   loadFromStorage();
//   updateList();
//
//   $('.dropList').on('click', findCat)
//   $('#formEntry').submit(newEntry);
//   console.log(this);
//   $('#catDropDown').on('change', findCat);
//   $('table').on('click', '#trash', deleteTrans);
//   $('table').on('click', '#fav', attachFav);
//   $('table').on('dblclick', 'th', sortHeaders);
//
// }
//
// function removeEntries() {
//   $('input:checked').closest('tr').remove();
// }
//
// function newEntry(event) {
//   // event.preventDefault();
//   console.log(this);
//
//   var name = $('#taskEntry').val();
//   var desc = $('#descEntry').val();
//   var date = $('#dateEntry').val();
//
//  var task = {
//    "name": name,
//    "desc": desc,
//    "date": date,
//  };
//
// taskArray.push(task);
//
// var $tr = $('#template').clone();
//  $tr.removeAttr('id');
//  $tr.children('.name').text(task.name);
//  $tr.children('.desc').text(task.desc);
//  $tr.children('.date').text(task.date);
//
// saveToStorage();
// updateList();
// console.log(this);
//  }
//
// function deleteTrans() {
//   $(this).closest('tr').remove();
// }
//
// function attachFav() {
//   $(this).closest('tr').css("color","red");
//   console.log(this);
// }
//
// function findCat(event) {
//   event.preventDefault();
//   var text = $(this).text();
//   $('#catEntry').text(text).append('<span class="caret"></span>');
//   console.log(text);
// }
//
// function addTask() {
//   var contact = $('#formEntry').val()
//   contactList.push(contact);
//
//   saveToStorage();
//   updateList();
// }
//
// function saveToStorage() {
//   localStorage.contactArray = JSON.stringify(contactArray);
// }
//
// function loadFromStorage() {
//   if(!localStorage.contactArray) {
//     localStorage.contactArray = '[]';
//   }
//   contactArray = JSON.parse(localStorage.contactArray);
// }
//
// function updateList() {
// var taskList = $('#taskList');
//
// taskList.children().not('#template').remove();
//
//   var $tasks = taskArray.map(function(task, index) {
//     var $tr = $('#template').clone();
//     $tr.removeAttr('id');
//     $tr.children('.name').text(task.name);
//     $tr.children('.desc').text(task.desc);
//     $tr.children('.date').text(task.date);
//     return $tr
//     });
//   taskList.append($tasks);
// }
//
// function sortHeaders(e) {
//   var $target = $(e.target);
//   console.log($target);
//   var $targetClass = $target.attr('class');
//
//   taskArray = _.sortBy(taskArray, $targetClass);
//
//   saveToStorage();
//   updateList();
// }
