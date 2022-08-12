const __redirectTo = () => {
  console.log("called");
  let k = window.location.href;
  k = k.split("actual_uri=")[1];
  let l = k.split("&actual_name=")[0];
  if (l) {
    let c = atob(l);
    c = c.replaceAll("&amp;", "&");
    // console.log(c);
    window.location.href = c;
  } else {
    alert("Did't redirected because url is " + String(l));
  }
};
class gbFirmware {
  constructor() {
    this._startBtn =
      "body > div.wrapper.single-download-wrapper > div > div > div > div > a";
    this._startHrefTo = "#";
    this._footer = "#footer";
    this.modalId = "#IDE";
    this.newBtnId =
      "body > div.wrapper.single-download-wrapper > div > div > div > div > button";
    this._startBtnHref = null;
    this.e_modal = null;
    this.e_startA = null;
    this.e_footer = null;
    this.__setStyles();
    if (this.__check2ndStep()) {
      this.__createLastDownloadModal();
      this.__tickTime();
    } else {
      this.__Modal();
      this.__setElements();
      this.__replaceAtoBtn();
      this.__getFileName();
    }
  }
  __getNameFromURi() {
    try {
      let c = window.location.href;
      let name = c.split("&actual_name=")[1];
      return atob(name);
    } catch (error) {
      return "You file is ready for download...";
    }
  }
  __createLastDownloadModal() {
    let u = document.querySelector("body > div.animate-dropdown");
    const modal = document.createElement("div");
    modal.classList.add("mxd-main", "my-custome-modal");
    modal.innerHTML = `
    <div class="mxd-main my-custome-modal">
      <div class="mxd-modal">
        <!-- <span id="mxd-title ">Huawei DRA-LX5 DEAD Fix / Repair / Hang On Logo Fix/Scatter based FACTORYFirmware Tested</span> -->
        <span id="mxd-title">Wait to start downloading...</span>
        <button disabled='true' id="mxd-down-btn" class="disabled" onclick='__redirectTo()'>Download Now</button>
        <br/>
        <h4 style="work-break: break-all">${this.__getNameFromURi()}</h4>
        <br/>
        <h3 class="sayThanks"></h3>
      </div>
    </div>
    `;
    u.insertBefore(modal, u.firstChild);
  }
  __getFileName() {
    try {
      return document.querySelector(
        "body > div.wrapper.single-download-wrapper > div > div > div > h2"
      ).innerHTML;
    } catch (error) {
      return "You can download your file after a few seconds!";
    }
  }
  __redirectTo() {
    let l = this.__check2ndStep();
    if (l) {
      window.location.href = atob(l);
    } else {
      alert("Did't redirected because url is " + String(l));
    }
  }
  __tickTime() {
    let e = document.getElementById("mxd-title");
    let t = 2;
    let k = setInterval(() => {
      e.innerHTML = `Wait ${t}s to start downloading...`;
      if (t <= 0) {
        clearInterval(k);
        let b = document.querySelector("#mxd-down-btn");
        b.classList.remove("disabled");
        e.innerHTML = "Click to download button to start download.";
        document.querySelector(".sayThanks").innerHTML =
          "Thanks for visiting our site.";
        b.disabled = false;
      }
      t--;
    }, 1000);
  }
  __check2ndStep() {
    const k = window.location.href;
    const l = k.split("actual_uri=");
    if (l.length > 0) return l[1];
    return false;
  }
  __setStyles() {
    const style = `<style type="text/css">
    @import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
    .mxd-main {
      display: block;
      margin: auto;
      width: 100%;
      text-align: center;
      padding: 20px 0;
    }
    .mxd-modal {
      margin: auto;
      width: 400px;
      background-color: #f1f1ff;
      padding: 25px;
      border-radius: 13px;
      border: 1px solid #0000ff17;
      font-family: "Quicksand", sans-serif;
    }
    .mxd-title {
      font-size: 20px;
      display: block;
      text-align: center;
      font-family: arial;
      margin: 13px;
      font-weight: bold;
      color: #737373;
    }
    .mxd-modal button, .mxd-modal a {
      font-size: 17px;
      margin: auto;
      display: block;
      padding: 11px 30px;
      background: dodgerblue;
      color: white;
      border: none;
      outline: none !important;
      border-radius: 3px;
      font-family: "Quicksand", sans-serif;
      margin-top: 10px;
      text-transform: capitalize;
      cursor: pointer;
      transition: 200ms;
    }
    .mxd-modal button:hover,.mxd-modal a:hover {
      background: #0e7be5;
    }
    .disabled {
      background: #1a3652 !important;
    }
  </style>`;
    let t = document.querySelector("body");
    t.innerHTML += style;
  }
  __setElements() {
    this.e_modal = document.querySelector(this.modalId);
    this.e_startA = document.querySelector(this._startBtn);
    this.e_footer = document.querySelector(this._footer);
  }
  __getNextURI() {
    const n = window.location.href;
    const t = n.split("id=")[1];
    const id = Math.ceil(Math.random() * 8171);
    if (Number(t) && id === Number(t)) {
      this.__getNextURI();
    }
    return `https://gbfirmware.com/index.php?a=downloads&b=file&c=download&id=${id}`;
  }
  __replaceAtoBtn() {
    let a = document.createElement("button");
    a.classList.add(
      "btn",
      "btn-lg",
      "btn-success",
      "btn-block",
      "btn-download"
    );
    let i = `<i class="fa fa-download fw-r10"></i><span class="hidden-xs">Start </span>Download`;
    a.innerHTML = i;
    a.onclick = this.__scroll;
    try {
      this.e_startA.replaceWith(a);
    } catch (e) {
      let btn = document.querySelector(this.newBtnId);
      btn.replaceWith(a);
    }
  }
  __scroll() {
    let e = document.querySelector("#footer .my-custome-modal");
    e.scrollIntoView({
      behavior: "smooth",
    });
  }
  __getLink() {
    const t = document.querySelector(
      "body > div.wrapper.single-download-wrapper > div > div > div > p.form-control.download-link-control"
    );
    return t.innerHTML;
  }
  __doStruck() {
    console.log("do struct");
  }
  __Modal() {
    const modal = document.createElement("div");
    modal.classList.add("mxd-main", "my-custome-modal");
    modal.innerHTML = `
      <div class="mxd-modal">
        <span id="mxd-title "
          >${this.__getFileName()}</span
        >
        <a href='${this.__getNextURI()}&actual_uri=${btoa(
      this.__getLink()
    )}&actual_name=${btoa(
      this.__getFileName()
    )}' class="mdx-main-link">Click here to download</a>
      </div>`;
    let footer = document.querySelector("#footer");
    footer.insertBefore(modal, footer.firstChild);
  }
}
try {
  const k = document.querySelector(
    "body > div.wrapper.single-download-wrapper > div > div > div > div > a"
  );
  const p = document.querySelector(
    "body > div.wrapper.single-download-wrapper > div > div > div > div > a > span.hidden-xs"
  );
  console.log(p);
  if (k.innerHTML === "Start Download" || p.innerHTML.trim() === "Start") {
    new gbFirmware();
  } else {
    console.log("no");
  }
} catch (error) {}
