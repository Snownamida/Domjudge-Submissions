function timestamp_to_date(timestamp) {
  const date = new Date(timestamp); // 参数需要毫秒数，所以这里将秒数乘于 1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  D = date.getDate() + " ";
  h = date.getHours() + ":";
  m = date.getMinutes() + ":";
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}

const tbody = document.querySelector("tbody");

Promise.all([
  fetch("teams.json"),
  fetch("members.json"),
  fetch("submissions.json"),
  fetch("problems.json"),
])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([teams, members, submissions, problems]) => {
    for (const submission of submissions) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      const time = document.createElement("td");
      time.innerText = timestamp_to_date(submission.time * 1000);
      tr.appendChild(time);

      const team = document.createElement("td");
      let teamname = teams[submission.team].name;
      team.innerText = teamname;
      tr.appendChild(team);

      const member = document.createElement("td");
      if (teamname.slice(0, 1) === "B") {
        teamname = member.innerText = members[team.innerText];
      }
      tr.appendChild(member);

      const problem = document.createElement("td");
      for (const problem_ of problems) {
        if (problem_.id === submission.problem) {
          problem.innerText = problem_.shortname;
        }
      }
      tr.appendChild(problem);

      const language = document.createElement("td");
      language.innerText = submission.language;
      tr.appendChild(language);

      const valid = document.createElement("td");
      valid.innerText = submission.valid;
      tr.appendChild(valid);
    }
  });
