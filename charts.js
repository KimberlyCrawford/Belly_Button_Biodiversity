// Belly Button Biodiversity Challenge

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Given 1. Create the buildCharts function. the sample that is selected from the dropdown menu.
function buildCharts(sample) {

// Given 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    console.log(data)
    // In Steps 3-6, initialize variables that hold arrays for the sample that is selected from the dropdown menu on the webpage.
    // 3. Create a variable that holds the samples array. 
    var samples= data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number. 
    // Create a variable that will hold an array that contains all the data from the new sample that is chosen from the dropdown menu. 
    // To retrieve the data from the new sample, filter the variable created in Step 3 for the sample id that matches the new sample id chosen from the dropdown menu and passed into the buildCharts() function as the argument.
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result= resultsarray[0]
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
    

//---------------------------------------------------------//
//---------------------------------------------------------//
              //  Build a BAR Chart
//---------------------------------------------------------//  
//---------------------------------------------------------// 

// 7. Create the yticks for the bar chart. Hint: Get the the top 10 otu_ids and map them in descending order  
//  so the otu_ids with the most bacteria are last. Chain the slice() method with the map() and reverse() functions to retrieve the top 10 otu_ids sorted in descending order.
var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();

// In Steps 8-10, create the trace object, the layout, and Plotly.newPlot() function for the horizontal bar chart.
// 8. Create the trace object for the bar chart, where the x values are the sample_values and the hover text for the bars are the otu_labels in descending order. 
var bar_trace = [
  {
    x: top_ten_sample_values,  
    y: top_ten_otu_ids,
    text: top_ten_otu_labels,
    name: "Top 10",
    type: 'bar',
    orientation: 'h'
  }
  ];

var data = [bar_trace];

// 9. Create the layout for the bar chart. In Step 9, create the layout for the bar chart that includes a title.
var barLayout = {
  title: "Top 10 Bacteria Cultures Found",
  margin: { t: 30, l: 150 }
};
// 10. Use Plotly to plot the data with the layout. In Step 10, use the Plotly.newPlot() function to plot the trace object with the layout.
Plotly.newPlot("bar", bar_data, barLayout);
});
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
