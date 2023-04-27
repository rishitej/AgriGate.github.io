//navigation
const navItems = document.querySelectorAll('li');

const changeActiveItem = () => {
    navItems.forEach(item => {
        const link = item.querySelector('a');
        link.classList.remove('active');
    })
}

navItems.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', () => {
        changeActiveItem();
        link.classList.add('active');
    })
})

//read more
const readMoreBtn = document.querySelector('.read-more');
const readMoreContent = document.querySelector('.read-more-content');

readMoreBtn.addEventListener('click', () => {
    readMoreContent.classList.toggle('show-content');
    if(readMoreContent.classList.contains('show-content')){
        readMoreBtn.textContent = "Show less";
    }
    else{
        readMoreBtn.textContent = "Show more";
    }
})

// show/hide skill items
const skillItems = document.querySelectorAll('section.skills .skill');

skillItems.forEach(skill => {
    skill.querySelector('.head').addEventListener('click', () => {
        skill.querySelector('.items').classList.toggle('show-items');
    })
})

// function to generate form options
function CrpSelGen() {

    var selYear = document.getElementById('crop_year');
    var stYear = 1997;
    var enYear = 2030;
    for (var i = stYear; i <= enYear; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selYear.appendChild(option);
    }

    var selDist = document.getElementById('districts');
    var distVal = ['AHMEDNAGAR', 'AKOLA', 'AMRAVATI', 'AURANGABAD', 'BEED', 'BHANDARA', 'BULDHANA', 'CHANDRAPUR', 'DHULE', 'GADCHIROLI', 'GONDIA', 'HINGOLI', 'JALGAON', 'JALNA', 'KOLHAPUR', 'LATUR', 'NAGPUR', 'NANDED', 'NANDURBAR', 'NASHIK', 'OSMANABAD', 'PARBHANI', 'PUNE', 'SANGLI', 'SATARA', 'SOLAPUR', 'WARDHA', 'WASHIM', 'YAVATMAL', 'THANE']
    
    distVal.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selDist.appendChild(option);
    });

    var selSea = document.getElementById('season');
    var SeaVal = ['Rabi', 'Kharif', 'Zaid']

    SeaVal.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selSea.appendChild(option);
    });

    var selSType = document.getElementById('soil-type');
    var STypeVal = ['clay', 'sandy', 'silty', 'loamy', 'peaty', 'chalky']

    STypeVal.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selSType.appendChild(option);
    });

    var selCrp = document.getElementById('crop');
    var CrpVal = ['Jowar', 'Bajra', 'Wheat']

    CrpVal.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selCrp.appendChild(option);
    });
}

//function for API calls
async function Form1() {
    const form = document.getElementById("phpForm");
    event.preventDefault();

    const data = {
        "Crop_Year": parseInt(document.getElementById("crop_year").value),
        "Area": parseInt(document.getElementById("area").value),
        "Temperature": parseInt(document.getElementById("temperature").value),
        "Precipitation": parseInt(document.getElementById("precipitation").value),
        "Humidity": parseInt(document.getElementById("humidity").value),
        "Districts": document.getElementById("districts").value,
        "Season": document.getElementById("season").value,
        "Soil_type": document.getElementById("soil-type").value,
        "Crop": document.getElementById("crop").value
    };

    const response1 = await fetch("http://20.204.27.238:5000/tab-transformer-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response2 = await fetch("http://20.204.27.238:5000/multimodal-bert-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response3 = await fetch("http://20.204.27.238:5000/attention-stacking-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response4 = await fetch("http://20.204.27.238:5001/rf-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response5 = await fetch("http://20.204.27.238:5001/ann-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response6 = await fetch("http://20.204.27.238:5001/ann-rf-stacking-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const result1 = await response1.json();
        const result2 = await response2.json();
        const result3 = await response3.json();
        const result4 = await response4.json();
        const result5 = await response5.json();
        const result6 = await response6.json();
        // console.log(result);
        const yieldOp1 = result1["Yield"];
        const yieldOp2 = result2["Yield"];
        const yieldOp3 = result3["Yield"];
        const yieldOp4 = result4["Yield"];
        const yieldOp5 = result5["Yield"];
        const yieldOp6 = result6["Yield"];

        const Yield1 = document.getElementById("yield1");
        Yield1.value = yieldOp1.toFixed(4);
        const Yield2 = document.getElementById("yield2");
        Yield2.value = yieldOp2.toFixed(4);
        const Yield3 = document.getElementById("yield3");
        Yield3.value = yieldOp3.toFixed(4);
        const Yield4 = document.getElementById("yield4");
        Yield4.value = yieldOp4.toFixed(4);
        const Yield5 = document.getElementById("yield5");
        Yield5.value = yieldOp5.toFixed(4);
        const Yield6 = document.getElementById("yield6");
        Yield6.value = yieldOp6.toFixed(4);

    } 
    catch (error) {
        console.error(error);
    }
}

// /* animation: bgchange 30s forwards infinite; */
// animation-name: bgchange;
// /* animation-direction: alternate; */
// animation-duration: 30s;
// /* animation-fill-mode: forwards; */
// animation-iteration-count: infinite;
// animation-play-state: running; 
// animation-timing-function: linear;