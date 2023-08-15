const { floor } = Math;

export class Frame extends HTMLElement {
  #ctx;
  #unit;
  #previewSize;
  #imageSize;
  #pixels;

  #imageData;

  constructor({ previewSize, imageSize }) {
    super();

    this.#previewSize = previewSize;
    this.#imageSize = imageSize;

    this.attachShadow({ mode: "open" });

    const canvas = document.createElement("canvas");
    canvas.width = previewSize;
    canvas.height = previewSize;
    this.shadowRoot.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    this.#ctx = ctx;

    const unit = previewSize / imageSize;
    this.#unit = unit;

    const pixels = [];
    for (let x = 0; x < imageSize; x++) {
      const row = [];
      for (let y = 0; y < imageSize; y++) {
        row.push([0, 0, 0, 0]);
      }
      pixels.push(row);
    }
    this.#pixels = pixels;

    window.requestAnimationFrame(() => this.#draw());
    window.requestAnimationFrame(
      () =>
        (this.#imageData = this.#ctx.getImageData(0, 0, imageSize, imageSize))
    );

    canvas.onclick = (event) => this.#update(event);
  }

  get imageData() {
    return this.#imageData;
  }

  #draw() {
    const ctx = this.#ctx;
    const previewSize = this.#previewSize;
    const imageSize = this.#imageSize;
    const pixels = this.#pixels;
    const unit = this.#unit;

    ctx.clearRect(0, 0, previewSize, previewSize);
    for (let x = 0; x < imageSize; x++) {
      for (let y = 0; y < imageSize; y++) {
        const pixel = pixels[x][y];
        ctx.fillStyle = `rgb(${pixel[0]} ${pixel[1]} ${pixel[2]} / ${pixel[3]})`;
        ctx.fillRect(x * unit, y * unit, unit, unit);
      }
    }

    this.#imageData = this.#ctx.getImageData(0, 0, imageSize, imageSize);
  }

  #update(event) {
    const unit = this.#unit;

    const { offsetX, offsetY } = event;

    const x = floor(offsetX / unit);
    const y = floor(offsetY / unit);

    this.#pixels[x][y] = [255, 0, 0, 255];

    window.requestAnimationFrame(() => this.#draw());
  }
}
