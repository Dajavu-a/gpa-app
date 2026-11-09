# Quasar App (lab4)

## Install the dependencies

```bash
pnpm install
# or: yarn/npm/bun install
```

### Run the local JSON Server

From the workspace root, run:

```bash
npm --prefix lab4 run api
```

Or open a terminal in the `lab4` folder and run `npm run api`. This is the
standard JSON Server command used in the lab. Keep it running on port `3007`;
it serves resources from `api/db.json`, such as
`GET http://127.0.0.1:3007/subjects`.

### Run the demo login API

Open a second terminal in the `lab4` folder and run:

```bash
npm run api:auth
```

Keep it running on port `3008`. The app uses this API for login and profile;
JSON Server itself does not provide those endpoints.

The `.env` file only needs the two course settings: `QCLI_API_URL` and
`QCLI_APP_TITLE`. The demo login API uses its local URL directly and does not
need an environment variable.

| Username | Password | Role |
| --- | --- | --- |
| `student` | `123456` | Student |
| `teacher` | `123456` | Teacher |
| `admin` | `123456` | Administrator |

These accounts are for local development only and are not suitable for production.

### Start the app in development mode

Open a third terminal in the `lab4` folder and run:

```bash
npm run dev
```

### Format & lint the files

```bash
pnpm run lint
# or: yarn/npm/bun run lint
```

To check formatting and linting without applying fixes:

```bash
pnpm run lint:check
# or: yarn/npm/bun run lint:check
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file).
