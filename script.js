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

let teams, members;
fetch("teams.json")
  .then(response => response.json())
  .then(json => {
    teams = json;
  })
  .then(() => fetch("members.json"))
  .then(response => response.json())
  .then(json => {
    members = json;
  })
  .then(() => fetch("submissions.json"))
  .then(response => response.json())
  .then(json => {
    for (submission of json) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      const time = document.createElement("td");
      time.innerText = timestamp_to_date(submission.time * 1000);
      tr.appendChild(time);

      const team = document.createElement("td");
      let teamname;
      for (const team_ of teams) {
        if (team_.id === submission.team) {
          teamname = team.innerText = team_.name;
          break;
        }
      }
      tr.appendChild(team);

      const member = document.createElement("td");
      if (teamname.slice(0, 1) === "B") {
        teamname=
        member.innerHTML = members[team.innerText];
      }
      tr.appendChild(member);

      const problem = document.createElement("td");
      problem.innerText = submission.problem;
      tr.appendChild(problem);

      const language = document.createElement("td");
      language.innerText = submission.language;
      tr.appendChild(language);

      const valid = document.createElement("td");
      valid.innerText = submission.valid;
      tr.appendChild(valid);
    }
  });
