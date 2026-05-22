# ────────────────────────────────────────────────────────────────────
# Dockerfile do backend PocketBase para Fly.io.
#
# Estratégia: baixar o binário oficial do PocketBase na build (em vez
# de copiar o binário commitado, que pode estar desatualizado), copiar
# hooks/migrations versionados, expor 8090 e usar /data como volume
# persistente (Fly volume).
# ────────────────────────────────────────────────────────────────────

FROM alpine:3.20 AS builder

ARG PB_VERSION=0.38.0
ARG TARGETARCH=amd64

RUN apk add --no-cache ca-certificates unzip wget \
 && wget -O /tmp/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" \
 && unzip /tmp/pb.zip -d /tmp/pb \
 && chmod +x /tmp/pb/pocketbase

# ────────────────────────────────────────────────────────────────────
FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata wget \
 && addgroup -S pb && adduser -S pb -G pb

WORKDIR /app

COPY --from=builder /tmp/pb/pocketbase /app/pocketbase
COPY apps/pocketbase/pb_hooks /app/pb_hooks
COPY apps/pocketbase/pb_migrations /app/pb_migrations

# /data → volume Fly montado em runtime.
RUN mkdir -p /data && chown -R pb:pb /app /data

USER pb

EXPOSE 8090

# Healthcheck nativo do PB.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8090/api/health || exit 1

# `--dir=/data` força banco no volume persistente.
# `--encryptionEnv=PB_ENCRYPTION_KEY` lê do secret do Fly.
# `--hooksWatch=false` evita reload em produção.
CMD ["/app/pocketbase", "serve", \
     "--http=0.0.0.0:8090", \
     "--dir=/data", \
     "--migrationsDir=/app/pb_migrations", \
     "--hooksDir=/app/pb_hooks", \
     "--encryptionEnv=PB_ENCRYPTION_KEY", \
     "--hooksWatch=false"]
