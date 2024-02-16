document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    download();
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "r") {
    e.preventDefault();
    showTab(0);
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "c") {
    if (!document.activeDelete) return;
    e.preventDefault();

    localStorage.removeItem("clients");
    $("#counter").html("0");
    $(".monitoring-container #deleteAll").html("Supprimer tout");
    document.activeDelete = false;
  }

  if ((e.ctrlKey || e.metaKey) && e.key == "m") {
    e.preventDefault();
    document.countTimerMonitoring = 30;
    document.timerMonitoring = null;
    document.activeDelete = false;

    $(".monitoring-container").remove();
    $("body").append(`<div class="monitoring-container">
    <div class="monitoring-box">
      <div class="d-flex align-items-center justify-content-between">
        <span class="title">Monitoring</span>
        <span class="seconds">${document.countTimerMonitoring}</span>
      </div>
      <div class="clients-counter">Clients: <span id="counter">${
        (JSON.parse(localStorage.getItem("clients"))
          ? JSON.parse(localStorage.getItem("clients"))
          : []
        ).length
      }</span></div>

      <button class="monitoring-button-delete" id="deleteAll">Supprimer tout</button>
      <button class="monitoring-button-delete" id="download" style="background:green;margin-top:10px">Télécharger</button>
      <button class="btn btn-primary w-100 mt-3" id="closeMoni" style="    font-size: 43px;">Quitter</button>
    </div>
  </div>`);

    if (document.timerMonitoring) clearInterval(document.timerMonitoring);
    document.timerMonitoring = setInterval(() => {
      document.countTimerMonitoring--;
      $(".monitoring-container .seconds").html(document.countTimerMonitoring);
      if (document.countTimerMonitoring == 0) {
        $(".monitoring-container").remove();
        document.activeDelete = false;
      }
    }, 1000);
  }
});

$(document).on("click", "#download", (e) => {
  download();
});

$(document).on("click", ".monitoring-container #closeMoni", () => {
  $(".monitoring-container").remove();
  document.activeDelete = false;
});

$(document).on("click", ".monitoring-container #deleteAll", (e) => {
  if (!document.activeDelete) {
    $(e.target).html("CTRL + C");
    document.activeDelete = true;
  }
});

const download = () => {
  const dataStr = JSON.stringify(
    JSON.parse(localStorage.getItem("clients"))
      ? JSON.parse(localStorage.getItem("clients"))
      : [],
    null,
    2
  );
  const blob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `clients-${Math.floor(Math.random() * 1000)}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
