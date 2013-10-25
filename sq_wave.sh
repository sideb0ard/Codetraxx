#!/bin/bash

(while true; do 
  echo -e '\x00`xff'
done) | play -c1 -r 8k -t s8 -

