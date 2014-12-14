module jsflap {

    interface INodeList {
        has(node: Node): boolean;
        has(nodeString: string): boolean;
        getNode(node: Node): Node;
        getNode(node: string): Node;
    }
    
    export class NodeList implements  INodeList {

        /**
         * The actual array of nodes
         */
        public nodes: Object;

        /**
         * The internal size
         * @type {number}
         * @private
         */
        private _size: number = 0;

        /**
         * Gets the size of the list
         * @returns {number}
         */
        get size() {
            return this._size;
        }

        /**
         * Create a new node list
         * @param nodes
         */
        constructor(nodes?: Array<Node>) {
            this.nodes = {};
            if(nodes) {
                nodes.forEach((node) => {
                    this.add(node);
                });
            }
        }

        /**
         * Adds a new node to the list
         * @param node
         */
        public add(node: Node) {
            if(!this.has(node)) {
                this.nodes[node.toString()] = node;
                this._size++;
                return node;
            } else {
                return this.nodes[node.toString()];
            }
        }

        /**
         * Checks if the node exists already
         * @param node
         * @returns {boolean}
         */
        public has(node: any) {
            if(typeof node === 'string') {
                return this.nodes.hasOwnProperty(node);
            } else if(node instanceof Node) {
                return this.nodes.hasOwnProperty(node.toString());
            }
        }

        /**
         * Gets an node by a similar node object
         * @param node
         * @returns {*}
         */
        public getNode(node: any) {
            if(this.has(node)) {
                if(typeof node === 'string') {
                    return this.nodes[node];
                } else if(node instanceof Node) {
                    return this.nodes[node.toString()];
                }
            } else {
                return null;
            }
        }
    }
}