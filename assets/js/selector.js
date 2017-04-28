class Selector {
    constructor (name) {
        this.name = document.querySelector(name);
        this.classList = this.name !== null
            ? this.name.classList
            : null;
    }

    addClass(className) {
        this.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.classList.remove(className);
        return this;
    }

    getNode() {
        return this.name;
    }
}

export default function vp (name) {
    return new Selector(name);
};
