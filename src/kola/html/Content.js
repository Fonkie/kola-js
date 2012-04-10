kola('kola.html.Content', 
	['kola.html.ElementCore','kola.lang.Array','kola.lang.Function','kola.bom.Browser','kola.bom.Event'],
function(KElement,A,F,Browser,KEvent){
    var Content={
		/**
		 * ��ȡ�ڵ��е�html
		 * @return html�ַ���
		 * @type String
		 */
		/**
		 * ���ýڵ��е�html
		 * @param {String} value Ҫ���õ�html�ַ���
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		html: function(value) {
			var el = this[0],
				ret;

			//	����ǻ�ȡֵ���Ǿ�ֱ�ӵ��÷���
			if ( typeof value == 'undefined' ) {
				return el.innerHTML;
			}

			//	����������ֵ
			if (Browser.isIE) {
				//	ie��ֱ�ӵ����������
				ret = innerHtml(el, value);
			} else {

				//	���ȵ���ԭ���������������Ļ����Ǿ͵����������
				try {
					ret = this.prop('innerHTML', value);
				} catch(e) {
					ret = innerHtml(el, value);
				}
			}

			
			//	TODO: ��������Ҫ������װ�ģ����һ���Ҫ���ǵ����ڵ㻹�Ƕ���ڵ�
			return ret;
		},
		
		/**
		 * ��ȡ�ڵ��text����
		 * @return text����
		 * @type String
		 */
		/**
		 * ���ýڵ��е�text����
		 * @param {String} value Ҫ���õ�text����
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		text: function(value) {
			return this.prop(typeof(this[0].innerText) != 'undefined' ? 'innerText' : 'textContent', value);
		},
		
		/**
		 * �ڵ�һ��Ԫ�ص��ӽڵ��������Ԫ��
		 * @return ����ӵĽڵ�
		 * @type kola.html.Element
		 */
		append: function(target) {
            var elements=KElement.util.toElements(target);
            var el=this[0];
            for(var i=0,il=elements.length;i<il;i++){
                appendChild(el, elements[i]);
            }
            //�������е�ÿһ�������ݣ���ʱ�ò���
            /*
            for(var i=1;il<this.length;i++){
                var el=this[i];
                for(var i=0,il=elements.length;i<il;i++){
                    appendChild(el, elements[i].cloneNode(true));
                }
            }
            */
		},
		
		/**
		 * �ڵ�һ��Ԫ�ص��ӽڵ���ʼ���Ԫ��
		 * @return ����ӵĽڵ�
		 * @type kola.html.Element
		 */
		prepend: function() {
			var nodes = [],
				parent = this[0],
				offset = parent.firstChild || null;
			A.forEach(arguments, F.bind((function(parent, offset, nodes, elementN) {
				var node;
				if (typeof(elementN) == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = elementN;
					while (ctr.firstChild) {
						node = insertBefore(parent, ctr.firstChild, offset);
						if (!offset) offset = node;
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				} else {
					if (elementN.nodeType) {
						elementN = [elementN];
					}
					for (var i = 0, il = elementN.length; i < il; i ++) {
						node = insertBefore(parent, elementN[i], offset);
						if (!offset) offset = node;
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				}
			}), this, parent, offset, nodes));

			if ( nodes.length > 0 ) {
				//	�ɷ�dominsert�¼�
				fireDomInsert( nodes[ 0 ] );

				return new this.constructor(nodes);
			} else {
				return null;
			}
		},
		
		/**
		 * �ڵ�һ��Ԫ��֮ǰ���Ԫ��
		 * @return ����ӵĽڵ�
		 * @type kola.html.Element
		 */
		before: function() {
			var nodes = [],
				offset = this[0],
				parent = offset.parentNode;
			A.forEach(arguments, F.bind((function(parent, offset, nodes, elementN) {
				var node;
				if (typeof(elementN) == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = elementN;
					while (ctr.firstChild) {
						node = insertBefore(parent, ctr.firstChild, offset);
						if (!offset) offset = node;
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				} else {
					if (elementN.nodeType) {
						elementN = [elementN];
					}
					for (var i = 0, il = elementN.length; i < il; i ++) {
						node = insertBefore(parent, elementN[i], offset);
						if (!offset) offset = node;
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				}
			}), this, parent, offset, nodes));

			return new this.constructor(nodes);
		},
		
		/**
		 * �ڵ�һ��Ԫ��֮�����Ԫ��
		 * @return ����ӵĽڵ�
		 * @type kola.html.Element
		 */
		after: function() {
			var nodes = [],
				element = this[0],
				parent = element.parentNode,
				offset = element.nextSibling,
				func = !!offset ? insertBefore : appendChild;
			A.forEach(arguments, F.bind((function(parent, offset, func, nodes, elementN) {
				var node;
				if (typeof(elementN) == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = elementN;
					while (ctr.firstChild) {
						node = func(parent, ctr.firstChild, offset);
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				} else {
					if (elementN.nodeType) {
						elementN = [elementN];
					}
					for (var i = 0, il = elementN.length; i < il; i ++) {
						node = func(parent, elementN[i], offset);
						if (node.nodeType == 1) {
							nodes.push(node);
						}
					}
				}
			}), this, parent, offset, func, nodes));

			return new this.constructor(nodes);
		},
	
		/*
		 * ɾ������Ԫ��
		 */
		remove: function() {
			this._each( function(element) {
				if (element.parentNode) 
					element.parentNode.removeChild(element);
			});
		},
		/**
		 * �ж��Ƿ����ָ���Ķ���
		 * @param {KolaElement} element ����
		 * @return true ���� false
		 * @type boolean
		 */
		contains: function(element) {
			if (!element || !(element = this.constructor(element))) return false;
			element = element[0];
			var el = this[0];
			
			if (el.contains) {
				return el.contains(element);
			} else {
				while (element = element.parentNode) {
					if (element == el) return true;
				}
				return false;
			}
		}
    };
    
	/**
	 * �ڸ�Ԫ�ص�������Ԫ��֮�����һ��Ԫ��
	 */
	var appendChild = function(parent, child) {
		if (parent.tagName.toLowerCase() == 'table' && child.tagName.toLowerCase() == 'tr') {
			if (parent.tBodies.length == 0) {
				parent.appendChild(document.createElement('tbody'));
			}
			parent = parent.tBodies[0];
		}
		//	���Ҫ��ӵĽڵ���DocumentFragment���Ǿͽ������⴦��
		if ( child.nodeType === 11 ) {
			var length = child.childNodes.length;
			parent.appendChild(child);
			var nodes = parent.childNodes, news = [];
			for ( var j = nodes.length, i = j - length; i < j; i++ ) {
				news.push( nodes[i] );
			}
			return news;
		}
		return parent.appendChild(child);
	};

	/**
	 * �ڸ�Ԫ�ص�������Ԫ��֮�����һ��Ԫ��
	 */
	var insertBefore = function(parent, child, before) {
		if (parent.tagName.toLowerCase() == 'table' && child.tagName.toLowerCase() == 'tr') {
			if (parent.tBodies.length == 0) {
				parent.appendChild(document.createElement('tbody'));
			}
			parent = parent.tBodies[0];
		}
		return parent.insertBefore(child, before || parent.firstChild);
	};
	
	var isBody = function(tag) {
		var reg = /^body|html$/i;
		isBody = function(tag) {
			return !reg.test(tag);
		};
		isBody(tag);
	};
    
	/**
	 * ���ö����innerHTML����Ҫ��Բ�ֱ��֧��innerHTML�Ķ���
	 * @param el
	 * @param value
	 */
	var innerHtml = function(el, value) {
		//	�Ƚ���������нڵ���¼��������ڴ�й¶
		purgeChildren( el );
		
		//	������Ҫ��table,select�������⴦����������Ԫ�ش�����
		var translations = {
				table: 	[1, '<table>', '</table>'],
				select: [1, '<select>', '</select>'],
				tbody: 	[2, '<table><tbody>', '</tbody></table>'],
				tr: 	[3, '<table><tbody><tr>', '</tr></tbody></table>']
			},
			tagName = el.tagName.toLowerCase(),
			wrap = translations[ tagName ];

		if ( wrap ) {
			var node,
				wrapper = document.createElement('div');

			//	ʹ��dom������ɾ�������ӽڵ�
			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}

			//	����������ݣ�����ȡ����ӵĽڵ�
			wrapper.innerHTML = wrap[1] + value + wrap[2];
			for (var i = wrap[0]; i--;) {
				wrapper = wrapper.firstChild;
			}
			while ( node = wrapper.firstChild ) {
				appendChild( el, node );
			}

			//	�����ie9��ǰ�İ汾���������õ���select���Ǿ�Ĭ�Ͼ۽�����һ��������Ҫ�ǽ��ie9֮ǰ�İ汾����Ĭ�����õ����һ�����������������汾���Ǿ۽�����һ��
			if ( tagName == 'select' && Browser.isIEStyle ) {
				el.selectedIndex = 0;
			}
		} else {
			el.innerHTML = value;
		}

		return el.childNodes;
	};
    
	/**
	 * �Ƴ�ĳ���ڵ���������ڵ��js�����ã������ڴ�й¶
	 */
    if(!window.ActiveXObject || window.XDomainRequest){//IE6,7��Ҫ�Ƴ������¼�
        var purgeChildren = F.empty;
    }else{
        var purgeChildren = function( element ) {
            var nodes = element.all,count;
            for ( var i = nodes.length - 1; i >= 0; i-- ) {
                KEvent.un( nodes[ i ] );
                node[ElementCore.expando]=null;
            }
        };
        /**
         * ����������ڴ�й¶���Ǿ͸���unload�¼���������Щ
         */

        KEvent.on( window, 'unload', function() {
            purgeChildren(document);
        });
    }
    return Content;
});