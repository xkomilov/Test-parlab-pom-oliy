#!/bin/bash
cd /projects/sandbox/Test-parlab-pom-oliy/_build
NODE_PATH=$PWD/node_modules node /projects/.kiro/cloud-cache/resolved/config/user/skills/topic-test-xlsx/scripts/build_tests.js --questions questions --check 2>&1 | grep -v "ogohlantirish" | head -${1:-60}
