# Build guide

## Development build

Create a "workspace" folder. It is a folder with all the repositories you will need:

```bash
$ mkdir repos
$ cd repos
```

Clone the [PhaserEditor2D-v3](https://github.com/PhaserEditor2D/PhaserEditor2D-v3/) repository and checkout the `develop` branch:

```bash
$ git clone https://github.com/PhaserEditor2D/PhaserEditor2D-v3.git
$ cd PhaserEditor2D-v3
$ git checkout develop
$ cd ..
```

Clone this repository:

```bash
$ git clone https://github.com/PhaserEditor2D/phasereditor2d-ninepatch-plugin.git
```
Build the plugins:

```
$ cd phasereditor2d-ninepatch-plugin
$ npm install
$ npm start
```

Run the latest version of the `PhaserEditor2D` server. It should load the plugin with the `-plugins` flag:

```bash
$ PhaserEditor2D -plugins "source/plugins"
```

Open the browser in [http://127.0.0.1:1959](http://127.0.0.1:1959).

## Distribution build

The `build.sh` script creates the distribution files, in the `dist/` folder:

```bash
$ ./build.sh
```
This script requires a Unix-like environment.
