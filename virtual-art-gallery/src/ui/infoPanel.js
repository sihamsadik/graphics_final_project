export class InfoPanel {
  constructor() {
    this.panel = document.getElementById("infoPanel");

    // Create content container inside the panel

    this.contentDiv = document.createElement("div");
    this.panel.appendChild(this.contentDiv);

    // Create a close button

    this.closeBtn = document.createElement("button");

    this.closeBtn.innerText = "×";

    this.closeBtn.style.cssText = `
      position: absolute;

      top: 5px;
      right: 8px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      
      color: #444;
    `;
    this.closeBtn.addEventListener("click", () => this.hide());

    this.panel.appendChild(this.closeBtn);
  }

  show(content) {
    this.contentDiv.innerHTML = content; 

    
    this.panel.style.display = "block";
  }

  hide() {

    this.panel.style.display = "none";

  }
}
