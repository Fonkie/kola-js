/**
 * @fileOverview kola.lang.Object Object��
 * @author flyhuang
 * @version 2.0.0
 */


kola('kola.lang.Object', 
	null, 
	function() {
	
	/********************************************** �ඨ�� **********************************************/
	
	var obj= {
		
		/**
		 * ��������Լ̳�
		 * @param {deep} �Ƿ���Ҫ��ȿ�������ѡ��
		 * @param {target} Ŀ�����
		 * @param {src} Դ����
		 * @return Ŀ�����
		 * @type Function
		 */
		extend: function() {

			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;
		
			//�Ƿ���Ҫ��ȸ��ƶ���
			if ( typeof target === "boolean" ) {
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}
		
			if ( typeof target !== "object" && !this.isFunction(target) ) {
				target = {};
			}
		
			if ( length === i ) {
				target = {};
				--i;
			}
		
			for ( ; i < length; i++ ) {
				if ( (options = arguments[ i ]) != null ) {
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						if ( target === copy ) {
							continue;
						}
		
						if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && this.isArray(src) ? src : [];
		
							} else {
								clone = src && this.isPlainObject(src) ? src : {};
							}
							target[ name ] = this.extend( deep, clone, copy );
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}
		
			return target;
    },
		/**
		 * ��������Կ���
		 * @param {obj} Ŀ�����
		 * @param {options} Դ����
		 * @return Ŀ�����
		 * @type object
		 */
    clone: function(obj) {
      var n = {};  
      for (var it in obj) {
        n[it] = obj[it];
      }
			return n;
		},
		/**
		 * ����ĵ�������
		 * @param {obj} Ŀ�����
		 * @param {options} Դ����
		 * @return Ŀ�����
		 * @type object
		 */
		each : function(object, callback, args) {
			var name, i = 0,
			length = object.length,
			isObj = length === undefined || this.isFunction(object);

			if ( args ) {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.apply( object[ name ], args ) === false ) {
							break;
						}
					}
				} else {
					for ( ; i < length; ) {
						if ( callback.apply( object[ i++ ], args ) === false ) {
							break;
						}
					}
				}
			} else {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
							break;
						}
					}
				} else {
					for ( var value = object[0];
						i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
				}
			}
	
			return object;
    },
    /*
     *@brief �ж��Ƿ�function
     */
    isFunction: function( obj ) {
			return this.type(obj) === "function";
		},
		/*
     *@brief �ж��Ƿ�function
     */
		type: function( obj ) {
			return obj == null ?
				String( obj ) :
				class2type[ this.toString.call(obj) ] || "object";
		},
		/*
		 *@brief �ж϶����Ƿ�������
		 */
		isArray: Array.isArray || function( obj ) {
			return this.type(obj) === "array";
		},
		/*
		 *@brief �ж϶����Ƿ�������
		 */
		isArray: Array.isArray || function( obj ) {
			return this.type(obj) === "array";
		},
		/*
		 *@brief �ж��Ƿ���һ��ԭ������������ɹ��캯�������Ķ���
		 */
		isPlainObject: function( obj ) {
			if ( !obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
				!this.hasOwn.call(obj, "constructor") &&
				!this.hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
	
			var key;
			for ( key in obj ) {}
	
			return key === undefined || this.hasOwn.call( obj, key );
		},		
		//�ж��Ƿ�window����
		isWindow: function( obj ) {
			return obj && typeof obj === "object" && "setInterval" in obj;
		},
		/*
		 *@brief ����ԭ������
		 */
		toString :Object.prototype.toString,
		hasOwn : Object.prototype.hasOwnProperty
		
	};
	
	var class2type={};
	
	//��ʼ��map
	obj.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	return obj;
	
});