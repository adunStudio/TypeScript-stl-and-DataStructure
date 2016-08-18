/**
 * Created by oppa on 2016-08-15.
 */

function Node(data) {
    this.data = data;
    this.next = null;
}

function LinkedList() {
    this._length = 0;
    this._head = null;
}

LinkedList.prototype.append = function(data) {
    var node = new Node(data);
    var curr;

    if( this._head == null ) {

        this._head = node;

    } else {
        curr = this._head;

        while( curr.next ) {
            curr = curr.next;
        }

        curr.next = node;
    }

    this._length ++;
};

LinkedList.prototype.removeAt = function(pos) {
    if( pos > -1 && pos < this._length ) {
        var curr = this._head;
        var prev, index = 0;

        if( pos === 0 ) {
            this._head = curr.next;
        } else {
            while( index++ < pos ) {
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;

        }

        this._length --;

        curr.next = null;

        return curr.data;
    }

    return null;
};

LinkedList.prototype.indexOf = function(data) {
    var curr = this._head,
        index = -1;

    while( curr ) {
        if( curr.data === data ) {
            return index;
        }

        index ++;
        curr = curr.next;
    }

    return -1;
};

LinkedList.prototype.remove = function(data) {
    var index = this.indexOf(data);
    return this.removeAt(index);
};

LinkedList.prototype.insert = function(pos, data) {
    if( pos >= 0 && pos <= this._length ) {
        var node = new Node(data),
            curr = this._head,
            prev,
            index = 0;

        if( pos === 0 ) {
            node.next = curr;
            this._head = node;
        } else {
            while( index++ < pos ) {
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            prev.next = node;

            curr.next = null;
        }

        this._length ++;

        return true;
    }

    return false;
};

LinkedList.prototype.toString = function() {
    var curr = this._head,
        str = '';

    while( curr ) {
        str += curr.data;
        curr = curr.next;
    }

    return str;
};

LinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};

LinkedList.prototype.size = function() {
    return this._length;
};


var a = new LinkedList();
a.append(1);
a.append(1);
a.append(1);

console.log(a.toString());

