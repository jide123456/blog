/**
 * oueline
 *
 * @explain		获取所有的标题(h1~h6), 返回ul层层嵌套的大纲dom结构
 * @params		selector|String			选择器
 * @return		String					大纲html
*/

export function outline (selector) {

	// 标题数组
	const heading = Array.prototype.slice.call(document.querySelectorAll(selector))

	let
		// ul组数
		uls = [document.createElement('ul')],

		// 当前ul项的索引
		curIndex = 0,

		// 当前标题的等级
		// 例如h5就是5
		curLevel,

		// 上个元素的等级
		lastLevel,

		// 当前元素与上个元素的等级差
		tier,

		li, a

	while (heading.length) {
		step(heading.shift())
	}

	return uls[0].outerHTML

	function step (el) {
		curLevel = el.nodeName.substring(1)
		tier = curLevel - lastLevel
		li = document.createElement('li')
		a = document.createElement('a')

		a.href = `#${el.getAttribute('id')}`
		a.innerText = el.innerText

		li.appendChild(a)

		/*
		 * 比较当前元素与前一个元素的关系
		 * 通过他们的等级差
		*/
		if (tier > 0) {
			/*
			 * 父元素 - 子元素
			*/

			// 创建新的ul元素
			let ul = document.createElement('ul')

			// 将li添加到新ul里
			ul.appendChild(li)

			// 将ul元素添加到当前ul项的最后一个li元素里
			uls[curIndex].lastChild.appendChild(ul)

			// 将ul添加到uls数组里，并自增当前索引
			uls[++curIndex] = ul

		} else if (tier < 0) {
			/*
			 * 子元素 - 父元素
			*/

			//　如果当前元素处于根层级 (处于第一个ul里)
			if ( (curIndex - Math.abs(tier) ) === 0) {
				uls[0].appendChild(li)
				curIndex = 0
			} else {
				curIndex -= Math.abs(tier)
				uls[curIndex].appendChild(li)
			}
		} else {
			/*
			 * 同级元素
			*/

			// 同级元素直接添加
			uls[curIndex].appendChild(li)
		}
	}
}




/**
 * untie
 *
 * @explain		transform Object['attr.childAttr'] => Object['attr']['childAttr']
 * @params		target|Object			目标对象
 * @params		attr|String				属性名
 * @return		Any						属性值
*/

export function untie (target, attr) {
	const attrAry = attr.split('.')

	let temp

	if (attrAry.length === 1) {
		temp = target[attrAry[0]]
	} else {
		temp = target[attrAry.shift()]
		while (attrAry.length) {
			temp = temp[attrAry.shift()]
		}
	}

	return temp
}