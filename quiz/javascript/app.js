(async () => {
  const english = document.getElementById("english");
  const french = document.getElementById("french");
  localStorage.setItem('language', 'english');

  let Questions = null;

  // Remove last selected choosedAnswer
  localStorage.setItem("choosedAnswer", JSON.stringify([]));

  async function readFile(file) {
    const data = await fetch(file);
    return await data.json();
  }

  // Default by english question are loded
  const englisQues = await readFile("./database/en.json");
  Questions = englisQues.Questions;
  let start = true;
  iterate(0, 0);

  english.addEventListener("click", async () => {
    let data = await readFile("./database/en.json");
    Questions = data.Questions;
    localStorage.setItem('language', 'english');
    start = true;
    iterate(0, 0);
  });

  french.addEventListener("click", async() => {
    let data = await readFile("./database/fr.json");
    Questions = data.Questions;
    localStorage.setItem('language', 'french');
    start = true;
    iterate(0, 0);
  });

  var selected = 0;
  var result = document.getElementsByClassName("result");
  result[0].innerText = "----";

  var id = 0;
  var count = 0;
  var maxQuestion = 4;

  function iterate(id, count) {
    var quest_no = document.getElementsByClassName("quest_no");
    quest_no[0].innerText = id + 1;
    const question = document.getElementById("question");
    question.innerText = Questions[id].q;
    const op = [
      document.getElementById("op1"),
      document.getElementById("op2"),
      document.getElementById("op3"),
      document.getElementById("op4"),
    ];

    for (let i = 0; i < 4; i++) {
      op[i].innerText = Questions[id].a[i].text;
      op[i].value = Questions[id].a[i].isCorrect;
      op[i].addEventListener("click", (event) => {
        console.log(event);
        op[0].style.backgroundColor = "white";
        op[1].style.backgroundColor = "white";
        op[2].style.backgroundColor = "white";
        op[3].style.backgroundColor = "white";

        op[i].style.backgroundColor = "#90EE90";

        selected = op[i].value;

        const choosedAns = JSON.parse(localStorage.getItem("choosedAnswer")) || [];
        choosedAns.push(op[i].textContent);
        localStorage.setItem("choosedAnswer", JSON.stringify([...new Set(choosedAns)]));
      });
    }
  }

  const evaluate = document.getElementsByClassName("evaluate");

  evaluate[0].addEventListener("click", () => {
    showResult ();
  });

  function showResult () {
    result[0].innerHTML = count + "/" + maxQuestion;
    result[0].style.color = "green";
    setTimeout(() => {
      window.location.href = "./eval.html";
    }, 2000);
  }

  const next = document.getElementsByClassName("next")[0];

  next.addEventListener("click", () => {
    start = false;
    const a = document.getElementsByClassName("option");
    for (let i = 0; i < 4; i++) {
      a[i].style.backgroundColor = "#ffffff";
    }
    if (id < maxQuestion - 1) {
      id++;
      iterate(id, count);
    } else {
      showResult();
    }
    if(id==3){
      // let b = document.getElementById("navigation");
      // let e = createElement('button');
      // b.append(e);
    }
    if (selected == "true") {
      count++;
      localStorage.setItem('score', count);
    }
  });

  const back = document.getElementsByClassName("back")[0];

  back.addEventListener("click", () => {
    start = false;
    const a = document.getElementsByClassName("option");
    for (let i = 0; i < 4; i++) {
      a[i].style.backgroundColor = "#ffffff";
    }
    if (id > 0) {
      id--;
      iterate(id, count);
    } else {
      alert("This is first question!");
    }
  });
})();
