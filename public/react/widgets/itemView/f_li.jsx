/**

itemView
放回 li 结构, 用于modules/list 调用，作为ul/li部分
*/

var libs = require('libs/libs');
var ItemMixin = require('mixins/item')
var dealWithDataMethod = require('./_common/itemDealWithData')

var fox = React.createClass({
	mixins: [ItemMixin],
	componentDidMount: function () {},

	dealWithData: dealWithDataMethod,

	render: function () {
		var resault = this.dealWithData();
		var k1 = resault.k1,
		v1 = resault.v1,
		k2 = resault.k2,
		v2 = resault.v2,
		clsName = resault.clsName,
		sty = resault.sty,
		fill = resault.fill;

		//idf ： 每一个元素的index
		return (
            <li data-idf={this.props.idf} data-id={k1}  data-cls={v2} className=
				{
					(function(){
							if(v2&&v2==='second'){
								return clsName+' active'
							}else{
								return clsName
							}
					})()
				} style={sty}>
				{fill}
            </li>
	) }

});

module.exports = fox;
