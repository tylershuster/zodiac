class ChartElement {
  ReactSymbol;
  ReactElement;
  color;
  size;
  canvasWidth;
  canvasHeight;

  setColor(color) {
    this.color = color;
    return this;
  }

  setCanvas(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    return this;
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  set Element(element) {
    this.ReactElement = element.bind(this);
  }

  get Element() {
    return this.ReactElement;
  }

  set Symbol(symbol) {
    this.ReactSymbol = symbol.bind(this);
  }

  get Symbol() {
    return this.ReactSymbol.bind(this);
  }
}

export default ChartElement;
