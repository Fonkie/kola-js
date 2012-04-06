/**
 * @fileOverview kola.lang.Class ����֧����
 * @author Jady Yang
 * @version 2.0.0
 */

kola('kola.lang.Class',
	null,
	function() {

	/********************************************** �ඨ�� **********************************************/

	return {

		/**
		 * ����һ�����࣬����ָ���ĸ���̳У������ñ���ķ���
		 * @param {Function} SuperClass ����
		 * @param {Object} Methods ����ķ����б�
		 * @return �´�������
		 * @type Function
		 */
		/**
		 * ����һ�����࣬�����ñ���ķ���
		 * @param {Object} Methods ����ķ����б�
		 * @param {Object} flag Ĭ�ϲ�ִ�й��캯��
		 * @return �´�������
		 * @type Function
		 */
		create: function( SuperClass, Methods ) {
			//	�ж��Ƿ����Ҫ�̳еĸ���
			if ( typeof(Methods) == 'undefined' ) {
				Methods = SuperClass;
				SuperClass = null;
			}

			var SubClass;

			//	�ж��Ƿ���ڷ���ֱ����
			var me = Methods.__ME;
			if ( me ) {
				//	���ڷ���ֱ����

				//	�ṩ�ܹ�ʶ�����ֵ���ģʽ�ķ���������
				SubClass = function() {

					//	�����ʶ���������֣���˵����̳���ϵ����������
					var i = this.__I;
					if ( typeof( i ) != 'number' || i !== 0) {
						//	ֱ�ӵ��÷�ʽ
						return me.apply( SubClass, arguments );
					} else {
						this.constructor = SubClass;
						this.__I = 1;
						//	�����෽ʽ
						this._init.apply( this, arguments );
						this.__I = 4;
					}
				};
			} else {
				//	��������ķ���
				SubClass = function() {
					this.constructor = SubClass;
					this._init.apply(this, arguments);
				};
			}
			
			//	�����캯�����Ӹ������id
			SubClass._super = SuperClass || null;

			//	����ϵͳ��ʶ��
			SubClass.__CLASS = true;		//	��ʶ���Ǹ��࣬����������Ҫ�滻���������

			var agencyInstance;
			if ( SuperClass == null ) {
				//	�����ڸ���Ļ�
				agencyInstance = Methods;
			} else {
				//	���ڸ���Ļ����Ǿʹ���һ���м�Ļ�����
				
				var AgencyClass = function() {};
				AgencyClass.prototype = SuperClass.prototype;
				agencyInstance = new AgencyClass();
				for ( var item in Methods ) {
					agencyInstance[item] = Methods[item];
				}
			}

			//	������ʵ����ʶ��
			agencyInstance.__I = 0;

			SubClass.prototype = agencyInstance;		//	���������ԭ��
            // ������ľ�̬������ֻ�б���¼�ڰ��ģ�
            if(SuperClass && SuperClass.__GENE){
                for(var i=0,il=SuperClass.__GENE.length;i<il;i++){
                    SubClass[SuperClass.__GENE[i]]=SuperClass[SuperClass.__GENE[i]]
                }
            }
			return SubClass;
		},

		/**
		 * �ж�һ��ʵ���Ƿ���ĳ������
		 * @param object
		 * @param type
		 */
		isInstance: function( object, type ) {

			//	���������Ҫ����ʵ������Ҫ����
			if ( !object ) {
				throw new Error( 'Ҫ����ʵ��������' );
				return;
			}

			//	�ж�Ҫ����ʾ���Ƿ���ڹ������������ڵĻ�ֱ�ӷ���false
			var constructor = object.constructor, className;
			while ( constructor ) {

				//	�����������ԭ���д���__CLASS���ԣ�����������Ҫ�������ͣ��Ǿͷ���true
				if ( typeof( className = constructor.__CLASS) == 'string' && className === type ) return true;

				//	�ҵ����࣬�����ж�
				constructor = constructor._super;
			}

			//	ִ�е����������ʵ������ָ�������͵�ʵ��
			return false;
		}
	};
});