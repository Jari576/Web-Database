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
        for (var i = 0; i < taskarray.size; i++) {
            console.log(i);
            if (x.elements[1].value == taskarray[i].getImportance()) {
                alert("no two tasks can have the same importance");
                return;
            }
        }

        //checkdate
        var dates = [getToday(), x.elements[2].value];
        dates.sort();
        if (dates[0] == (x.elements[2].value)) {
            alert("date has already passed");
            return;
        }

        var temptask = new task(x.elements[0].value, x.elements[1].value, x.elements[2].value, number)
        taskarray.push(temptask);
        writeTaskArrayToHTML(taskarray);
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
        "<td id='" + task.getNumber() + "'>" + task.getName() + " <button onclick='changetask(" + task.getNumber() + ", name)'>change</button></td>" +
        "<td>" + task.getImportance() + "</td>" +
        "<td>" + task.getDuedate() + "</td>" +
        "<td> <button onclick='deleteListItem(" + task.getNumber() + ")'>Delete task</button> </td>" +
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

function deleteListItem(id, array) {

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
