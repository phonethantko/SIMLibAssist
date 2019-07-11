#!/usr/bin/env bash
# SIMLibrary - http://library.sim.edu.sg
# curl "http://ezproxy.sim.edu.sg/menu" >> sim-raw.html
grep -Eoi '<a [^>]+>' sim-raw.html | grep -Eo 'href="[^\"]+"' | grep -Eo '(http|https)://[^/"]+'| uniq>> scraped.txt
