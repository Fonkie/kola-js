/**
 * @fileOverview kola.lang.Array ������
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.lang.Array', 
	null, 
	function() {

	/********************************************** �ඨ�� **********************************************/
	
	var A = {
		
		/**
		 * ������������ָ��Ԫ�ص�λ�ã�����������ʼλ��
		 * @param {Array} array ������������
		 * @param {String} searchElement Ҫ������Ԫ��
		 * @param {Number} fromIndex ��ʼλ�á�����������ֵĻ������ʾ��0��ʼ������Ǹ������Ǿͱ�ʾ�ӵ����ڼ�����ʼ��
		 * @return ��������λ�ã����û���򷵻�-1
		 * @type Number
		 */
		indexOf: function(array, searchElement, fromIndex) {
			//	�������ԭ���ķ������Ǿ�ֱ�ӵ���֮
			if (array.indexOf) return array.indexOf(searchElement, fromIndex);
			
			//	������鳤��Ϊ0���Ǿͷ���-1
			var length = array.length;
			if (length == 0) return -1;
			
			//	�õ���ʼλ��
			var start = typeof(fromIndex) == 'number' ? fromIndex : 0,
				absStart = start >= 0 ? start : Math.max(length + start, 0);
			
			//	�����ʼλ�ô������鳤�ȣ��Ǿͷ���-1
			if (absStart >= length) return -1;
			
			//	����ʼλ�ÿ�ʼ��Ѱ��Ԫ��
			for (var i = absStart, il = array.length; i < il; i ++) {
				if (array[i] === searchElement) return i;
			}
			return -1;
		},
        /**
            �����ų��ظ�Ԫ��
        */
		unique:function(array){
            var flag=false;
            var le=array.length;
            for(var i=0;i<le;i++){
                for(j=i+1;j<le;j++){
                    if(array[i]===array[j]){
                        array[j]=null;
                        flag=true;
                    }
                }
            }
            if(flag){
                var top=0;
                for(var i=0;le;i++){
                    if(array[i]!==null)
                        array[top++]=array[i];
                }
                array.splice(top,le-top);
            }
            return array;
        },
		/**
		 * �������дӺ���ǰ����ָ��Ԫ�ص�λ�ã�����������ʼλ��
		 * @param {Array} array ������������
		 * @param {String} searchElement Ҫ������Ԫ��
		 * @param {Number} fromIndex ��ʼλ�á�����������ֵĻ������ʾ��0��ʼ������Ǹ������Ǿͱ�ʾ�ӵ����ڼ�����ʼ��
		 * @return ��������λ�ã����û���򷵻�-1
		 * @type Number
		 */
		lastIndexOf: function(array, searchElement, fromIndex) {
			//	�������ԭ���ķ������Ǿ�ֱ�ӵ���֮
			if (array.lastIndexOf) return array.lastIndexOf(searchElement, fromIndex);
			
			//	������鳤��Ϊ0���Ǿͷ���-1
			var length = array.length;
			if (length == 0) return -1;
			
			//	�õ���ʼλ��
			var start = typeof(fromIndex) == 'number' ? fromIndex : length - 1,
				absStart = start >= 0 ? start : Math.max(length + start, 0);
			
			//	�����ʼλ�ô������鳤�ȣ��Ǿͷ���-1
			if (absStart >= length) return -1;
			
			//	����ʼλ�ÿ�ʼ��Ѱ��Ԫ��
			for (var i = absStart; i >= 0; i --) {
				if (array[i] === searchElement) return i;
			}
			return -1;
		},
        /**
            ɾ�������е�ĳ��Ԫ��
        */
		remove:function(arr,item){
            var i=A.indexOf(arr,item);
            if(i!=-1)
                arr.splice(i,1);
        },
		/**
		 * ѭ�������е�ÿһ����ν�����������ȷ�����еķ���ֵ����true���Ż᷵��true�������������false
		 * @param {Array} array Ҫѭ��������
		 * @param {Function} callbackfn ������
		 * @param {ANY} thisArg �����������õ������ġ���������ڵĻ����Ǿ���undefined
		 * @return ����ֵ
		 * @type Boolean
		 */
		every: function(array, callbackfn, thisArg) {
			return each(array, 'every', function(item, i, array) {
				if (callbackfn.call(thisArg, item, i, array) == false) return $break;
			});
		},
		
		/**
		 * ѭ�������е�ÿһ����ν�����������������ڷ���ֵΪtrue���Ǿͷ���true�������������false
		 * @param {Array} array Ҫѭ��������
		 * @param {Function} callbackfn ������
		 * @param {ANY} thisArg �����������õ������ġ���������ڵĻ����Ǿ���undefined
		 * @return ����ֵ
		 * @type Boolean
		 */
		some: function(array, callbackfn, thisArg) {
			return !each(array, 'some', function(item, i, array) {
				if (callbackfn.call(thisArg, item, i, array) == true) return $break;
			});
		},
		
		/**
		 * �������дӺ���ǰ����ָ��Ԫ�ص�λ�ã�����������ʼλ��
		 * @param {Array} array Ҫѭ��������
		 * @param {Function} callbackfn ������
		 * @param {ANY} thisArg �����������õ������ġ���������ڵĻ����Ǿ���undefined
		 */
		forEach: function(array, callbackfn, thisArg) {
			each(array, 'forEach', function(item, i, array) {
				callbackfn.call(thisArg, item, i, array);
			});
		},
		
		/**
		 * ѭ�������е�ÿһ����ν������������õ���ÿ������ֵ������װ��õ�һ��������
		 * @param {Array} array Ҫѭ��������
		 * @param {Function} callbackfn ������
		 * @param {ANY} thisArg �����������õ������ġ���������ڵĻ����Ǿ���undefined
		 * @return ����ֵ
		 * @type Boolean
		 */
		map: function(array, callbackfn, thisArg) {
			var values = ArrayOrg(array.length);
			each(array, 'some', function(item, i, array) {
				values[i] = callbackfn.call(thisArg, item, i, array);
			});
			return values;
		},
		
		/**
		 * ѭ�������е�ÿһ����ν������������������ֵΪtrue���Ǿͽ�����洢��һ����������
		 * @param {Array} array Ҫѭ��������
		 * @param {Function} callbackfn ������
		 * @param {ANY} thisArg �����������õ������ġ���������ڵĻ����Ǿ���undefined
		 * @return ����ֵ
		 * @type Boolean
		 */
		filter: function(array, callbackfn, thisArg) {
			var values = [];
			each(array, 'filter', function(item, i, array) {
				if(callbackfn.call(thisArg, item, i, array) == true) {
					values.push(item);
				}
			});
			return values;
		}
		
	};
	
	/********************************************** ˽�б��� **********************************************/
	
	var ArrayOrg = [].constructor,			//	�洢ԭ����Array����
		$break = {};
	
	/********************************************** ˽�з��� **********************************************/
		
	/**
	 * ѭ�������е�ÿһ����ν������������������û�б��жϣ��Ǿͷ���true�����򷵻�false
	 * @param {Array} array Ҫѭ��������
	 * @param {Function} fn Ҫ��������õķ���������
	 * @param {Function} callbackfn ������
	 * @return ����ֵ
	 * @type Boolean
	 */
	var each = function(array, fn, callbackfn) {
		//	�������ԭ���ķ������Ǿ�ֱ�ӵ���֮
		if (array[fn]) return array[fn](callbackfn);
		
		//	ѭ�������е�ÿ������δ���������
		for (var i = 0, il = array.length; i < il; i ++) {
			if (array.hasOwnProperty(i.toString())) {
				if (callbackfn(array[i], i, array) == $break) return false;
			}
		}
		return true;
	};
	
	/********************************************** ������ **********************************************/
	
	return A;
	
});