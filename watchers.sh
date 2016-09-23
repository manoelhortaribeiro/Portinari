watchify frontend/static/js/main.js -o frontend/static/js/public/bundle.js &
sass --watch frontend/static/css/style.scss:frontend/static/css/public/style.css &
python -m SimpleHTTPServer 8000
