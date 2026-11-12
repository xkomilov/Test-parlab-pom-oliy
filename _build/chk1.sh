#!/bin/bash
# usage: ./chk1.sh questions/NNN-MMM.json   -> strict QA for one file only
cd /projects/sandbox/Test-parlab-pom-oliy/_build
F="$1"; T="qtmp_$(basename "$F" .json)_$$"; mkdir -p "$T"; cp "$F" "$T/"
NODE_PATH=$PWD/node_modules node /projects/.kiro/cloud-cache/resolved/config/user/skills/topic-test-xlsx/scripts/build_tests.js --questions "$T" --check 2>&1 | grep -v "ogohlantirish"
rm -rf "$T"
