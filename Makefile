
.PHONY: all clean optimize build

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: build

clean:
	rm -rf tmp style && mkdir {tmp,style}

optimize:
	svgo -r -q --enable=removeDimensions,sortAttrs -f material-design-icons/src -o tmp

build: clean optimize
	node index.js
