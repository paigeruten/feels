#!/bin/sh

set -euxo pipefail

trap "kill 0" EXIT

cd lua/src
make linux
cd ../..

rm -f tail.log
touch tail.log

node tail-server/tail-server.js &
./lua/src/lua 2>>tail.log

