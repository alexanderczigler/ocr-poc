#!/bin/bash

node index.js

for file in $(ls -1 output/*.txt); do
    cat $file
done
