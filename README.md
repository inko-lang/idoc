# idoc

idoc is a documentation generator for [Inko](https://inko-lang.org/), turning
Inko's documentation JSON files into a static website.

## Usage

To generate documentation, run `idoc` in the root directory of your project (=
the directory containing the `src/` directory). The resulting website is found
at `./build/idoc/public`. For more information, run `idoc --help`.

## Requirements

- Inko 0.15.0 or newer

## Installation

Building from source:

```bash
make build
```

This assumes the assets used by the website (e.g. the CSS files) are located at
`/usr/share/idoc/assets`. You can change this path by settings the `ASSETS` make
variable. For example, to use the local `assets` directory you'd run the
following:

```bash
make build ASSETS=$PWD/assets
```

You can also use the provided Docker image:

```bash
docker pull ghcr.io/inko-lang/idoc:latest
docker run --rm --volume $PWD:$PWD:z --workdir $PWD idoc:latest
```

## License

All source code in this repository is licensed under the Mozilla Public License
version 2.0, unless stated otherwise. A copy of this license can be found in the
file "LICENSE".
