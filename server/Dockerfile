FROM golang:1.22.5-alpine3.20
WORKDIR /app
COPY . /app
RUN go get
RUN go build -o main .
EXPOSE 5000
CMD ["/app/main"]