(async () => {
  const choosedAns = JSON.parse(localStorage.getItem("choosedAnswer"));
  const localScore = localStorage.getItem("score");
  const language = localStorage.getItem("language");
  //console.log(language);

  const div = document.createElement("div");
  const element = document.querySelector("#new");
  const score = document.querySelector("#score");
  let questions = "";

  async function readFile(file) {
    const data = await fetch(file);
    return await data.json();
  }
  let file ="";
  if (language == "english") {
    file = await readFile("./database/en.json");
  } else if(language == "french"){
    file = await readFile("./database/fr.json");
  }
  console.log(file);
  file.Questions.forEach((data) => {
    let ans = "";

    data.a.forEach((a) => {
      if (choosedAns.find((x) => x === a.text)) {
        ans += `<li id="o1" style="color: ${a.isCorrect ? "green" : "red"}">${
          a.text
        }</li>`;
      } else {
        ans += `<li id="o1"style="color: ${a.isCorrect ? "green" : ""}">${
          a.text
        }</li>`;
      }
    });

    questions += `<div><div class="que_no"></div>
      <div class="que-container" id="que">
        ${data.q}
      </div>
      <div class="op-container">
        <ul>
       ${ans}
        </ul>
      </div>`;
  });

  div.innerHTML = questions;
  element.innerHTML = div.innerHTML;
  score.textContent = localScore;

  let s = document.querySelector('button');
  s.addEventListener("click",() =>
  {
    window.location.href("../index.html");
  })

})();
