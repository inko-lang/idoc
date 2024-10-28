# idoc

idoc is a documentation generator for [Inko](https://inko-lang.org/), turning
Inko's documentation JSON files into a static website.

## Usage

To generate documentation, run `idoc` in the root directory of your project (=
the directory containing the `src/` directory). The resulting website is found
at `./build/idoc/public`. For more information, run `idoc --help`.

## Requirements

- Inko 0.17.0 or newer

## Installation

Building from source:

```bash
make install PREFIX=~/.local
```

This installs `idoc` into `~/.local`, with the executable being found at
`~/.local/bin`, and the assets located at `~/.local/share/idoc/assets`. To
uninstall, run the following:

```bash
make uninstall PREFIX=~/.local
```

For testing changes locally, run the following

```bash
make build ASSETS=$PWD/assets
```

This builds the executable such that it uses the `assets/` directory directly
from the repository. In this case the executable is found at `./build/idoc`.

You can also use the provided [Docker](https://www.docker.com/) image:

```bash
docker pull ghcr.io/inko-lang/idoc:latest
docker run --rm --volume $PWD:$PWD:z --workdir $PWD idoc:latest
```

Or when using [Podman](http://podman.io/):

```bash
podman pull ghcr.io/inko-lang/idoc:latest
podman run --rm --volume $PWD:$PWD:z --workdir $PWD idoc:latest
```

## License

All source code in this repository is licensed under the Mozilla Public License
version 2.0, unless stated otherwise. A copy of this license can be found in the
file "LICENSE".
