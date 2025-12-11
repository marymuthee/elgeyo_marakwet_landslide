# Landslide Visualization in Elgeyo Marakwet, Kenya (2025)
## Sentinel-2 and MSAVI Change Detection Using Google Earth Engine

## 1. Introduction

This repository documents a Google Earth Engine (GEE) workflow developed to visualize the November 2025 landslide in Chesongoch, Elgeyo Marakwet County, Kenya. The analysis uses pre- and post-event Sentinel-2 imagery and the Modified Soil Adjusted Vegetation Index (MSAVI) to assess vegetation disturbance and surface changes associated with the event.

The workflow is intended as a compact example of how freely available satellite data and cloud-based processing can support rapid landslide impact assessment in data-scarce environments.

## 2. Study Area and Event Context

In early November 2025, intense rainfall triggered a large landslide in the Chesongoch area of Elgeyo Marakwet, Kenya. The event resulted in loss of life and damage to housing and infrastructure. Direct field assessment in such terrain is often difficult and delayed, making satellite Earth observation a useful complementary source of information.

The Area of Interest (AOI) is defined as a polygon in the GEE Code Editor representing the landslide-affected region around Chesongoch.

## 3. Data and Pre-Processing

The analysis uses Sentinel-2 Harmonized Level-1C imagery available in Google Earth Engine under the collection:

`COPERNICUS/S2_HARMONIZED`

Two time windows are used:

- Pre-event: 15 October 2025 – 31 October 2025  
- Post-event: 4 November 2025 – 10 November 2025  

For each period, the following preprocessing steps are applied within GEE:

1. Filter the Sentinel-2 collection to images intersecting the AOI.  
2. Filter by the respective date range (pre-event or post-event).  
3. Filter by cloud contamination using the `CLOUDY_PIXEL_PERCENTAGE` metadata (threshold: less than 30%).  
4. Clip images to the AOI.  
5. Sort by cloudiness and compute a median composite for each period.

These steps provide cloud-reduced, spatially consistent pre- and post-event images suitable for visual comparison and index calculation.

## 4. MSAVI Index

To characterise vegetation disturbance, the Modified Soil Adjusted Vegetation Index (MSAVI) is computed for both the pre-event and post-event composites. MSAVI is particularly suitable in environments where vegetation is mixed with exposed soil, as is typical in landslide-affected terrain.

MSAVI is defined using the near-infrared (NIR) and red bands as:

MSAVI = [2 * NIR + 1 − sqrt((2 * NIR + 1)^2 − 8 * (NIR − RED))] / 2

In this implementation:

- NIR corresponds to Sentinel-2 Band 8  
- RED corresponds to Sentinel-2 Band 4  

The resulting MSAVI layers provide a proxy for vegetation vigour and facilitate the identification of areas where vegetation has been removed or degraded by the landslide.

## 5. Visualisation in Google Earth Engine

The script produces two main types of visual products:

1. True-colour composites using bands 4 (red), 3 (green) and 2 (blue) for pre- and post-event conditions.  
2. MSAVI layers for pre- and post-event conditions, displayed with a colour palette highlighting differences in vegetation condition.

An interactive split-panel interface is implemented in the GEE user interface:

- The left map panel displays pre-event imagery.  
- The right map panel displays post-event imagery.  

A simple toggle allows the user to switch both panels between:

- True-colour composites, and  
- MSAVI layers.

Both panels are linked, meaning panning and zooming are synchronized. This design supports systematic visual comparison of spatial patterns before and after the landslide.

## 6. How to Run the Script

To reproduce the analysis in Google Earth Engine:

1. Open the Google Earth Engine Code Editor:  
   https://code.earthengine.google.com

2. Create a new script and paste the contents of the provided GEE script file (the JavaScript code for this project).

3. Define an Area of Interest (AOI) as a polygon in the Code Editor and name it `aoi`.  
   - This can be done by drawing a polygon around the Chesongoch landslide area or by importing a suitable AOI asset and assigning it the variable name `aoi`.

4. Run the script.  
   - The editor will generate:
     - Pre-event and post-event true-colour composites.  
     - Pre-event and post-event MSAVI layers.  
     - A split-panel viewer with a toggle between true-colour and MSAVI views.

No external data files are required; all imagery is accessed directly from the Sentinel-2 collection hosted on GEE.

## 7. Interpretation

Landslide-affected areas are expected to show:

- A reduction in MSAVI values in the post-event image, indicating loss of vegetation and exposure of soil or rock.  
- Increased brightness and changes in texture in the true-colour imagery, corresponding to bare or disturbed surfaces.  
- Coherent spatial patterns along the slope, often extending downslope from a source zone.

By jointly analysing the true-colour composites and MSAVI maps, it is possible to delineate the landslide body and associated disturbed zones with greater confidence than by visual inspection alone.

## 8. Applications and Adaptation

The workflow illustrated in this repository can be adapted to:

- Other landslide events in different regions.  
- Broader change-detection studies focusing on vegetation disturbance.  
- Rapid environmental impact assessment following floods, storms or other hazards.  

Only the AOI definition and the date ranges need to be modified to apply the method to a different event.

## 9. Author

This script and documentation were prepared by:

Mary Muthee  
Geospatial Data Scientist and Copernicus Master in Digital Earth student.

Please cite or acknowledge this work if you reuse the workflow in reports, teaching material or derived analyses.
