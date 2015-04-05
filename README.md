# All This Time
*Built at [PBS POV hackathon](http://www.pbs.org/pov/hackathon/) 8 (spring 2015).*

Web app built with Flask and MongoDB. Check it out [here](http://104.131.2.8:5000/).

### Setup:
 * Run `mongod`.
 * Populate MongoDB collections with scripts.
 * Run `backend/setup_script.sh` to create symlinks that match the folder structure that flask wants.
 * Run `python backend/server.py` to start the server locally. 
   * To make the server publicly accessible, change `app.run()` to `app.run(host=0.0.0.0)` in `backend\server.py`.

### Stack:
 * Flask
 * MongoDB
 * APIs:
   * Twitter
   * Giphy
 * DigitalOcean Debian server
