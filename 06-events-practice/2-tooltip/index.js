class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance !== undefined) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  render(html) {
    if (!this.element) {
      this.element = document.createElement('div');
    }
    this.element.innerHTML = html;
    this.element.className = 'tooltip';

    document.body.append(this.element);
  }

  initialize() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  //******************************************************************************************************************
  // listeners
  //******************************************************************************************************************

  //появление мыши на элементe (pointerover)
  onPointerOver = event => {
    const text = event.target.dataset.tooltip;
    const parent = event.target.closest('[data-tooltip]');
    if (parent) {
      this.render(text);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  }

  //перемещение мыши (pointermove)
  onPointerMove = event => {
    this.element.style.left = (event.clientX + 10) + 'px';
    this.element.style.top = (event.clientY + 10) + 'px';
  }

  //уход мыши c элемента (pointerout)
  onPointerOut = event => {
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
  }
  //******************************************************************************************************************

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointermove', this.onPointerOver);
    document.removeEventListener('pointerover', this.onPointerOut);
    document.removeEventListener('pointerout', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
