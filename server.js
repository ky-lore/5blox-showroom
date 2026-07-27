const express = require('express');
const path = require('path');

const app = express();
const ROOT = __dirname;

// Canonicalize: 301 any legacy *.html URL to its clean form (good for SEO,
// avoids duplicate-content between /cabinetry and /cabinetry.html).
app.get(/\.html$/i, (req, res) => {
  const clean = req.path.replace(/\.html$/i, '');
  res.redirect(301, clean === '/index' ? '/' : clean);
});

// Clean URLs: extensions:['html'] resolves /cabinetry -> cabinetry.html, / -> index.html.
// dotfiles:'ignore' keeps .env and friends from ever being served.
app.use(express.static(ROOT, { extensions: ['html'], dotfiles: 'ignore' }));

app.use((req, res) => res.status(404).send('Not found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('5blox showroom listening on :' + PORT));
