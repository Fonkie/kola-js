kola('kola.html.Properties', 
	['kola.html.ElementCore','kola.bom.Browser'],
function(KElement,Browser){
    var Properties={
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
                if(element.className.indexOf(name)==-1){
				    element.className += ' ' + name;
                }
			});
			return this;
		},
		/**
		 * �Ƴ�ָ����ʽ
		 * @param {String} name ��ʽ����
		 * @return ���ڷ���true�������ڷ���false
		 * @type Boolean
		 */
		removeClass: function(name) {
			if ( typeof( name ) != 'string' || name.length == 0 ) return this;
			this._each( function(element) {
				var str = element.className,index;
				if (str.length > 0 && (index = (str = (' ' + str + ' ')).indexOf(name)) != -1) {
					element.className = str.split(name).join(' ');
				}
			});
			return this;
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
					if (Browser.isIE) {
						return filter.indexOf("opacity=") >= 0 ? parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100 : 1;
					} else {
						return (filter = st.opacity) ? parseFloat(filter) : 1;
					}
				} else {
					return KElement.util.getComputedStyle( element, name );
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
		}
    }
    var noPx={
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	};
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
    return Properties;
});