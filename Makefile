PREFIX := /usr
BINDIR := ${PREFIX}/bin
DATADIR := ${PREFIX}/share

# The directory to install the asset files (CSS, JS, etc) in.
ASSETS := ${DATADIR}/idoc/assets

.check-version:
	@test $${VERSION?The VERSION variable must be set}

build:
	inko pkg sync
	inko build --define "idoc.cmd.ASSETS=$$(realpath --canonicalize-missing ${ASSETS})" -o ./build/idoc

install: build
	install -D --mode=755 build/idoc ${DESTDIR}${BINDIR}/idoc
	mkdir -p ${DESTDIR}${ASSETS}
	cp --recursive assets/* ${DESTDIR}${ASSETS}

uninstall:
	rm --force ${BINDIR}/idoc
	rm --recursive --force ${ASSETS}

release/version: .check-version
	sed -E -i -e "s/^let VERSION = '([^']+)'$$/let VERSION = '${VERSION}'/" \
		src/idoc/cmd.inko

release/changelog: .check-version
	clogs "${VERSION}"

release/commit: .check-version
	git add .
	git commit -m "Release v${VERSION}"
	git push origin "$$(git rev-parse --abbrev-ref HEAD)"

release/tag: .check-version
	git tag -a -m "Release v${VERSION}" "v${VERSION}"
	git push origin "v${VERSION}"

release: release/version release/changelog release/commit release/tag

.PHONY: build install uninstall
.PHONY: release/version release/changelog release/commit release/tag release
