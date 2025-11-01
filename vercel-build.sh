#!/bin/bash
set -euxo pipefail

pnpm prisma generate
pnpm next build
