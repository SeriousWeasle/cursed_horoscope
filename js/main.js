var readings = {};
const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];

var eastereggs = {};
var horoscopes = {};

var loaded = 0;

fetch('./data/easter-eggs.json').then(respone => {return respone.json();}).then(jsondata => { eastereggs = jsondata; loaded += 1; if (loaded == 2) { makeReadings(); }});
fetch('./data/readings.json').then(respone => {return respone.json();}).then(jsondata => { horoscopes = jsondata; loaded += 1; if (loaded == 2) { makeReadings(); }});

var seed = Math.floor(Date.now() / 24 / 3600 / 1000);

var seedRNG = new Math.seedrandom(seed);

function showSignReading(id)
{
    if (loaded == 2)
    {
        currDate = new Date();
        document.getElementById("reading-sign-name").innerText = signs[id];
        document.getElementById("reading-sign-date").innerText = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDay()}`;
    
        if (Math.random() < 0.02) //easter egg
        {
            document.getElementById("reading").innerText = eastereggs.easter_eggs[Math.round(Math.random() * (eastereggs.easter_eggs.length - 1))];
        }
        else
        {
            document.getElementById("reading").innerText = readings[signs[id]];
        }
        document.getElementById("sign-header").style.display = "flex";
        document.getElementById("reading").style.display = "flex";
    }
}

function makeReadings()
{
    ids = [];
    while (ids.length < signs.length)
    {
        let rID = Math.round(seedRNG() * (horoscopes.readings.length - 1));
        if (!ids.includes(rID)) 
        {
            ids.push(rID);
        }
    }
    ids.forEach((id, idx) => {
        readings[signs[idx]] = horoscopes.readings[id];
    });
}