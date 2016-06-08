/**
 * Created by slashhuang on 16/6/9.
 */

var template=function(DOMNode,data){
    var domString = DOMNode.innerHTML;
    domString = domString.replace(/&gt;/g,'>');
    domString=domString.replace(/&lt;/g,'<');
    var tempExp = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    /**
     * 结合正则表达式直接量
     */
    var matcher = RegExp([
            tempExp.escape.source,
            tempExp.interpolate.source,
            tempExp.evaluate.source
        ].join('|') + '|$', 'g');//   <%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g
    var index = 0;
    var source = "";
    //全局变量存储函数字符串
    var _VAR='_VAR+=';
    /**
     * 仅为字符串操作，不支持js功能
     * @type {string}
     */
    domString.replace(matcher,function(match, escape, interpolate, evaluate,offset){
        var htmlString = domString.slice(index,offset).trim();
        htmlString= htmlString?'\''+htmlString+'\'':'';
        //处理换行符
        htmlString=htmlString.replace(/\n/g,'');
        if(interpolate){
            /**
             * 若为插入型数据，则默认两边都有html
             */
            source+=_VAR+htmlString+';\n';
            source+=_VAR+interpolate+';\n';
        }else if(evaluate){
            /**
             * 若为js表达式，则直接评估
             */
            source+=_VAR+htmlString+';\n';
            source+=_VAR+evaluate+";\n";
        }else{
            source+=_VAR+htmlString+';\n';
        }
        index= offset+match.length;
    });
    var finalStr= 'var _VAR="";\n'+'with(obj||{}){\n' +source+ '}\n'+ 'return _VAR;\n';
    console.log(finalStr)
    var render = new Function('obj',finalStr);
    debugger;
    DOMNode.innerHTML=render(data)
};

