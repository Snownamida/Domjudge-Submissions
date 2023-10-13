
curl "http://servif-algo.insa-lyon.fr/domjudge/api/submissions" -o submissions.raw.json
type submissions.raw.json | json > submissions.json
curl "http://servif-algo.insa-lyon.fr/domjudge/api/problems" -o problems.raw.json
type problems.raw.json | json > problems.json
git add submissions.json problems.json && git commit -m "Update data" && git push