function LinkedList () {
	var self = this; 
	var head; 
	var tail;
	var size = 0; 

	this.get = function (i) {
		if (i < 0 || i > size - 1) {
			throw "Invalid index!";
		}

		var curr = head;
		for (var j = 0; j < i; j++) {
			curr = curr.getNext(); 
		}

		return curr.getData();
	}

	this.add = function (i, data) {
		this.addToIndex(i, data);
	}

	this.addToIndex = function (i, data) {
		if (i == 0) {
			self.addToFront(data);
		} else if (i === size - 1) {
			self.addToBack(data);
		} else if (i > 0 && i < size - 1) {
			var curr = head;
			for (var j = 1; j < i; j++) {
				curr = curr.getNext(); 
			}
			var newNode = new Node(data, curr.getNext());
			curr.setNext(newNode);
			size++;
		} else {
			throw "Invalid index! ";
		}
	}

	this.addToFront = function (data) {
		head = new Node(data, head);
		if (size === 0) {
			tail = head;
		}
		size++;
	}

	this.addToBack = function (data) {
		var newTail = new Node(data, null);
		if (size == 0) {
			head = newTail; 
		} else {
			tail.setNext(newTail);
		}
		tail = newTail;

		size++;
	}

	this.remove = function (i) {
		return removeFromIndex(i);
	}

	this.removeFromIndex = function (i) {
		if (i === 0) {
			return self.removeFromFront();
		} else if (i === size - 1) {
			return self.removeFromBack();
		} else if (i > 0 && i < size - 1) {
			var curr = head;
			for (var j = 1; j < i; j++) {
				curr = curr.getNext(); 
			}
			var data = curr.getNext().getData();
			curr.setNext(curr.getNext());
			size--;
			return data;
		} else {
			throw "Invalid index! ";
		}
	}

	this.removeFromFront = function () {
		if (size === 0) {
			throw "Invalid index!";
		}
		var data = head.getData();
		head = head.getNext();

		size--;
		if (size === 0) {
			tail = null; 
		} else if (size === 1) {
			tail = head; 
		}
		return data;
	}

	this.removeFromBack = function () {
		if (size === 0) {
			throw "Invalid index!";
		}

		var data = tail.getData();

		if (size === 1) {
			tail = null; 
			head = null;
		} else if (size === 2) {
			head.setNext(null);
			tail = head; 
		} else {
			var newTail = self.get(size - 2);
			newTail.setNext(null);
			tail = newTail;
		}

		size--;
		return data;
	}

	this.isEmpty = function () {
		return size === 0;
	}

	this.size = function () {
		return size;
	}

	this.toArray = function () {
		var result = [];
		var curr = head;
		for (var i = 0; i < size; i++) {
			result[i] = curr.getData();
			curr = curr.getNext();
			i++;
		}
		return result; 
	}

	function Node (d, n) {
		var data = d;
		var next = n;

		this.getData = function () {
			return data;
		}

		this.setData = function (d) {
			data = d;
		}

		this.getNext = function () {
			return next;
		}

		this.setNext = function (node) {
			if (node != null && !(node instanceof Node)) {
				throw "Invalid node type!";
			}
			next = node;
		}
	}
}