$(document).ready(function() {
var firebaseConfig = {
    apiKey: "AIzaSyAHJLR43ABZeeJCfzeXefQkChL9tTKtMBY",
    authDomain: "trainscheduler-d9278.firebaseapp.com",
    databaseURL: "https://trainscheduler-d9278.firebaseio.com",
    projectId: "trainscheduler-d9278",
    storageBucket: "trainscheduler-d9278.appspot.com",
    messagingSenderId: "225765887539",
    appId: "1:225765887539:web:b134ba5d79348415"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to the database service
    var database = firebase.database();

    // Global Variables
    var trainName;
    var trainDestination;
    var trainFrequency;
    var firstTrain;
    var trainNextArrival;
    var trainMinutesAway;

    // Populate Firebase Database with initial data
    // Create on click even to capture form values and add trains to the database
    $("add-train").on("click", function(event) {

        // Prevent form from reloading
        event.preventDefault(event);

        // Capture input from form fields
        trainName = $("#train-input").val().trim();
        trainDestination = $("#destination-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();
        firstTrain = $("#time-input").val().trim();

        // Log everything to console
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainFrequency);
        console.log(firstTrain);

        // Uploads train data to the database
        database.ref().push({
            dbTrainName: trainName,
            dbTrainDestination: trainDestination,
            dbTrainFrequency: trainFrequency,
            dbFirstTrain: firstTrain,
        });

        // Alert "train successfully added"
        alert("Train Successfully Added.");

        // Clears all of the text boxes
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#time-input").val("");

    });

    // Create Firebase event to retrieve trains from the database and a table row in the html when a user adds an entry.
    database.ref().on("child_added", function(snapshot) {

        // Console log data to make sure it is retrieving results
        console.log(snapshot.val());
        console.log(snapshot.val(dbTrainName));
        console.log(snapshot.val(dbTrainDestination));
        console.log(snapshot.val(dbTrainFrequency));
        console.log(snapshot.val(dbFirstTrain));

        // Store everything into a variable
        var tName = snapshot.val().dbTrainName;
        var tDestination = snapshot.val().dbTrainDestination;
        var tFrequency = snapshot.val().dbTrainFrequency;
        var tFirst = snapshot.val().dbFirstTrain;

        // ********************************
        // Next Arrival and Minutes away calculations here
        // ********************************


        // Display results inside the table
        // Create vars to hold table elements and content
        var tr = $("<tr>");
        var tdName = $("<td>").text(tName);
        var tdDestination = $("<td>").text(tDestination);
        var tdFrequency = $("<td>").text(tFrequency);
        var tdFirst = $("<td>").text(tFirst);
        var tdNext = $("<td>").text("to be calculated");
        var tdMinutes = $("<td>").text("to be calculated");

        // Append all table data (td) to the table row (tr)
        tr.append(tdName, tdDestination, tdFrequency, tdFirst, tdNext, tdMinutes);

        // append to tbody element
        $("tbody").append(tr);

    });
});    