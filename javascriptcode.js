var taskarray = new taskArray();
var sortingtype = "importance";
$(document).ready(function () {
    "use strict";
    var number = 0;
    $("#addtask").click(function () {
        var x = document.getElementById("form1");

        if (x.elements[0].value == "" || x.elements[1].value == "" || x.elements[2].value == "") {
            alert("All fields should be filled out");
            return;
        }

        //checkdate
        var dates = [getToday(), x.elements[2].value];
        dates.sort();
        if (dates[0] == (x.elements[2].value)) {
            alert("date has already passed");
            return;
        }

        var temptask = new task(x.elements[0].value, x.elements[1].value, x.elements[2].value, number);
        taskarray.addTask({task: temptask});
        if(sortingtype == "importance"){
            sortByalphabet();
        } else if(sortingtype == "alphabet") {
            sortByalphabet();
        } else if(sortingtype == "duedate") {
            sortByDueDate();
        }
        taskarray.toHTML();
        number++;
    });
});

function sortByalphabet() {
    taskarray.sortByAlphabet();
    sortingtype = "alphabet";
}

function sortByImportance() {
    taskarray.sortByImportance();
    sortingtype = "importance";
}
function sortByDueDate() {
    taskarray.sortByDueDate();
    sortingtype = "duedate";
}

function writeTaskToHTML(parameters) {
    var task = parameters.task;
    var text =
        "<tr class='" + task.getNumber() + "'>" +
        "<td id='" + task.getNumber() + "'>" + task.getName() + " <button onclick='changetask(" + task.getNumber() + ", name)'>change</button></td>" +
        "<td>" + task.getImportance() + "</td>" +
        "<td>" + task.getDuedate() + "</td>" +
        "<td> <button onclick='deleteListItem(" + task.getNumber() + ")'>Delete task</button> </td>" +
        "<td>" + getToday() +"</td>" +
        "</tr>";
    $("table#tasklist").append(text);
}

function getToday() {
    var d = new Date();
    var maand = d.getMonth() + 1;
    var dag = d.getDate();
    if (dag < 10) {
        dag = "0" + dag;
    }
    var dateString = d.getFullYear() + "-" + maand + "-" + dag;
    return dateString;
}

function changetask(id, type) {
    $("#" + id + type).html("");
}

function deleteListItem(id) {
    taskarray.deleteTask(id)
    $("tr").remove("." + id);
}

function taskArray() {
    this.array = [];
    this.addTask = function (parameters) {
        var task = parameters.task;
        console.log(task);
        this.array.push(task);

    };
    this.deleteTask = function (input) {
        var temparray = [];
        for(var i = 0; i<this.array.length; i++){
            if(this.array[i].getNumber() != input){
                temparray.push(this.array[i]);
            }
        }
        this.array = temparray;
    };
    this.toHTML = function () {
        for(var i =0; i<this.array.length; i++){
            $("tr").remove("." + this.array[i].getNumber());
            writeTaskToHTML({task: this.array[i]})
        }
    };
    this.sortByImportance = function () {
        this.array.sort(function(a, b){return a.getImportance() - b.getImportance()});
        this.toHTML();
    };
    this.sortByAlphabet = function () {
        this.array.sort(function(a, b){
            var x = a.getName().toLowerCase();
            var y = b.getName().toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        this.toHTML();
    };
    this.sortByDueDate = function () {
        this.array.sort(function(a, b){
            var x = a.getDuedate().toLowerCase();
            var y = b.getDuedate().toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        this.toHTML();
    }
}

function task(name, importance, duedate, number) {
    this.name = name;
    this.importance = importance;
    this.duedate = duedate;
    this.number = number;
    this.getName = function () {
        return this.name;
    };
    this.getDuedate = function () {
        return this.duedate;
    };
    this.getImportance = function () {
        return this.importance;
    };
    this.getNumber = function () {
        return this.number;
    };
    this.equals = function (parameters) {
        if (!(parameters instanceof task)) {
            return false;
        }
        var tasktocheck = parameters.task;
        if (!tasktocheck.getName.equals(this.name)) {
            return false;
        }
        if (!tasktocheck.getImportance.equals(this.importance)) {
            return false;
        }
        if (!tasktocheck.getDuedate.equals(this.duedate)) {
            return false;
        }
        return true;
    }
}
