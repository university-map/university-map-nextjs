# University Map

## How to Run

Install NodeJS v20.10.0.
Install Python 3 and install `PyYAML`.

```bash
# Generate or update public/universities/locations.json
cd university-map
python scripts/build-index.py

npm install
npm run dev
```

Go to http://localhost:3000.
