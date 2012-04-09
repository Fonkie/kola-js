kola('kola.html.Display', 
	['kola.html.ElementCore'],
function(KElement){
    var Display={
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
						var left = KElement.util.getComputedStyle( element, 'left' );
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
						var top = KElement.util.getComputedStyle( element, 'top' );
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
		}
    }
    return Display;
});