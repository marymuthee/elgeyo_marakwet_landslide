
////*************ELGEYO MARAKWET-KENYA LANDSLIDE VISUALIZANTION************//

//During the first week of November 2025, Chesongoch area, Elgeyo Marakwet in Kenya
//was hit by a landslide due to flash floods. Apprixately 1000 homes were destroyed and lives lost
//in this GEE script I will be visualizing this landslide as seen from sentinel-2 imagery
//The AOI was generated from this code editor as a polygon as seen above
//I first visualized a true color image composite and then computed Modified Soil Adjusted Vegetation Index (MSAVI)
// A split panel is used to compare the before and after images from both the true color images and MSAVi


// Download the Sentinel-2 imagery collection
var s2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED');

// Filter the collection by location, date boundaries and cloud cover percentage
var s2_filtered_before = s2.filterBounds(aoi)
    .filterDate('2025-10-15','2025-10-31')  //before and after dates
    .map(function(image){return image.clip(aoi)})  //clip to aoi
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30);  //filter clouds

// This will sort lowest cloud cover image first.
var sorted_before = s2_filtered_before.sort('CLOUDY_PIXEL_PERCENTAGE', true);

// Pick the median image from the sorted and filtered collection
var image_before = ee.Image(sorted_before.median());

//after image collection
var s2_filtered_after = s2.filterBounds(aoi)
    .filterDate('2025-11-04','2025-11-10')  //before and after dates
    .map(function(image){return image.clip(aoi)})  //clip to aoi
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 30);  //filter clouds

// This will sort lowest cloud cover image first.
var sorted_after = s2_filtered_after.sort('CLOUDY_PIXEL_PERCENTAGE', true);
// Pick the median image from the sorted and filtered collection
var image_after = ee.Image(sorted_after.median());

//Compute MSAVI
//function to calculate msavi from sentinel-2
var getMSAVI= function(image) {
  // Calculate MSAVI using the formula: (2 * NIR + 1 - sqrt((2 * NIR + 1)^2 - 8 * (NIR - RED))) / 2
  var msavi = image.expression(
    '(2 * NIR + 1 - sqrt((2 * NIR + 1) * (2 * NIR + 1) - 8 * (NIR - RED))) / 2', {
      'NIR': image.select('B8'), 
      'RED': image.select('B4')  
    }).rename("MSAVI"); // Rename the calculated band to "MSAVI"

  // Add the calculated MSAVI band to the input image
  image = image.addBands(msavi);

  // Return the image with the new MSAVI band added
  return image;
}


//get the msavi for the before and after images
var before_msavi = getMSAVI(image_before).select('MSAVI');
var after_msavi  = getMSAVI(image_after).select('MSAVI');


// VISUALIZATION PARAMETERS
// True color (RGB)
var trueColorViz = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 2500
};

// MSAVI
var msaviViz = {
  min: 0.1,
  max: 0.8,
  palette: ['#FF0000', '#FFFF00', '#00FF00']
};

//map true color images (before and after)
Map.addLayer(image_before,trueColorViz,"TrueImage Before")
Map.addLayer(image_after,trueColorViz,"TrueImage After")

//map evi (before and after)
Map.addLayer(before_msavi, msaviViz, "Msavi Before");
Map.addLayer(after_msavi,  msaviViz, "Msavi After");
Map.centerObject(aoi,15)


//CREATING SPLIT MAP
// Create two maps (left and right)
var leftMap = ui.Map();
var rightMap = ui.Map();

// Center maps on AOI
leftMap.centerObject(aoi, 15);
rightMap.centerObject(aoi, 15);

// Add layers to left map (before)
var leftTrue = leftMap.addLayer(image_before, trueColorViz, 'TrueImage Before', true); //true color as default
var leftMsavi = leftMap.addLayer(before_msavi, msaviViz, 'MSAVI Before', false); // off initially

// Add layers to left map (after)
var rightTrue = rightMap.addLayer(image_after, trueColorViz, 'TrueImage After', true);
var rightMsavi = rightMap.addLayer(after_msavi, msaviViz, 'MSAVI After', false); // off initially

// Link the maps 
var linker = ui.Map.Linker([leftMap, rightMap]);

//tooggle between
var toggleSelect = ui.Select({
  items: ['TrueImage Before', 'Before MSAVI'],
  value: 'TrueImage Before',
  onChange: function(value) {
    var showTrue = (value === 'TrueImage Before');
    
    // Show/hide true color
    leftTrue.setShown(showTrue);
    rightTrue.setShown(showTrue);
    
    // Show/hide MSAVI
    leftMsavi.setShown(!showTrue);
    rightMsavi.setShown(!showTrue);
  }
});

//lable the toggle tool
var label = ui.Label('Layer view:');

//set the control panel
var controlPanel = ui.Panel({
  widgets: [label, toggleSelect],  //add the label plus the toggle bar
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'top-left',
    padding: '8px',
    backgroundColor: 'white'
  }
});

// Add control panel on the LEFT map
leftMap.add(controlPanel);

//add the split panel

var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);