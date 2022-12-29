# This fixes ember surge cli not auto exiting, thus forever keeping the GitHub Action going
until ember surge | grep -m 1 "Success!"; do : ; sleep 10; done;