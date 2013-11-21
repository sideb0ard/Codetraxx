#!/bin/sh

file=$1
echo "FILE! $file"
cat $file  | while read line ; do echo $line | say -v Whisper ; done
