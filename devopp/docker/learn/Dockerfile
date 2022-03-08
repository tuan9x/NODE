

# - Dùng node:12-alpine
# - Tận dụng layer caching
#    + Sắp xếp các lệnh build theo sự thay đổi thường xuyên tăng dần
#    + Sao cho phần lệnh ít thay đổi sẽ ở trên, phần thay đổi thường xuyên sẽ ở dưới

# - Giảm bớt số lượng layer
# - ......
# ==================================
# * EX:

FROM node:12-alpine AS builder
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

COPY package*.json /usr/src/app/ 
RUN npm install


# Runtime image from here
FROM node:12-alpine
EXPOSE 3000
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .
ADD . /usr/src/app

CMD [ "npm", "start" ]





