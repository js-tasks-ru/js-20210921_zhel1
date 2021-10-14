export default class NotificationMessage {
	static notification;

	constructor(text = '', {
		duration = 2000,
		type = 'success'
	} = {}) {
		this.text = text;
		this.duration = duration; //ms
		this.type = type;

		this.render();
	}

	get template() {
		return `
			  <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
				<div class="timer"></div>
				<div class="inner-wrapper">
				  <div class="notification-header">${this.type}</div>
				  <div class="notification-body">
					${this.text}
				  </div>
				</div>
			  </div>
		`;
	}

	render() {
		const element = document.createElement('div');
		element.innerHTML = this.template;
		this.element = element.firstElementChild;
	}

	show(obj = document.body) {
		if (NotificationMessage.notification) {
			NotificationMessage.notification.remove();
		}

		setTimeout(() => {
			this.remove();
		}, this.duration )

		obj.append(this.element);

		NotificationMessage.notification = this;
	}

	remove() {
		if (this.element) {
			this.element.remove();
		}
	}

	destroy() {
		this.remove();
		this.element = null;
		NotificationMessage.notification = null;
	}
}