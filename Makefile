
.PHONY: all clean optimize build

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: build

clean:
	rm -rf tmp style && mkdir {tmp,style}

optimize:
	svgo -r -f material-design-icons/src/action -o tmp/action
	svgo -r -f material-design-icons/src/alert -o tmp/alert
	svgo -r -f material-design-icons/src/av -o tmp/av
	svgo -r -f material-design-icons/src/communication -o tmp/communication
	svgo -r -f material-design-icons/src/content -o tmp/content
	svgo -r -f material-design-icons/src/device -o tmp/device
	svgo -r -f material-design-icons/src/editor -o tmp/editor
	svgo -r -f material-design-icons/src/file -o tmp/file
	svgo -r -f material-design-icons/src/hardware -o tmp/hardware
	svgo -r -f material-design-icons/src/home -o tmp/home
	svgo -r -f material-design-icons/src/image -o tmp/image
	svgo -r -f material-design-icons/src/maps -o tmp/maps
	svgo -r -f material-design-icons/src/navigation -o tmp/navigation
	svgo -r -f material-design-icons/src/notification -o tmp/notification
	svgo -r -f material-design-icons/src/places -o tmp/places
	svgo -r -f material-design-icons/src/social -o tmp/social
	svgo -r -f material-design-icons/src/toggle -o tmp/toggle

build: clean optimize
	node index.js
