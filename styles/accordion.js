class AnimatedAccordion {
	constructor(element) {
		this.element = element;
		this.summary = element.querySelector("summary");
		this.content = element.querySelector(".accordion-content");
		this.animation = null;
		this.isClosing = false;
		this.isOpening = false;

		if (!this.summary || !this.content) {
			return;
		}

		this.summary.addEventListener("click", (event) => this.handleClick(event));
	}

	handleClick(event) {
		event.preventDefault();
		this.element.style.overflow = "hidden";

		if (this.isClosing || !this.element.open) {
			this.open();
			return;
		}

		if (this.isOpening || this.element.open) {
			this.close();
		}
	}

	close() {
		this.isClosing = true;
		const startHeight = `${this.element.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.element.animate(
			{ height: [startHeight, endHeight] },
			{ duration: 260, easing: "ease" }
		);
		this.animation.onfinish = () => this.finish(false);
		this.animation.oncancel = () => {
			this.isClosing = false;
		};
	}

	open() {
		this.element.style.height = `${this.element.offsetHeight}px`;
		this.element.open = true;

		requestAnimationFrame(() => this.expand());
	}

	expand() {
		this.isOpening = true;
		const startHeight = `${this.element.offsetHeight}px`;
		const endHeight = `${this.element.scrollHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.element.animate(
			{ height: [startHeight, endHeight] },
			{ duration: 260, easing: "ease" }
		);
		this.animation.onfinish = () => this.finish(true);
		this.animation.oncancel = () => {
			this.isOpening = false;
		};
	}

	finish(open) {
		this.element.open = open;
		this.animation = null;
		this.isClosing = false;
		this.isOpening = false;
		this.element.style.height = "";
		this.element.style.overflow = "";
	}
}

document.querySelectorAll(".accordion-item").forEach((element) => {
	new AnimatedAccordion(element);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isInternalPageLink(link) {
	const url = new URL(link.href, window.location.href);
	const current = new URL(window.location.href);
	const isSamePageHash = url.pathname === current.pathname && url.search === current.search && url.hash;

	return (
		url.origin === current.origin &&
		!isSamePageHash &&
		!link.hasAttribute("download") &&
		!link.target &&
		!url.protocol.startsWith("mailto") &&
		!url.protocol.startsWith("tel")
	);
}

document.querySelectorAll("a[href]").forEach((link) => {
	link.addEventListener("click", (event) => {
		if (
			event.defaultPrevented ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			event.button !== 0 ||
			!isInternalPageLink(link)
		) {
			return;
		}

		event.preventDefault();
		link.classList.add("is-link-activating");

		if (prefersReducedMotion) {
			window.location.href = link.href;
			return;
		}

		document.documentElement.classList.add("is-page-exiting");
		window.setTimeout(() => {
			window.location.href = link.href;
		}, 120);
	});
});
