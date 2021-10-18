export default class SortableTable {
  element;
  subElements;

  constructor(headerConfig, {
    data = [],
    sorted = {}
  } ) {
    this.headerConfig = headerConfig;
    this.data = Array.isArray(data) ? data : data.data;
    this.sorted = sorted;

    this.render();
    this.initListeners();
  }

  get template() {
    return `
            <div data-element="productsContainer" class="products-list__container">
              <div class="sortable-table">
            
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createHeader(this.headerConfig)}
                </div>
            
                <div data-element="body" class="sortable-table__body">
                    ${this.createTableBody(this.data)}
                </div>
            
                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
            
                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                  <div>
                    <p>No products satisfies your filter criteria</p>
                    <button type="button" class="button-primary-outline">Reset all filters</button>
                  </div>
                </div>
            
              </div>
            </div>
        `;
  }

  initListeners() {
    document.addEventListener('pointerdown', this.onMouseClick);
  }

  //******************************************************************************************************************
  // listeners
  //******************************************************************************************************************

  onMouseClick = event => {
    const headerCell = event.target.closest('.sortable-table__cell');
    if (!headerCell || !headerCell.closest(  '.sortable-table__header')) {
      return;
    }

    if (headerCell.dataset.sortable !== 'false') {
      this.sorted.id = headerCell.dataset.id;
      this.sorted.order = this.sorted.order ===  'asc' ?  'desc' : 'asc';
      headerCell.dataset.order = this.sorted.order;
      this.sort(this.sorted.id, this.sorted.order);
    }
  }
//**********************************************************************************************************************

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.arrow = document.createElement('span');
    this.arrow.dataset.element = "arrow";
    this.arrow.className = "sortable-table__sort-arrow";
    this.arrow.innerHTML = `<span class="sort-arrow"></span>`;

    this.sort(this.sorted.id, this.sorted.order);
  }

  sort (fieldValue, orderValue) {
    this.data = this.sortData(fieldValue, orderValue);
    this.subElements.body.innerHTML = this.createTableBody(this.data);
    this.subElements.header.querySelector(`[data-id=${fieldValue}]`).append(this.arrow);
  }

  sortData (sortField, sortOrder) {
    const conf = this.headerConfig.find(item => item.id === sortField);

    if (!conf) {
      return;
    }

    let sortType = conf.sortType;

    const dataCopy = [...this.data];
    const direction = {asc: 1, desc: -1}[sortOrder];

    return dataCopy.sort((a,b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[sortField] - b[sortField]);
      case 'string':
        return direction * a[sortField].localeCompare(b[sortField], ['ru', 'en'], {sensitivity: 'variant', caseFirst: 'upper'});
      default:
        return direction * (a[sortField] - b[sortField]);
      }
    });
  }

  createHeader(headerConfig) {
    let result = '';
    for (const columnHeaderConf of headerConfig) {
      result += `
                    <div class="sortable-table__cell" data-id="${columnHeaderConf.id}"
                                                      data-sortable="${columnHeaderConf.sortable}"
                                                      ${this.sorted.id === columnHeaderConf.id ? 'data-order="' + this.sorted.order + '"' : ''}>
                        <span>${columnHeaderConf.title}</span>
                    </div>
            `
    }
    return result;
  }

  createTableRow(productData) {
    let result = `<a href="/products/${productData.id}" class="sortable-table__row">`;
    for (const columnHeaderConf of this.headerConfig) {
      result += columnHeaderConf.template ?
        columnHeaderConf.template(productData[[columnHeaderConf.id]])
        :
        `<div class="sortable-table__cell">${productData[columnHeaderConf.id]}</div>`;
    }

    result += '</a>';
    return result;
  }

  createTableBody(data) {
    return data.map(item => {
      return this.createTableRow(item);
    }).join('');
  }

  getSubElements(element) {
    const result = {};
    const subElements = element.querySelectorAll('[data-element]');
    for (const subElement of subElements) {
      result[subElement.dataset.element] = subElement;
    }
    return result;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerdown', this.onMouseClick);
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}