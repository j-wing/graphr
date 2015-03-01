class Node {
    constructor() {
        alert("Wow!");
    }

    sayHi() {
        let x = 6;
        alert("Hi!${x}");
    }
}

window.myNode = new Node()
myNode.sayHi()