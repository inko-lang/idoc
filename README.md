# idoc

idoc is a documentation generator for [Inko](https://inko-lang.org/), turning
Inko's documentation JSON files into a static website.

## Usage

In the directory of you project, run `inko doc` to generate the documentation
JSON files, followed by `idoc` to generate a static site. The resulting website
is located at `./build/idoc/public`. For more information, run `idoc --help`.

## Requirements

- Inko 0.15.0 or newer

## Installation

Building from source:

```
inko build -o build/idoc
```

## License

All source code in this repository is licensed under the Mozilla Public License
version 2.0, unless stated otherwise. A copy of this license can be found in the
file "LICENSE".
