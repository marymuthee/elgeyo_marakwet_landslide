# elgeyo_marakwet_landslide
Landslide Visualization in Elgeyo Marakwet, Kenya (2025)
Sentinel-2 Analysis and MSAVI-Based Change Detection Using Google Earth Engine

This repository contains a Google Earth Engine (GEE) script developed to visualize the impacts of the November 2025 landslide that occurred in Chesongoch, Elgeyo Marakwet County, Kenya. The study applies Sentinel-2 optical imagery and the Modified Soil Adjusted Vegetation Index (MSAVI) to assess pre- and post-event landscape conditions. The objective is to demonstrate how vegetation-based indices and temporal composites can support rapid landslide assessment in data-scarce environments.

1. Background

In early November 2025, heavy rainfall triggered a large landslide in the Chesongoch region of Elgeyo Marakwet. The event resulted in the loss of lives, displacement of households, and destruction of property. Due to the remote nature of the affected area, satellite Earth observation provides an efficient means to examine the extent and severity of environmental disturbance.

This analysis focuses on comparing surface conditions before and after the event by examining changes in vegetation vigor and surface reflectance patterns.

2. Data and Preprocessing

The analysis uses Sentinel-2 Harmonized Level-1C imagery available in Google Earth Engine.

Temporal windows

Pre-event composite: 15 October – 31 October 2025

Post-event composite: 4 November – 10 November 2025

Preprocessing steps

Filter imagery intersecting the Area of Interest (AOI).

Apply temporal filtering for the pre- and post-event periods.

Apply a cloud threshold using the CLOUDY_PIXEL_PERCENTAGE metadata field (< 30%).

Clip each image to the AOI.

Sort by cloud cover and compute median composites for each period.

These steps ensure that the before/after comparisons are consistent, cloud-minimized, and representative of overall surface conditions.

3. MSAVI Computation

The Modified Soil Adjusted Vegetation Index (MSAVI) is used to enhance vegetation signals in areas where soil exposure is significant. This makes it suitable for identifying vegetation disturbance associated with landslides.

The index is computed using the following formulation:

MSAVI
=
2
⋅
𝑁
𝐼
𝑅
+
1
−
(
2
⋅
𝑁
𝐼
𝑅
+
1
)
2
−
8
(
𝑁
𝐼
𝑅
−
𝑅
𝐸
𝐷
)
2
MSAVI=
2
2⋅NIR+1−
(2⋅NIR+1)
2
−8(NIR−RED)
	​

	​


Where:

NIR corresponds to Sentinel-2 Band 8

RED corresponds to Sentinel-2 Band 4

The MSAVI layers are generated for both the pre-event and post-event composites to facilitate comparison.

4. Visualization Approach

Two types of visual products are produced:

True-color composites (Bands 4-3-2) to show natural surface appearance.

MSAVI layers to highlight changes in vegetation cover and soil exposure.

An interactive split-panel interface is implemented in GEE, allowing simultaneous visualization of:

True-color before vs. true-color after

MSAVI before vs. MSAVI after

A toggle control enables users to switch between true-color and MSAVI views. The synchronized maps support detailed inspection of spatial change patterns associated with the landslide.

5. Running the Analysis in Google Earth Engine

To reproduce the results:

Open the Google Earth Engine Code Editor.

Create a new script and paste the contents of elgeyo_marakwet_landslide_msavi.js.

Define the AOI as a polygon (drawn or imported asset), named aoi.

Run the script to generate the before/after composites and the split-panel viewer.

The script is fully self-contained, requiring only the AOI definition.

6. Interpretation Notes

Areas impacted by the landslide typically show:

Reduced MSAVI values in the post-event image, indicating vegetation removal or soil disturbance.

Enhanced visibility of bare surfaces in the true-color composite.

Distinct spatial patterns where the landslide body moved downslope.

MSAVI is particularly informative for detecting subtle disturbance in areas where true-color imagery alone may not fully capture vegetation loss.

7. Purpose and Use

This workflow provides a reproducible approach for:

Rapid post-disaster assessment

Landslide disturbance mapping

Vegetation condition monitoring

Demonstrating the use of GEE for environmental hazard analysis

The methodology can be adapted to other regions or hazard types requiring before/after comparisons.

8. Script

The complete script used in this analysis is provided in the code directory of this repository.
