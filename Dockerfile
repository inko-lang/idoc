FROM ghcr.io/inko-lang/inko:latest AS builder
ADD . /idoc
WORKDIR /idoc
RUN microdnf install --assumeyes git make
RUN make build

FROM ghcr.io/inko-lang/inko:latest
COPY --from=builder ["/idoc/build/release/idoc", "/usr/bin/idoc"]
COPY --from=builder ["/idoc/assets", "/usr/share/idoc/assets"]
CMD ["/usr/bin/idoc"]
