#!/bin/sh
set -e
npm run lint
npm run build:eventPage
npm run build:popup