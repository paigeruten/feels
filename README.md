# feels v0

What if programs made noise as they ran, giving you a feel for what's going on inside them?

## Usage

Pre-requisites:

1. Run `npm install` from `tail-server/`.
2. You'll need `make` and a C compiler to build Lua.

Then:

1. Run `./feels.sh` from this directory. This will:
    1. Build `lua` (may need to change `make linux` to whatever platform you're on).
    2. Start a websocket server for Lua to communicate with your browser.
    3. Start a Lua REPL for you to type code into.
2. Open `feels.html` in your browser. It should say "Connected!".
3. Type Lua code into REPL, and see nice sights and hear nice sounds in your browser as the code executes. :D

Note: you'll have to refresh your browser every time you re-run `feels.sh`.
