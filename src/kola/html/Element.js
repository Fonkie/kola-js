
/**
 * @fileOverview kola.html.Element DOMElement������
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.html.Element', 
	[':Array',':Class',':Function',':Type',':Selector',':Event',':Browser',':Dispatcher'],
function(kolaArray, C, F,Type, Selector, Event, Browser,Dispatcher) {
	
	/********************************************** ���ඨ�� **********************************************/
    var noPx={
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	};
    /**
        ����element.data�Ĵ洢
    */
    var cache={};
    var cache_attr_name="data-E2F32B1"
    var cacheSize=0;
	var CLASS = C.create(Dispatcher,{

		/**
		 * ��װHTMLElement�Ķ���
		 * @param {String|HTMLElement|kola.html.Element|Array<HTMLElement>} selector cssѡ����
		 * @param {HTMLElement|kola.html.Element|Array<HTMLElement>} context ѡ��Χ
		 * @return ��װ��Ķ���
		 */
		__ME: function(selector, context) {
			if(Type.isString(selector) && selector.charAt(0)!='<'){
                //	���Ϊcss selector
				var nodes;

				//	ȷ���Ƿ����context
                if(Type.isUndefined(context)){
                    context=null;
                }else{
                    context=toElements(context);
                    if(context.length==0)
                        context=null;
                }
				//	��������context���в�ͬ�Ĵ���
				if (context === null) {
					nodes = Selector(selector);
				} else {
					//	contextΪ���飬��Ҫ��ÿ��context��Ѱ��
					//	TODO: ������������ģ���Ϊ���selector���ǻ�ȡ��һ��������ָ����ĳ��
					nodes = [];
					for (var i = 0, il = context.length; i < il; i ++) {
						nodes = nodes.concat(Selector(selector, context[i]));
					}
				}
				return new this(nodes);
            }else{
                var nodes=toElements(selector);
            }
            if(nodes)
                return new this(nodes);
			return null;
		},

		/**
		 * ���ʼ������
		 * @param elements
		 */
		_init: function(elements) {
            this.length=elements.length;
            for(var i=0;i<this.length;i++)
                this[i]=elements[i];
			this._elements = elements;
		},
        /**
        ��each
        */
        _each:function(callBack){
            for(var i=0,il=this.length;i<il;i++)
                callBack.call(this,this[i]);
        },
		/*-------------------------------------- ����������� --------------------------------------*/
		
		/**
		 * ��ȡĳ������ֵ
		 * @param {String} name ������
		 * @return ����ֵ
		 * @type String
		 */
		/**
		 * ����ĳ������ֵ
		 * @param {String} name ������
		 * @param value ����ֵ
		 * @return ��ǰ��Element����
		 * @type Element
		 */
		attr: function(name, value) {
			if (typeof(value) == 'undefined') {
				//	������Ҫ��ȡ����ֵ
				var element = this[0];
				switch(name) {
					case 'class':
						return element.className;
					case 'style':
						return element.style.cssText;
					default:
						return attr(element, name);
				}
			} else {
				//	������Ҫ��������ֵ
				this._each( function(element) {
					switch(name) {
						case 'class':
							element.className = value;
							break;
						case 'style':
							element.style.cssText = value;
							break;
						default:
							//	���������һ���¼���������ie�µĻ�����Ҫ����.on...����ʽ��setAttribute����ʽ���������
							if (document.all && name.indexOf('on') == 0) {
								//	������ַ�������Ҫת����һ��������ie��ֻ�ܽ��ܷ���
								if (typeof(value) == 'string') {
									value = new Function(value);
								}
								element[name] = value;
							} else {
								element.setAttribute(name, value);
							}
					}
				});
				return this;
			}
		},

		/**
		 * �ж��Ƿ����ĳ������
		 */
		hasAttr: function( name ) {
			var element = this[0];
			return element.hasAttribute ? element.hasAttribute( name ) : false;
		},
		
		/**
		 * ɾ��ĳ������ֵ
		 * @param {String} name ������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		removeAttr: function(name) {
			this._each( function(element) {
				element.removeAttribute(name);
			});
			return this;
		},
	
		/**
		 * ��ȡĳ������ֵ
		 * @param {String} name ������
		 * @return ����ֵ
		 * @type String
		 */
		/**
		 * ����ĳ������ֵ
		 * @param {String} name ������
		 * @param {ANY} value ����ֵ
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		prop: function(name, value) {
			if (typeof(value) == 'undefined') {
				//	��ȡ����ֵ
				return this[0][name];
			} else {
				//	��������ֵ
				this._each( function(element) {
					element[name] = value;
				});
				return this;
			}
		},
	
		/**
		 * �жϵ�ǰ�����Ƿ����ָ������ʽ
		 * @param {String} name ��ʽ����
		 * @return ���ڷ���true�������ڷ���false
		 * @type Boolean
		 */
		hasClass: function(name) {
			var str = this[0].className;
			return str.length > 0 && (' ' + str + ' ').indexOf(name) != -1;
		},
		
		/**
		 * �жϵ�ǰ�����Ƿ����ָ������ʽ
		 * @param {String} name ��ʽ����
		 * @return ���ڷ���true�������ڷ���false
		 * @type Boolean
		 */
		addClass: function(name) {
			if ( typeof( name ) != 'string' || name.length == 0 ) return this;
            var _this = this;
			this._each( function(element) {
                if(!_this.constructor(element).hasClass(name)){
				    element.className += ' ' + name;
                }
			});
			return this;
		},
		/**
		 * �жϵ�ǰ�����Ƿ����ָ������ʽ
		 * @param {String} name ��ʽ����
		 * @return ���ڷ���true�������ڷ���false
		 * @type Boolean
		 */
		removeClass: function(name) {
			if ( typeof( name ) != 'string' || name.length == 0 ) return this;
			this._each( function(element) {
				var str = element.className,
					index;

				if (str.length > 0 && (index = (str = (' ' + str + ' ')).indexOf(name)) != -1) {
					element.className = str.split(name).join(' ');
				}
			});
			return this;
		},
        /**
            �õ���0��Ԫ�ص�data[name]
            ������������Ԫ�ص�data[name]
        */
        data:function(name,data){
            if(Type.isUndefined(data)){
                index=this.attr(cache_attr_name);
                if(!index || !cache[index])
                    return null;
                return cache[index][name];
            }else{
                this.each(function(e){
                    index=this.attr(cache_attr_name);
                    if(!index){
                        index=cacheSize++;
                        this.attr(cache_attr_name,index);
                    }
                    if(!cache[index])
                        cache[index]={};
                    cache[index][name]=data;
                })
            }
        },
        /**
            �Ƴ�����Ԫ�ص�data[name]
        */
        removeData:function(name){
            this.each(function(e){
                index=this.attr(cache_attr_name);
                if(!index || !cache[index])
                    return;
                cache[index][name]=null;
            });
        },
        /**
            �Ƴ�����Ԫ�ص�����data
        */
        removeAllData:function(){
            this.each(function(e){
                index=this.attr(cache_attr_name);
                if(!index)
                    return;
                cache[index]=null;
            });
        },
		/*-------------------------------------- ��ʽ��λ����� --------------------------------------*/
		/**
		 * ��ȡĳ����ʽ����ֵ
		 * @param {String} name ������
		 * @return ����ֵ
		 * @type String
		 */
		/**
		 * ����ĳ����ʽ����ֵ
		 * @param {String} name ������
		 * @param {ANY} value ����ֵ
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		style: function(name, value) {
            //������תΪ�շ�ʽ
            name=name.replace(/-([a-z])/ig,function( all, letter ) {return letter.toUpperCase();});
			if (typeof(value) == 'undefined') {
				var element = this[0],
					st = element.style;
				if (name == 'opacity') {
					var filter;
					if (typeof(filter = st.filter) == 'string' && filter.length>0) {
						return filter.indexOf("opacity=") >= 0 ? parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100 : 1;
					} else {
						return (filter = st.opacity) ? parseFloat(filter) : 1;
					}
				} else {
					return style( element, name );
				}
			} else {
				this._each(function(element) {
					var st = element.style;
					if (name == 'opacity') {
						if (Browser.isIE) {
							st.filter = 'Alpha(Opacity=' + value*100 + ')'; 
						} else {
							st.opacity = (value == 1 ? '': '' + value);
						}
					} else {
                        //��������֣��Զ���px
                        var newValue=parseInt(value);
                        if(newValue==value && !noPx[name])
                            value=value+"px";
                        st[name] = value;
					}
				});
				return this;
			}
		},
		
		/**
		 * ɾ��ĳ����ʽֵ
		 * @param {String} name ������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		removeStyle: function(name) {
			this._each( function(element) {
				var s = element.style;
				if (s.removeProperty) {
					s.removeProperty(name);
				} else if (s.removeAttribute) {
					if (name == 'opacity' && typeof(element.style.filter) == 'string') {
						name = 'filter';
					}
					s.removeAttribute(name);
				} else {
					s[name] = null;
				}
			});
			return this;
		},
		
		/**
		 * ��ȡ��һ�������λ�ã�������䶨λ�����λ��
		 * @return λ��
		 * @type Object
		 */
		/**
		 * ���ö����λ�ã�������䶨λ�����λ��
		 * @param {Object} position ��λ��
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		pos: function(position) {
			if (typeof(position) == 'undefined') {
				//	��ȡλ��ֵ
				
				var element = this[0];
				return {
					left: element.offsetLeft,
					top: element.offsetTop
				};
			} else {
				//	����λ��ֵ
				
				this._each( function(element) {
					if ( !isNaN( position.left ) ) element.style.left = position.left + 'px';
					if ( !isNaN( position.top ) ) element.style.top = position.top + 'px';
				});
				return this;
			}
		},
		
		/**
		 * ��ȡ��һ�������λ�ã��������������������λ��
		 * @return λ��
		 * @type Object
		 */
		/**
		 * ���ö����λ�ã��������������������λ��
		 * @param {Object} position ��λ��
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		clientPos: function(position) {
			if (typeof(position) == 'undefined') {
				//	��ȡλ��ֵ
				
				var pos = pagePos(this[0]),
					db = document.body,
					de = document.documentElement;
				return {
					left: pos.left - Math.max(db.scrollLeft, de.scrollLeft),
					top: pos.top - Math.max(db.scrollTop, de.scrollTop)
				};
			} else {
				//	����λ��ֵ
				
				//	FIXME: ����Ӧ��������������������������ģ����������ڵ�left��topֵ
				this._each( function(element) {
					element.style.left = position.left + 'px';
					element.style.top = position.top + 'px';
				});
				return this;
			}
		},
		
		/**
		 * ��ȡ��һ��������ҳ���ϵľ���λ��
		 * @return λ��
		 * @type Object
		 */
		/**
		 * ���ö���ľ���λ��
		 * @param {Object} position ��λ��
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		pagePos: function(position) {
			if (typeof(position) == 'undefined') {
				//	��ȡ����ľ���λ��
				
				return pagePos(this[0]);
			} else {
				//	���ö���ľ���λ��
				
				//	FIXME: ����Ӧ�������þ���λ�ã����������ڵ�left��topֵ
				this._each( function(element) {
					var pos = pagePos( element );
					//	���������leftֵ���Ǿͼ���left����
					if ( typeof position.left == 'number' ) {
						var left = style( element, 'left' );
						if ( !left ) {
							left = 0;
						} else {
							if ( typeof( left = parseFloat( left ) ) != 'number' ) {
								left = 0;
							}
						}
						element.style.left = ( position.left + left - pos.left) + 'px';
					}
					//	���������topֵ���Ǿͼ���top����
					if ( typeof position.top == 'number' ) {
						var top = style( element, 'top' );
						if ( !top ) {
							top = 0;
						} else {
							if ( typeof( top = parseFloat( top ) ) != 'number' ) {
								top = 0;
							}
						}
						element.style.top = ( position.top + top - pos.top) + 'px';
					}
				});
				return this;
			}
		},
		
		/**
		 * ��ȡ��һ������Ŀ��
		 * @return ���
		 * @type Number
		 */
		/**
		 * ���ö���Ŀ��
		 * @param {Number} value �¿��
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		width: function(value) {
			if (typeof(value) == 'undefined') {
				//	��ȡ���
				
				return this[0].offsetWidth;
			} else {
				//	���ÿ��
				
				this._each( function(element) {
					element.style.width = value + 'px';
				});
				return this;
			}
		},
		
		/**
		 * ��ȡ��һ������ĸ߶�
		 * @return �߶�
		 * @type Number
		 */
		/**
		 * ���ö���ĸ߶�
		 * @param {Number} value �¸߶�
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		height: function(value) {
			if (typeof(value) == 'undefined') {
				//	��ȡ���
				
				return this[0].offsetHeight;
			} else {
				//	���ÿ��
				
				this._each( function(element) {
					element.style.height = value + 'px';
				});
				return this;
			}
		},

		/**
		 * ��ȡ��һ������ͻ�����Ŀ��
		 * @return ���
		 * @type Number
		 */
		clientWidth: function(value) {
			//	��ȡ���
			return this[0].clientWidth;
		},

		/**
		 * ��ȡ��һ������ͻ�����ĸ߶�
		 * @return �߶�
		 * @type Number
		 */
		clientHeight: function() {
			//	��ȡ���
			return this[0].clientHeight;
		},

		/**
		 * ��ȡ��һ�������������Ŀ��
		 * @return ���
		 * @type Number
		 */
		scrollWidth: function(value) {
			//	��ȡ���
			return this[0].scrollWidth;
		},

		/**
		 * ��ȡ��һ�������������ĸ߶�
		 * @return �߶�
		 * @type Number
		 */
		scrollHeight: function() {
			//	��ȡ���
			return this[0].scrollHeight;
		},
	
		/*-------------------------------------- ���ݱ����� --------------------------------------*/
		
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
			if ( navigator.userAgent.indexOf('MSIE') != -1 ) {
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
            var elements=toElements(target);
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
			kolaArray.forEach(arguments, F.bind((function(parent, offset, nodes, elementN) {
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
			kolaArray.forEach(arguments, F.bind((function(parent, offset, nodes, elementN) {
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
			kolaArray.forEach(arguments, F.bind((function(parent, offset, func, nodes, elementN) {
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
	
		/*-------------------------------------- Ԫ�ػ�ȡ��� --------------------------------------*/
		
		/**
		 * �õ�ÿһ��Ԫ�ص�ǰһ���ֵܽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		prev: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var element = this[i];
				while ( element = element.previousSibling ) {
					if ( element.nodeType == 1 ) {
						nodes.push( element );
						break;
					}
				}
			}

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �õ�ÿһ��Ԫ�صĺ�һ���ֵܽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		next: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var element = this[i];
				while ( element = element.nextSibling ) {
					if ( element.nodeType == 1 ) {
						nodes.push( element );
						break;
					}
				}
			}

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �õ�ÿһ��Ԫ�صĵ�һ���ӽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		first: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var childs = this[i].childNodes,
					length = childs.length;
				for (var j = 0; j < length; j++) {
					var element = childs[j];
					if (!!element && element.nodeType == 1) {
						nodes.push(element);
						break;
					}
				}
			}

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �õ�ÿһ��Ԫ�ص����һ���ӽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		last: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var childs = this[i].childNodes,
					length = childs.length;
				for (var j = length - 1; j >= 0; j--) {
					var element = childs[j];
					if (!!element && element.nodeType == 1) {
						nodes.push(element);
						break;
					}
				}
			}
			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �õ�ÿһ��Ԫ�صĸ��ڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		parent: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var element = this[i].parentNode;
				if (!!element) {
					var isNew = true;
					for (var j = nodes.length - 1; j >= 0; j--) {
						if (nodes[j] == element) {
							isNew = false;
							break;
						}
					}
					if (isNew) nodes.push(element);
				}
			}

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �õ�ÿһ��Ԫ�ص������ӽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		children: function() {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var childs = this[i].childNodes,
					length = childs.length;
				for (var j = 0; j < length; j++) {
					var element = childs[j];
					if (!!element && element.nodeType == 1) {
						nodes.push(element);
					}
				}
			}

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �ҵ�����Ԫ���������з���ָ��selector��Ԫ��
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		up: function(selector) {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var element = this[i];
				while ((element = element.parentNode) && (element.nodeType == 1)) {
					nodes.push(element);
				}
			}
			nodes = Selector.matches(selector, nodes);

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		
		/**
		 * �ҵ�����Ԫ���������з���ָ��selector��Ԫ�أ�������ǰԪ�أ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		closest: function(selector) {
			var nodes = [];
			for (var i = 0, il = this.length; i < il; i++) {
				var element = this[i];
				if (element.nodeType == 1) {
					nodes.push(element);
				} else {
					break;
				}
				while ((element = element.parentNode) && (element.nodeType == 1)) {
					nodes.push(element);
				}
			}
			nodes = Selector.matches(selector, nodes);

			return nodes.length > 0 ? new this.constructor(nodes) : null;
		},
		/**
		 * ��ȡָ����HTMLElement
		 * @param {Number} index ��ȡ��HTMLElement��λ�ã����û������index���Ǿ��Ƿ���Ԫ������
		 * @return ��õ�HTMLElement
		 * @type HTMLElement|Array<HTMLElement>
		 */
		elements: function(index) {
			if (typeof(index) == 'number') {
				if (index < 0) {
					return this[elements.length + index];
				} else {
					return this[index];
				}
			} else {
				return this._elements;
			}
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

		/*-------------------------------------- ������� --------------------------------------*/

		/**
		 * ��ȡԭ�����������
		 */
		size: function() {
			return this.length;
		},

		/**
		 * ��ȡ����Ԫ������
		 */
		each: function( fn ) {
			//	ʹ�õ�����ѭ��ÿ��Ԫ��
			for ( var i = 0, il = this.length; i < il; i++ ) {
				fn.call( this.constructor( this[i] ), i );
			}
			return this;
		},
	
		/*-------------------------------------- �¼���� --------------------------------------*/
	
		/**
		 * �����¼�
		 * @param {String} name �������¼�����
		 * @param {Function} listenerfn �¼�������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		on: function(name, listenerfn) {
			this._each( function(element) {
				Event.on(element, name, listenerfn);
			});
			return this;
		},
		
		/**
		 * ȡ�����¼��ļ���
		 * @param {String} name �������¼�����
		 * @param {Function} listenerfn �¼�������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		un: function(name, listenerfn) {
			this._each( function(element) {
				Event.un(element, name, listenerfn);
			});
			return this;
		},
	
		/**
		 * ����������Ԫ���ⲿ���¼�
		 * @param {String} name �������¼�����
		 * @param {Function} listenerfn �¼�������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		onout: function(name, listenerfn) {
			this._each( function(element) {
				Event.onout(element, name, listenerfn);
			});
			return this;
		},
	
		/**
		 * ȡ���Է�����Ԫ���ⲿ���¼��ļ���
		 * @param {String} name �������¼�����
		 * @param {Function} listenerfn �¼�������
		 * @return ��ǰ��Element����
		 * @type kola.html.Element
		 */
		unout: function(name, listenerfn) {
			this._each( function(element) {
				Event.unout(element, name, listenerfn);
			});
			return this;
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
		},
        //ʹ���������Ϊʵ����һ�����飬�������
        length:0,
        splice:[].splice
	});
    /*******dom����********/
    var traveler={
        /**
            �õ�����selector����Ԫ��
        */
        children:function(element,selector){
            return Selector(selector,element.children)
        },
        /**
            �õ������Ϸ���selector��Ԫ��
        */
        find:function(element,selector){
            return Selector(selector,element).concat(Selector(selector,[element]));
        }
    }
    for(var key in traveler){
        CLASS.prototype[key]=function(selector){
            var nodes=[];
            var _this=this;
            this._each( function(element) {
                nodes=nodes.concat(traveler[key].call(_this,element,selector));
			});
            return new CLASS(kolaArray.unique(nodes));
        }
    }
	//shortcut
    kolaArray.forEach('click,mouseover,mouseout,mouseup,mousedown,keyup,keydown,keypress'.split(','),function(name){
        CLASS.prototype[name]=function(listenerfn){
            this._each( function(element) {
				Event.on(element,name, listenerfn);
			});
        }
    });
	/********************************************** ˽�з��� **********************************************/
    /**
    �õ�Ԫ������
        Array[element] :����
        element��[element]
        kolaElement:kolaElement��_elements
        String(html):ת����element
    */
    function toElements(selector,context){
        if(Type.isArray(selector)){
            return selector;
        }
        if(Type.isString(selector)){
            //	���Ϊhtml
            var ctr = document.createElement('div');
            ctr.innerHTML = selector;
            var arr=[];
            for(var i=ctr.children.length-1;i>=0;i--){
                arr[i]=ctr.children[i];
            }
            CLASS.dispatch({type:"ElementCreate",data:arr});
            return arr;
        }
        //	���Ϊkola.html.Element
        if ( selector instanceof CLASS )
            return selector.elements();
        //	���ΪDOMLElement
        if (selector.nodeType === 1 || selector.nodeType === 9) 
            return [selector];
    }
	/**
	 * ��ȡһ�������ĳ��attribute����Ҫ��Ϊ�˽��IE����form�ڵ��ϻ�ȡattribute���Ե�����
	 */
	var attr = function(element, name) {
	
		var value = element.getAttribute(name);
		
		//todo:�Ա�Ԫ�����Եķ�װ
		if(value==null)
			value=element[name];
		if (document.all && typeof(value) == 'object' && value != null) {
			value = element.attributes.getNamedItem(name);
			return !!value ? value.value : null;
		}
		return value;
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
	
	/**
	 * ���Ի�ȡû���������Ե�Ĭ��ֵ������û������opacity����ʱcss('opactiry')  = 1, ������֧��auto
	 */
	var hyphenate = function(name) {
		return name.replace(/[A-Z]/g, function(match) {
			return '-' + match.toLowerCase();
		});
	};

	var isBody = function(tag) {
		var reg = /^body|html$/i;
		isBody = function(tag) {
			return !reg.test(tag);
		};
		isBody(tag);
	};
	
	var pagePos = function(element) {
		var left = 0,
			top = 0,
			doc = document,
			de = doc.documentElement,
			db = doc.body,
			add = function(l, t) {
				left += l || 0;
				top += t || 0;
			};
		
		if (element.getBoundingClientRect) {
			//	���ڷ���ֱ�ӻ�ȡλ�ã��Ǿ�ֱ�ӻ�ȡ֮
			
			var box = element.getBoundingClientRect();
			add(box.left + Math.max(de.scrollLeft, db.scrollLeft) - de.clientLeft,
					box.top + Math.max(de.scrollTop, db.scrollTop) - de.clientTop);
		} else {
			//	ֻ�ܽ���λ���ۼӻ�ȡ
			
			var op = element.offsetParent,
				parent = element.parentNode;
				
			add(element.offsetLeft, element.offsetTop);
			
			//	����ۼ�ÿ��offsetParent��λ��
			while (op) {
				add(op.offsetLeft, op.offsetTop);
				op = op.offsetParent;
			}

			//	ѭ������parentNode
			while (parent && parent.tagName && !isBody.test(parent.tagName) ) {
				add(-parent.scrollLeft, -parent.scrollTop);
				parent = parent.parentNode;
			}
		}
		return {left: left, top: top, x: left, y: top};
	};

	/**
	 * ��ȡ��ʽ����
	 * @param element
	 * @param name
	 */
	var style = function( element, name ) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(element, null).getPropertyValue(hyphenate(name));
		}
		if (document.defaultView && document.defaultView.getComputedStyle) {
			var computedStyle = document.defaultView.getComputedStyle(element, null);
			if (computedStyle) return computedStyle.getPropertyValue(hyphenate(name));
			if (name == "display") return "none";
		}
		if (element.currentStyle) {
			return element.currentStyle[name];
		}
		return element.style[name];
	};

	/**
	 * ���ö����innerHTML����Ҫ��Բ�ֱ��֧��innerHTML�Ķ���
	 * @param el
	 * @param value
	 */
	var innerHtml = function(el, value) {
		//	�Ƚ���������нڵ���¼��������ڴ�й¶
		clearChildsEvents( el );
		
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
			if ( tagName == 'select' && Browser.render() == 'ie' && Browser.renderVersion() < 10 ) {
				el.selectedIndex = 0;
			}
		} else {
			el.innerHTML = value;
		}

		return el.childNodes;
	};

	/**
	 * ��document���ɷ� dominsert�¼�
	 * @param elements
	 */
	var fireDomInsert = function( element ) {
		setTimeout( function() {
			Event.fire( document, 'DOMNodeInsertedIntoDocument', {
				target: element,
				currentTarget: document
			});
		}, 0 );
	};

	/* ---------------------- ����ҳ�������¼������ڱ����ڴ�й¶ ---------------------*/
	
	/**
	 * �Ƴ�ĳ���ڵ�������¼�����ѭ�����������ӽڵ㣬���ε���֮
	 */
	var clearEvent = function( node, notThis ) {
		
		//	�������������¼�
		if ( !notThis ) {
			Event.un( node );
		}
		
		//	��������ӽڵ㣬�����ж�֮
		var nodes = node.children,
			count;
		if ( nodes && ( count = nodes.length ) > 0 ) {
			for ( var i = count - 1; i >= 0; i-- ) {
				clearEvent( nodes[ i ] );
			}
		}
	};
	
	/**
	 * �Ƴ�ĳ���ڵ���������ڵ���¼�����
	 */
	var clearChildsEvents = function( element, includeThis ) {
		//	��IE������IE8�������ϰ汾������Ҫ�Ƴ������¼�
		if ( !window.ActiveXObject || window.XDomainRequest ) {
			clearChildsEvents = F.empty;
			return;
		}
		
		if ( includeThis ) {
			Event.un( element );
		}
		
		//	���֧��document.all����
		var nodes = element.all,
			count;
		if ( nodes && ( count = nodes.length ) > 0 ) {
			for ( var i = count - 1; i >= 0; i-- ) {
				Event.un( nodes[ i ] );
			}
		} else {
			clearEvent( element, true );
		}
	};

	/********************************************** ������� **********************************************/

	CLASS.__PLUGIN_CONFIG = {
		type: 'Class'
	};
	
	/********************************************** ������ **********************************************/
	//debug only
    window.K=CLASS
	return CLASS;
	
});