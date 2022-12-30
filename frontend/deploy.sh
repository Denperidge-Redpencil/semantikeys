#!/bin/bash
# This fixes ember surge cli not auto exiting, thus forever keeping the GitHub Action going
npx ember surge &
sleep 180
#until npx ember surge | grep -m 1 "Success!"; do : ; sleep 10; done;
