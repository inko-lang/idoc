FROM ghcr.io/inko-lang/inko:main AS builder
ADD . /idoc
WORKDIR /idoc
RUN microdnf install --assumeyes git make
RUN make build

FROM ghcr.io/inko-lang/inko:main
COPY --from=builder ["/idoc/build/idoc", "/usr/bin/idoc"]
COPY --from=builder ["/idoc/assets", "/usr/share/idoc/assets"]
CMD ["/usr/bin/idoc"]
