# **leaflet-challenge**
## Module 15 Challenge for UCI Data Analytics Bootcamp

## Vincent Passanisi

## Due February 6, 2023 Submitted February 19, 2023

# **Introduction**

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# **Files**

In the repository are the completed challenge files.

* *README.md* - ReadMe file for the project.
* *Leaflet-part-1* is the folder that holds part 1 of the challenge assignment
    * *index.html* is the html file for the challenge.
    * *static* folder contains the js folder and the css folder


* *js* Folder - This folder contains the *logic.js* file which is the JavaScript code that updates the html file.

* *css* Folder - This folder contains *style.css* file for the *index.html* file


# **Results**

**DATASET RETRIEVAL**

Variables are created for today's date and the date two weeks prior. A query url is built and earthquake data is retrieved for the past two weeks.

**IMPORT AND DATA VISUALIZATION**

Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude.

![map](Leaflet-Part-1/images/map.png)map.png)

Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.

![markers](Leaflet-Part-1/images/markers.png)

Popups are included that provide additional information about the earthquake when its associated marker is clicked.

![popups](Leaflet-Part-1/images/popup.png)

A legend provides context for the map data by illustrating the color scale by depth.

![legend](Leaflet-Part-1/images/legend.png)


# **Comments and Thoughts**

This challenge was probably one of the most difficult for me, along with the last one. JavaScript continues to elude me. I am still having difficulty understanding how best to structure the code. However, I learned a great deal from working with my team on group project 3. Understanding the role that the *style.css* file plays and how it works with the html file helped me to get my legend to show up on the map. Also, I was able to figure out on my own a way to get the dates right for my API call. I had a couple good tutor sessions that helped a lot, and Grace and Mark also helped me restructure my code to get my markers right.

I am turning in the assignment now with only part one completed since the bonus isn't required to get full credit for the assignment, but I plan to continue working on the assignment, complete the bonus for practice and resubmit at a later date.



