
.PHONY: all clean optimize build

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: build

clean:
	rm -rf tmp && mkdir {tmp,tmp/stable,tmp/extended}
	rm -rf stable extended && mkdir {stable,extended}
	rm -rf demo-dist demo-src && mkdir {demo-dist,demo-dist/stable,demo-dist/extended}
	rm -rf demo-src demo-src && mkdir {demo-src,demo-src/stable,demo-src/extended}

optimize-stable:
	svgo -r -f icons/stable/material-design-icons/src/action -o tmp/stable/action
	svgo -r -f icons/stable/material-design-icons/src/alert -o tmp/stable/alert
	svgo -r -f icons/stable/material-design-icons/src/av -o tmp/stable/av
	svgo -r -f icons/stable/material-design-icons/src/communication -o tmp/stable/communication
	svgo -r -f icons/stable/material-design-icons/src/content -o tmp/stable/content
	svgo -r -f icons/stable/material-design-icons/src/device -o tmp/stable/device
	svgo -r -f icons/stable/material-design-icons/src/editor -o tmp/stable/editor
	svgo -r -f icons/stable/material-design-icons/src/file -o tmp/stable/file
	svgo -r -f icons/stable/material-design-icons/src/hardware -o tmp/stable/hardware
	svgo -r -f icons/stable/material-design-icons/src/home -o tmp/stable/home
	svgo -r -f icons/stable/material-design-icons/src/image -o tmp/stable/image
	svgo -r -f icons/stable/material-design-icons/src/maps -o tmp/stable/maps
	svgo -r -f icons/stable/material-design-icons/src/navigation -o tmp/stable/navigation
	svgo -r -f icons/stable/material-design-icons/src/notification -o tmp/stable/notification
	svgo -r -f icons/stable/material-design-icons/src/places -o tmp/stable/places
	svgo -r -f icons/stable/material-design-icons/src/social -o tmp/stable/social
	svgo -r -f icons/stable/material-design-icons/src/toggle -o tmp/stable/toggle

optimize-extended:
	svgo -r -f icons/extended/material-design-icons/src/action -o tmp/extended/action
	svgo -r -f icons/extended/material-design-icons/src/alert -o tmp/extended/alert
	svgo -r -f icons/extended/material-design-icons/src/av -o tmp/extended/av
	svgo -r -f icons/extended/material-design-icons/src/communication -o tmp/extended/communication
	svgo -r -f icons/extended/material-design-icons/src/content -o tmp/extended/content
	svgo -r -f icons/extended/material-design-icons/src/device -o tmp/extended/device
	svgo -r -f icons/extended/material-design-icons/src/editor -o tmp/extended/editor
	svgo -r -f icons/extended/material-design-icons/src/file -o tmp/extended/file
	svgo -r -f icons/extended/material-design-icons/src/hardware -o tmp/extended/hardware
	svgo -r -f icons/extended/material-design-icons/src/home -o tmp/extended/home
	svgo -r -f icons/extended/material-design-icons/src/image -o tmp/extended/image
	svgo -r -f icons/extended/material-design-icons/src/maps -o tmp/extended/maps
	svgo -r -f icons/extended/material-design-icons/src/navigation -o tmp/extended/navigation
	svgo -r -f icons/extended/material-design-icons/src/notification -o tmp/extended/notification
	svgo -r -f icons/extended/material-design-icons/src/places -o tmp/extended/places
	svgo -r -f icons/extended/material-design-icons/src/social -o tmp/extended/social
	svgo -r -f icons/extended/material-design-icons/src/toggle -o tmp/extended/toggle

optimize: clean optimize-stable optimize-extended

build-demo:
	node index.js
	sass --no-source-map demo-src:demo-dist
