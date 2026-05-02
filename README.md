# Intuitive Auto Recover LLC Website

Code-first website for `iarecover.net`.

## Project Structure

```txt
iarecovery/
  frontend/
    index.html
    styles.css
    script.js
  backend/
    server.js
    package.json
    .env
```

## Frontend

Open `frontend/index.html` in a browser to preview the site locally.

The intake form currently posts to:

```txt
/api/recovery-request
```

When the backend is deployed, this route should validate the form and send the submission to the company inbox.

## Items to Replace Later

- Logo / brand mark
- Office address
- Business phone
- Final business email if different from `info@iarecover.net`
