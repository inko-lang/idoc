FROM ghcr.io/inko-lang/inko:main AS builder
ADD . /idoc
WORKDIR /idoc
RUN microdnf install --assumeyes git
RUN inko pkg sync
RUN inko build -o build/idoc

FROM ghcr.io/inko-lang/inko:main
COPY --from=builder ["/idoc/build/idoc", "/usr/bin/idoc"]
CMD ["/usr/bin/idoc"]
