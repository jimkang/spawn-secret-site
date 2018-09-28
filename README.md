spawn-secret-site
==================

Spawns a Secret Site.

Installation
------------

- Clone this repo.
- Create a config.js that looks like:

    module.exports = {
      wordnikAPIKey: <Wordnik API Key>,
      mapquestKey: <Key from https://developer.mapquest.com/user/me/apps >
    };

Usage
-----


Clone [secret-site-web](https://github.com/jimkang/secret-site-web) in a parallel directory, and create a `data` directory there. Then, run:

    make run-four-test-generations

The above target writes its final output to secret-site-web/data. Run `secret-site-web`, then open a browser to `http://localhost:9966/#index` to view the secret sites! (Currently, there is a bug in which some links will put a ? in the route, which will mess things up. You need to manually take it out.)

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
