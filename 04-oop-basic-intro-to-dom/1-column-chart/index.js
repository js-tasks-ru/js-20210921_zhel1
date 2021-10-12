export default class ColumnChart {
	chartHeight = 50;
	subElements = [];

	constructor({
					data = [],
					label = '',
					value = 0,
					link = '',
					formatHeading = data => data
				} = {})  {

		this.data = data;
		this.label = label;
		this.value = value;
		this.link = link;
		this.formatHeading = formatHeading;

		this.render();
	}

	get template(){
		return `
				<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
				  <div class="column-chart__title">
					${this.label}
					<a href="/${this.link}" class="column-chart__link">View all</a>
				  </div>
				  <div class="column-chart__container">
					<div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
					<div data-element="body" class="column-chart__chart">
	 					${this.createColumns(this.data)}
					</div>
				  </div>
				</div>
		`;
	}

	render() {
		let wrapper = document.createElement("div");
		wrapper.innerHTML = this.template;
		this.element = wrapper.firstElementChild;

		//cash for update
		let dataElements = this.element.querySelectorAll('[data-element]');
		dataElements.forEach(subEl => {
			this.subElements[subEl.dataset.element] = subEl;
		});

		this.update(this.data);
	}

	update(data) {
		this.data = data;

		if (this.data.length !== 0) {
			this.element.classList.remove('column-chart_loading');
		} else {
			this.element.classList.remove('column-charts');
		}

		this.subElements.body.innerHTML = this.createColumns(data);
	}

	createColumns(data) {
		const maxValue = Math.max(...data);
		const scale = this.chartHeight / maxValue;

		if (data.length === 0)
			return '';

		let result = '';
		data.map(item => {
			let percent = (item / maxValue * 100).toFixed(0) + '%';
			let value =  String(Math.floor(item * scale));
			result = result + `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
		});
		return result;
	}

	remove() {
		if (this.element) {
			this.element.remove();
		}
	}

	destroy() {
		this.remove();
		this.element = null;
		this.subElements = {};
	}
}