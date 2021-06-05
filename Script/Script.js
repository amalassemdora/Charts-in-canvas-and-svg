//variables
var in1 = document.getElementById('inpt1'),
    in2 = document.getElementById('inpt2'),
    in3 = document.getElementById('inpt3'),
    in4 = document.getElementById('inpt4'),
    val1 = document.getElementById('value1'),
    val2 = document.getElementById('value2'),
    val3 = document.getElementById('value3'),
    val4 = document.getElementById('value4'),
    clr1 = document.getElementById('color1'),
    clr2 = document.getElementById('color2'),
    clr3 = document.getElementById('color3'),
    clr4 = document.getElementById('color4'),
    chek1 = document.getElementById('chk1'),
    chek2 = document.getElementById('chk2'),
    chek3 = document.getElementById('chk3'),
    chek4 = document.getElementById('chk4'),
    percent = [];
var flag;
document.getElementById('btn1').onclick = function() {
    var myCanv = document.getElementById('myCanv1');
    var ctx = myCanv.getContext("2d");
    var myCanv1 = document.getElementById('myCanv2');
    var ctx1 = myCanv1.getContext("2d");
    flag = false;
    check_Empty();
    ctx.clearRect(0, 0, myCanv.Width, myCanv.height);
    ctx1.clearRect(0, 0, myCanv1.Width, myCanv1.height);
    document.getElementById('myCanv1').style.width = '0px';
    document.getElementById('myCanv2').style.width = '0px';
    document.getElementById('line_chart').innerHTML = "";
    document.getElementById('bar_chart').innerHTML = "";
    document.getElementById('data').innerHTML = "";

    var total = 0;
    var data = [
        { inpt: in1.value, val: parseInt(val1.value), clr: clr1.value },
        { inpt: in2.value, val: parseInt(val2.value), clr: clr2.value },
        { inpt: in3.value, val: parseInt(val3.value), clr: clr3.value },
        { inpt: in4.value, val: parseInt(val4.value), clr: clr4.value }
    ];
    for (var i = 0; i < 4; i++) {
        total += data[i].val;
    }
    for (var i = 0; i < 4; i++) {
        percent[i] = Math.round(data[i].val * 100 / total);
    }
    if (chek1.checked) {
        document.getElementById('myCanv1').innerText = DrawPieChart();
    }
    if (chek2.checked) {
        document.getElementById('myCanv2').innerText = DrawDoughnutChart();
    }
    if (chek3.checked) {
        DrawLineChart();
    }
    if (chek4.checked) {
        DrawBarChart();
    }
    drawdata();
    //////////////////////////////////////////////////////////canvas////////////////////////////////////////////////////////////////////
    function DrawPieChart() {
        document.getElementById('myCanv1').style.width = '220px';
        var x = 100,
            y = 100,
            radius = 100,
            startpoint = 0,
            endpoint;
        //draw
        for (var i = 0; i < 4; i++) {
            //calculate endpoint
            endpoint = startpoint + (2 / 100 * percent[i]);
            ctx.beginPath();
            //Fill color
            ctx.fillStyle = data[i].clr;
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startpoint * Math.PI, endpoint * Math.PI);
            ctx.fill();
            // ctx.fillStyle = "white";
            // ctx.font = "bold 20px Arial";
            // ctx.fillText(percent[i] + "% ", 150 * Math.cos(startpoint * Math.PI), 150 * Math.sin(endpoint * Math.PI / 2));
            startpoint = endpoint;
        }
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Pie Chart", 50, 225);
    }

    function DrawDoughnutChart() {
        document.getElementById('myCanv2').style.width = '220px';
        var w = 100,
            z = 100,
            radius2 = 100,
            startpoint1 = 0;
        for (var i = 0; i < 4; i++) {
            //calculate endpoint
            var endpoint1 = startpoint1 + (2 / 100 * percent[i]);
            ctx1.beginPath();
            //Fill color
            ctx1.fillStyle = data[i].clr;
            ctx1.moveTo(w, z);
            ctx1.arc(w, z, radius2, startpoint1 * Math.PI, endpoint1 * Math.PI);
            ctx1.fill();
            startpoint1 = endpoint1;
        }
        ctx1.beginPath();
        ctx1.fillStyle = "white";
        ctx1.arc(w, z, 50, 0, 2 * Math.PI);
        ctx1.fill();
        ctx1.fillStyle = "black";
        ctx1.font = "16px Arial";
        ctx1.fillText("Doughnut Chart", 50, 225);
    }

    ///////////////////////////////////////////////////////////svg/////////////////////////////////////////////////////////////////////
    function DrawLineChart() {
        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 40, left: 60 },
            width = 400 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        // create svg element, respecting margins
        var svg = d3.select("#bar_chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Add X axis
        var x = d3.scaleBand()
            .domain([in1.value, in2.value, in3.value, in4.value]) // This is what is written on the Axis
            .range([0, width]) // This is where the axis is placed
            .padding([0.8]) // Goes between 0 and 1. Default is 0

        // Draw the axis
        svg
            .append("g")
            .attr("transform", `translate(0,${height})`) // This controls the vertical position of the Axis
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        svg
            .append("g")
            .call(d3.axisLeft(y));
        // Add circles :
        for (var i = 0; i < 4; i++) {
            svg
                .append("circle")
                .attr("cx", x(data[i].inpt))
                .attr("cy", height - percent[i] * 2.4)
                .attr("r", 4)
                .style("fill", data[i].clr)
        }
        svg.append("line")
            .attr("x1", 55)
            .attr("x2", 55 * 2.2)
            .attr("y1", (height - percent[0] * 2.4))
            .attr("y2", (height - percent[1] * 2.4))
            .attr("stroke", "black")
        svg.append("line")
            .attr("x1", 55 * 2.2)
            .attr("x2", 55 * 3.4)
            .attr("y1", (height - percent[1] * 2.4))
            .attr("y2", (height - percent[2] * 2.4))
            .attr("stroke", "black")
        svg.append("line")
            .attr("x1", 55 * 3.4)
            .attr("x2", 55 * 4.6)
            .attr("y1", (height - percent[2] * 2.4))
            .attr("y2", (height - percent[3] * 2.4))
            .attr("stroke", "black")

    }

    function DrawBarChart() {
        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 40, left: 60 },
            width = 400 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        // create svg element, respecting margins
        var svg = d3.select("#bar_chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Add X axis
        var x = d3.scaleBand()
            .domain([in1.value, in2.value, in3.value, in4.value]) // This is what is written on the Axis: from 0 to 100
            .range([0, width]) // This is where the axis is placed: from 100 px to 800px
            .padding([0.8]) // Goes between 0 and 1. Default is 0

        // Draw the axis
        svg
            .append("g")
            .attr("transform", `translate(0,${height})`) // This controls the vertical position of the Axis
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        svg
            .append("g")
            .call(d3.axisLeft(y));

        // Add bars :
        for (var i = 0; i < 4; i++) {
            svg
                .append("rect")
                .attr("x", x(data[i].inpt))
                .attr("y", height - percent[i] * 2.4)
                .attr("height", percent[i] * 2.4)
                .attr("width", x.bandwidth())
                .style("fill", data[i].clr)
        }

    }

    function drawdata() {
        for (var i = 0; i < 4; i++) {
            // set the dimensions and margins of the graph
            var margin = { top: 10, right: 10, bottom: 10, left: 10 },
                width = 250 - margin.left - margin.right,
                height = 150 - margin.top - margin.bottom;
            // create svg element, respecting margins
            var svg = d3.select("#data")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            svg
                .append("rect")
                .attr("x", 30)
                .attr("y", 20)
                .attr("height", 15)
                .attr("width", 15)
                .style("fill", data[i].clr)
            var txt = String(percent[i]);
            svg
                .append("text")
                .attr("x", 55)
                .attr("y", 35)
                .attr("stroke", "black")
                .text(data[i].inpt + "      [" + percent[i] + '  %]');
        }
    }
}



function check_Empty() {
    if (in1.value == "") {
        document.getElementById('empty').innerText += "1st Data input don't allow to be empty and must start with alphabet letter. \n";
        flag = true;
    } else {
        flag = false;
    }
    if (in2.value == "") {
        document.getElementById('empty').innerText += "2nd Data input don't allow to be empty and must start with alphabet letter. \n";
        flag = true;
    } else {
        flag = false;
    }
    if (in3.value == "") {
        document.getElementById('empty').innerText += "3rd Data input don't allow to be empty and must start with alphabet letter. \n";
        flag = true;

    } else {
        flag = false;
    }
    if (in4.value == "") {
        document.getElementById('empty').innerText += "4th Data input don't allow to be empty and must start with alphabet letter. \n";
        flag = true;
    } else {
        flag = false;
    }
    if (val1.value == "") {
        document.getElementById('empty').innerText += "1st Data input don't allow to be empty and must be greater than zero.  \n";
        flag = true;

    } else {
        flag = false;
    }
    if (val2.value == "") {
        document.getElementById('empty').innerText += "2nd Data input don't allow to be empty and must be greater than zero. \n";
        flag = true;
    } else {
        flag = false;
    }
    if (val3.value == "") {
        document.getElementById('empty').innerText += "3rd Data input don't allow to be empty and must be greater than zero. \n";
        flag = true;

    } else {
        flag = false;
    }
    if (val4.value == "") {
        document.getElementById('empty').innerText += "4th Data input don't allow to be empty and must be greater than zero. \n";
        flag = true;

    } else {
        flag = false;
    }
    if (chek1.checked == false && chek2.checked == false && chek3.checked == false && chek4.checked == false) {
        document.getElementById('empty').innerText += "You must choose atleast one chart."
        flag = true;
    } else {
        flag = false;
    }
    if (flag) {
        setDivStyle();
    } else {
        resetDivStyle_text()
    }
}

function setDivStyle() {
    document.getElementById('empty').style.color = 'rgb(68, 3, 3)';
    document.getElementById('empty').style.backgroundColor = 'rgb(245, 153, 153)';
    document.getElementById('empty').style.border = '1px solid red';
    document.getElementById('empty').style.margin = '10px auto';
    document.getElementById('empty').style.padding = '20px';

}

function resetDivStyle_text() {
    document.getElementById('empty').innerText = "";
    document.getElementById('empty').style.color = 'white';
    document.getElementById('empty').style.backgroundColor = 'white';
    document.getElementById('empty').style.border = '0px solid white';
    document.getElementById('empty').style.margin = '10px auto';

}