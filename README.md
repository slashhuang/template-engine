# template-engine
> 实践DOM层面和V-DOM层面模板引擎

### Dom level
1. 正则表达式+new Function()【启发自underscore的template操作】

> template-demo.html为string层面处理的模板引擎，支持JS表达式和函数表达式。
```html
    <div id="temp">
        <div>这是一个普通的html:<p>it is an  html</p></div>
        <div>这是一段JS三目运算符结果:<%=boolean?'true':'false'%></div>
        <div>
            这是数据对象中的方法操作结果:<p><%joinData()%></p>
        </div>
        <div>
            数组中第二个数字为
            <p><%data[1]%></p>
        </div>
    </div>
    <!--引入自定义模板引擎-->
    <script src="js/template.js"></script>
    <script>
        var data = {
            'boolean':true,
            'data':[
                'a',
                'b',
                'c'
            ],
            joinData:function(){
                return this.data.join('')
            }
        };
        var targetNode = document.getElementById('temp');
        template(targetNode,data);
    </script>
```

###### 上述代码的执行结果为
```html
    <div id="temp"><div>这是一个普通的html:<p>it is an  html</p></div>    
    <div>这是一段JS三目运算符结果:true</div>    
    <div>这是数据对象中的方法操作结果:
        <p>abc</p>    
        </div>    
    <div>        
    数组中第二个数字为        
    <p>b</p>    
    </div></div>
```
