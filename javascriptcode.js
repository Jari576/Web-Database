$(document).ready(function () {
    "use strict";
    var number = 0;
    var taskarray = [];
    $("#addtask").click(function () {
        var x = document.getElementById("form1");

        if (x.elements[0].value == "" || x.elements[1].value == "" || x.elements[2].value == "") {
            alert("All fields should be filled out");
            return;
        }
        /*var i;
         for (i = 0; i < taskarray.size; i++) {
         if (x.elements[1].value == taskarray[i].getImportance()) {
         alert("no two tasks can have the same importance");
         return;
         }
         }*/

        var temptask = new task(x.elements[0].value, x.elements[1].value, x.elements[2].value, number)
        taskarray.push(temptask);
        writeTaskArrayToHTML(taskarray);
        writeTaskToHTML({task: temptask});
        number++;
    });
});

function writeTaskArrayToHTML(array) {
    var i;
    for (i = 0; i < array.size; i++) {
        //writeTaskToHTML({task: taskarray[i].getName()});
        console.log(array[i].getName());
    }
}

function writeTaskToHTML(parameters) {
    var task = parameters.task;
    var text =
        "<tr class='" + task.getNumber() + "'>" +
        "<td id='" + task.getNumber() + "'>" + task.getName() + " <button onclick='deleteListItem(" + task.getNumber() + ")'>change</button></td>" +
        "<td>" + task.getImportance() + "</td>" +
        "<td>" + task.getDuedate() + "</td>" +
        "<td> <button onclick='deleteListItem(" + task.getNumber() + ")'>Delete task</button> </td>" +
        "</tr>";
    $("table").append(text);
}

function changetask(id, type) {
    $("#" + id + ", " + type).html("<b>Hello world!</b>");
}

function deleteListItem(id) {
    $("tr").remove("." + id);
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



