FROM node:22-bookworm-slim

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4174
ENV PYTHON_BIN=/opt/venv/bin/python

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-venv python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv

COPY requirements.txt ./
RUN /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY package.json ./
COPY index.html styles.css app.js server.js parse_resume.py ./
COPY vendor ./vendor

EXPOSE 4174

CMD ["node", "server.js"]
