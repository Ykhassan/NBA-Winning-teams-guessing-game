const nbaTeams = {
    won: {
        "Boston Celtics": [1957, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1968, 1969, 1974, 1976, 1981, 1984, 1986, 2008, 2024],
        "Los Angeles Lakers": [1949, 1950, 1952, 1953, 1954, 1972, 1980, 1982, 1985, 1987, 1988, 2000, 2001, 2002, 2009, 2010, 2020],
        "Golden State Warriors": [1947, 1956, 1975, 2015, 2017, 2018, 2022],
        "Chicago Bulls": [1991, 1992, 1993, 1996, 1997, 1998],
        "San Antonio Spurs": [1999, 2003, 2005, 2007, 2014],
        "Philadelphia 76ers": [1955, 1967, 1983],
        "Detroit Pistons": [1989, 1990, 2004],
        "Miami Heat": [2006, 2012, 2013],
        "Milwaukee Bucks": [1971, 2021],
        "Houston Rockets": [1994, 1995],
        "New York Knicks": [1970, 1973],
        "Toronto Raptors": [2019],
        "Cleveland Cavaliers": [2016],
        "Dallas Mavericks": [2011],
        "Portland Trail Blazers": [1977],
        "Washington Wizards": [1978],
        "Seattle SuperSonics": [1979],
        "Atlanta Hawks": [1958],
        "Sacramento Kings": [1951],
        "Denver Nuggets": [2023]
    }
};

// setTimeout == period before code execution 
// setInterval == period between code execution 


// text content retrive text of the element, innerhtml retrive the entire innerHtml of the element 
// value is a property of input elements


// question i kept asking my self
/*
how does a nested event callz a function in an outer listner scope that is triggered only once 
the answer is closure because the nested method has access to all the outer listner scope mewo


things that didnt work is when i wanted to reset the value of the p tag using p.value= "" it only worked with span no idea
*/

// check to start the game


var startingButton = document.getElementById("startingButton");


// initial start of the game
startingButton.addEventListener("click", () => {
    document.body.innerHTML = `<h1>NBA Title Quiz</h1>
    <input type="text" id="teamInput" placeholder="Enter an NBA team name">
    <table>
        <thead>
            <tr>
                <th colspan="2">Teams that have won NBA titles</th>
            </tr>
            <tr>
                <th>Team</th>
                <th>Years</th>
            </tr>
        </thead>
        <tbody id="wonTableBody"></tbody>
    </table>

    <p id="timend">Timer <span id="timer"></span></p>
    <p id="verbose"></p>
    <button id="resetButton">Play</button> `;

// fetch elements for timer
var sp = document.getElementById("timer");
var p = document.getElementById("timend");
var resetButton = document.getElementById("resetButton");

// fetch elements for data
var inputfield = document.getElementById("teamInput");
var wonTable = document.getElementById("wonTableBody");
var verbose = document.getElementById("verbose");


// define timer Variable
var timer = 0;

// set of users answers
var arr;
var correctGuess = 0;
var wrongAnswersCount = 0;
var alreadyExists = 0;

// add event to start playing 
resetButton.addEventListener("click", () => {

    // set it to empty string each time he resets it will empty the verbose
    verbose.innerHTML=" ";

    // set the timer and create empty array
    timer = 30;
    arr = [];

    // allow him to enter guess since he started playing
    inputfield.disabled = false;

    // reset table when he reset the game
    wonTable.innerHTML = "";

    // dont allow user to restart while playing 
    resetButton.disabled = true;



    // due to clouser in JS resetbutton can have access to the timer function whenever its triggered even if Starting button isnt invoked
    const timeOut = setTimeout(() => {

        // disable it so he dont guess when Time is already done
        inputfield.disabled = true;

        // reset verbose and Wronganswercount
        verbose.innerHTML = "";
        wrongAnswersCount = 0;
        alreadyExists = 0;

        // reset arr 
        arr = [];
        
        // display time endded
        verbose.innerHTML= `Time ended`;

        // reset interval repetation
        clearInterval(timerInterval);

        // reset timer
        timer = 30;

        // reset correct guesses
        correctGuess = 0;

        resetButton.disabled = false;

        // idont know why the addition of two seconds made it reach 0 maybe because other function execution took two seconds !!!!
        }, timer * 1000 + 2000);

        // update timer
        const timerInterval = setInterval(() => {
            sp.textContent = timer--;
        }, 1000);

        inputfield.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                var splitttting = inputfield.value.split(" ");
                var teamCount = splitttting.pop();
                var userValue = splitttting.join().replace(",", " ");
                if (!arr.includes(inputfield.value)) {
                    // find in winners teams table
                    if (nbaTeams.won.hasOwnProperty(userValue) && teamCount == nbaTeams.won[userValue].length) {

                        verbose.innerHTML = `Correct guess ${++correctGuess}`;
                        arr.push(inputfield.value);

                        wonTable.innerHTML += `<tr> <td>${userValue}</td> <td>${teamCount}</td></tr>`;
                        // decleare him the winner
                        if (correctGuess == 3) {
                            verbose.innerHTML = `Congrats you won !!!! 3/3 correct guesses in with ${timer} seconds remaining`; 

                            //resret interval and timeout
                            clearInterval(timerInterval);
                            clearTimeout(timeOut);

                            // disable it so he dont guess when he already won
                            inputfield.disabled = true;

                            // enable the play button
                            resetButton.disabled=false;

                        }


                    }

                    else {
                        verbose.innerHTML = `wrong answer ${++wrongAnswersCount}`;
                    }
                }
                else {
                    verbose.innerHTML = `value has already been added ${++alreadyExists}`;
                }
            }
        })
    });


});





