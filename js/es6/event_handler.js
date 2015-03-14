export class EventHandler {
	constructor(canvasID, latencies) {
		this._interactables = []
		this.mousePos = [0, 0]

		// Cache the $(canvas) jQuery object
		this.canvas = $(canvasID)

		// Define custom events
		this.longpressLatency = latencies['longpress']
	}

	addInteractable(interactable) {
		this._interactables.push(interactable)
	}

	get mousePosX() {
		return this.mousePos[0]
	}

	get mousePosY() {
		return this.mousePos[1]
	}

	getCurrMousePos(e) {
		return [ e.pageX - this.canvas.offset().left,
				 e.pageY - this.canvas.offset().top ]
	}

	mousedownHandler(e) {
		// console.log(this.canvas)
		this.mousePos = this.getCurrMousePos(e)

		console.log(this.mousePos)
		console.log("mousedown")

		this.mousedown = true

		// Trigger a longPress event if mousedown for > 1sec
		this.longPress = window.setTimeout(() => {
			this.mousedown = false

			var e = new CustomEvent("longpress", {
				detail: {},
				bubbles: true,
				cancelable: true
			})

			this.canvas[0].dispatchEvent(e)
		}, this.longpressLatency)
	}

	mouseupHandler(e) {
		// Cancel the longPress event if mouseup

		window.clearTimeout(this.longPress)

		// Update mousePos
		var endPos = this.getCurrMousePos(e)

		console.log("mouseup")

		// check if endPos is in some interactable's bounds,
		// and if so, call the corresponding click method
		var startNode = null
		var endNode = null
		for (var interactable of this._interactables) {
			if (interactable.posInBound(this.mousePos)) {
				startNode = interactable
			}

			if (interactable.posInBound(endPos)) {
				endNode = interactable
			}
		}

		if (startNode != null & endNode != null) {
			if (startNode === endNode) {
				startNode.handleClick()
			} else {

				// Dispatch an event to create an edge
				var e = new CustomEvent("edgecreated", {
					detail: {
						start: startNode,
						end: endNode
					},
					bubbles: true,
					cancelable: false
				})

				$("#canvas")[0].dispatchEvent(e)
			}
		}

		this.mousedown = false
	}
}

// Events
/*

Click
keypress
mousedown
mouseup

touchstart
touchend

*/