#!/usr/bin/env bash
sort -u sim.txt -o sim.txt
echo -n "var sim_resources = {'" > ../js/resources.js
cat sim.txt | sort | uniq | tr "\n" "," | sed "s/,/':1,'/g" | head -c-2 >> ../js/resources.js
echo "};" >> ../js/resources.js
