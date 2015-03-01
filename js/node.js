class Node {
	/* Constructors */
    constructor(value, pos) {
        this.value = value
        this.radius = 5 // some arbitrary value for now
        this.pos = pos
    }

    /* Render methods */
    render() { }
    drawArc() { }

    /* Getters and Setters */
    get value() {
    	return this.value
    }
    set value(value) {
    	this.value = value
    }

    get pos() {
    	return this.pos
    }
    set pos(pos) {
    	this.pos = pos
    }
}


