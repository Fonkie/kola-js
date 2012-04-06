/**
 * @fileOverview kola.lang.Function Function��
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.lang.Function', 
	null, 
	function() {
	
	/********************************************** �ඨ�� **********************************************/
	
	var func= {
		
		/**
		 * ��������this�Ͳ�����������Щ�������ڷ���������ʱ������Ĳ���֮ǰ
		 * @param {Function} callbackfn ���󶨵ķ���
		 * @param {ANY} thisArg ����ִ��ʱ��this
		 * @param {ANY} arg1 Ҫ�󶨵Ĳ���1
		 * @param {ANY} arg2 Ҫ�󶨵Ĳ���2
		 * @param {ANY} argN Ҫ�󶨵Ĳ���N
		 * @return �󶨹�֮����·���
		 * @type Function
		 */
		bind: function(callbackfn, thisArg) {
			var args = [];
			for (var i = 2, il = arguments.length; i < il; i ++) {
				args.push(arguments[i]); 
			}
			return function() {
				var newArgs = args.concat();
				for (var i = 0, il = arguments.length; i < il; i ++) {
					newArgs.push(arguments[i]);
				}
				return callbackfn.apply(thisArg, newArgs);
			};
		},
		
		/**
		 * ��������this�Ͳ�����������Щ�������ڷ���������ʱ������Ĳ���֮��
		 * @param {Function} callbackfn ���󶨵ķ���
		 * @param {ANY} thisArg ����ִ��ʱ��this
		 * @param {ANY} arg1 Ҫ�󶨵Ĳ���1
		 * @param {ANY} arg2 Ҫ�󶨵Ĳ���2
		 * @param {ANY} argN Ҫ�󶨵Ĳ���N
		 * @return �󶨹�֮����·���
		 * @type Function
		 */
		bindAfter: function(callbackfn, thisArg) {
			var args = [];
			for (var i = 2, il = arguments.length; i < il; i ++) {
				args.push(arguments[i]); 
			}
			return function() {
				var newArgs = args.concat();
				for (var i = arguments.length - 1; i >= 0; i --) {
					newArgs.unshift(arguments[i]);
				}
				return callbackfn.apply(thisArg, newArgs);
			};
		},

		/**
		 * �ɱ�ȫ��ʹ�õĿպ���
		 */
		empty: function() {},

		/**
		 * ����һ���·��������ڷ���ָ����һ��ֵ
		 * @param value
		 */
		x: function( value ) {
			return function() {
				return value;
			};
		}
	};
	
	return func;
	
});