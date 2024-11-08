FROM node:20-alpine AS base


FROM base AS deps

WORKDIR /app

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn --immutable


FROM base AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY .yarn ./.yarn
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build


FROM base AS runner

WORKDIR /app

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY .yarn ./.yarn

RUN mkdir -p /app/node_modules/argon2
RUN chown nextjs:nodejs /app/node_modules
RUN chown nextjs:nodejs /app/node_modules/argon2
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/argon2/prebuilds /app/node_modules/argon2/prebuilds

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD HOSTNAME="0.0.0.0" node server.js
