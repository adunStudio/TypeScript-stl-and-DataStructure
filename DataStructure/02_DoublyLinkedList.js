/**
 * Created by oppa on 2016-08-15.
 */

function Node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList() {
    this._length = 0;
    this._head = null;
    this._tail = null;
}

DoublyLinkedList.prototype.append = function(data) {
    var node = new Node(data);
    var curr;

    if( this._head == null ) {

        this._head = node;
        this._tail = node;

    } else {
        curr = this._head;

        while( curr.next ) {
            curr = curr.next;
        }

        curr.next = node;
        node.prev = next;
        this._tail = node;
    }

    this._length ++;
};


DoublyLinkedList.prototype.insert = function(pos, data) {
    if( pos >= 0 && pos <= this._length ) {
        var node = new Node(data),
            curr = this._head,
            prev,
            index = 0;

        if( pos === 0 ) {

            if( !this._head ) {
                this._head = node;
                this._tail = node;
            } else {
                node.next = curr;
                curr.prev = node;
                this._head = node;
            }

        } else if( pos === this._length ) {

            curr = this._tail;
            curr.next = node;
            node.prev = curr;
            this._tail = node;

        } else {

            while( index++ < pos ) {
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            prev.next = node;
            curr.prev = node;
            node.prev = prev;

        }

        this._length ++;

        return true;
    }

    return false;
};

DoublyLinkedList.prototype.removeAt = function(pos) {
    if( pos > -1 && pos < this._length ) {
        var curr = this._head;
        var prev, index = 0;

        if( pos === 0 ) {
            this._head = curr.next;

            if( this._length === 1 ) {
                this._tail = null;
            } else {
                this._head.prev = null;
            }

        } else if( pos === this._length-1 ) {

            curr = this._tail;
            this._tail = curr.prev;
            this._tail.next = null;

        }
        else {

            while( index++ < pos ) {
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;
            curr.next.prev = prev;

        }

        this._length --;

        curr.next = null;
        curr.prev = null;

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

            if( !this._head ) {
                this._head = node;
                this._tail = node;
            } else {
                node.next = curr;
                curr.prev = node;
                head = node;
            }


        } else if ( pos === this._length) {

            curr = this._tail;
            curr.next = node;
            node.prev = curr;
            this._tail = node;

        }else {

            while( index++ < pos ) {
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            prev.next = node;
            curr.prev = node;
            node.prev = prev;
        }

        this._length ++;

        return true;
    }

    return false;
};

DoublyLinkedList.prototype.toString = function() {
    var curr = this._head,
        str = '';

    while( curr ) {
        str += curr.data;
        curr = curr.next;
    }

    return str;
};

DoublyLinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};

DoublyLinkedList.prototype.size = function() {
    return this._length;
};