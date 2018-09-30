### CP-WEB-SOURCE-PlATFORM
###### (Part of the interface diagram)部分界面图
![image](https://github.com/10086XIAOZHANG/blogImgAttr/blob/master/%E7%99%BB%E5%BD%95.gif)
![image](https://github.com/10086XIAOZHANG/blogImgAttr/blob/master/%E9%A6%96%E9%A1%B5.gif)
![image](https://github.com/10086XIAOZHANG/blogImgAttr/blob/master/%E5%8D%9A%E5%AE%A2.gif)
![image](https://github.com/10086XIAOZHANG/blogImgAttr/blob/master/app-%E4%B8%8B%E8%BD%BD%E9%A1%B5.gif)
### (Install dva-cli to initialize the project)安装 dva-cli 用于初始化项目：
  npm install -g dva-cli
  
### (Startup project)启动项目
  npm start

(CP Aggregate Blog)CP 聚合博客
## (Technology stack)技术栈
(Technology stack)：react + dva2 + redux + react-router + redux-sage
## (Characteristic)特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计(**Elegant and beautiful**: Designed based on the Ant Design system)
- :rocket: **最新技术栈**：使用 React/dva/antd 等前端前沿技术开发(**The latest technology stack**: Developed with front-end technology such as React/dva/antd)
- :1234: **Mock 数据**：实用的本地数据调试方案(这里使用阿里Rap模拟)(**Mock data**: Practical local data debugging solution (here using Ali Rap simulation))

## 模板
- [x] roadhog版本升级2.0(Roadhog version upgrade 2.0)
- [x] 项目搭建(Project construction)
- [x] 登录(log in)
- [x] 基础布局(Basic layout)
- [ ] 分析页(Analysis page)
## 使用(use)

```bash
$ cd CP-WEB-SOURCE-PlATFORM
$ npm install
$ npm start         # 访问 http://localhost:8888
```

## 兼容性(compatibility)

现代浏览器及 IE11(Modern browser and IE11)


## dva用法(Dva usage)

### dynamic

解决组件动态加载问题的 util 方法，基于 react-async-component 实现。比如：(A util method that resolves a component's dynamic loading problem, based on the react-async-component implementation. such as:)

```javascript
import dynamic from 'dva/dynamic';

const UserPageComponent = dynamic({
  app,
  models: () => [
    import('./models/users'),
  ],
  component: () => import('./routes/UserPage'),
});
```

## react-router 4.0

### exact（boolean类型）(Exact (boolean type))

如果为 true, 则仅在位置完全匹配时才应用。(If true, it is only applied when the position is exactly matched.)

```javascript
path	location.pathname	exact	matches?
/one	/one/two	        true	no
/one	/one/two	        false	yes
```

## React PureComponent

### 为什么使用？(Why use?)

React15.3中新加了一个 PureComponent 类，顾名思义， pure 是纯的意思， PureComponent 也就是纯组件，取代其前身 PureRenderMixin , PureComponent 是优化 React 应用程序最重要的方法之一，易于实施，只要把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码。(React15.3 adds a PureComponent class. As the name suggests, pure is pure. PureComponent is a pure component. Instead of its predecessor, PureRenderMixin, PureComponent is one of the most important ways to optimize React applications. It is easy to implement, just inherit the class. Switching from Component to PureComponent reduces the number of unnecessary render operations, which improves performance and saves point code by writing less the shouldComponentUpdate function.)

### 原理(principle)

当组件更新时，如果组件的 props 和 state 都没发生改变， render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层浅比较：(When the component is updated, if the props and state of the component have not changed, the render method will not be triggered, eliminating the need to generate and compare the Virtual DOM to improve performance. Specifically, React automatically did a shallow comparison for us:)

```javascript
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps)
  || !shallowEqual(inst.state, nextState);
}
````

而 shallowEqual 又做了什么呢？会比较 Object.keys(state | props) 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。(And what did shallowEqual do? Will compare the length of Object.keys(state | props), whether each key has both, and whether it is a reference, that is, only compare the value of the first layer, it is very shallow, so deep nesting The data is not comparable.)

### 使用指南(user's guidance)

#### 易变数据不能使用一个引用(Variable data cannot use a reference)

示例(Example)：

```javascript
class App extends PureComponent {
  state = {
    items: [1, 2, 3]
  }
  handleClick = () => {
    const { items } = this.state;
    items.pop();
    this.setState({ items });
  }
  render() {
    return (<div>
      <ul>
        {this.state.items.map(i => <li key={i}>{i}</li>)}
      </ul>
      <button onClick={this.handleClick}>delete</button>
    </div>)
  }
}
```

会发现，无论怎么点 delete 按钮， li 都不会变少，因为 items 用的是一个引用， shallowEqual 的结果为 true 。改正：(You will find that no matter how you click the delete button, li will not be less, because items uses a reference and the result of shallowEqual is true . correct:)

```javascript
handleClick = () => {
  const { items } = this.state;
  items.pop();
  this.setState({ items: [].concat(items) });
}
```

这样每次改变都会产生一个新的数组，也就可以 render 了。这里有一个矛盾的地方，如果没有 items.pop(); 操作，每次 items 数据并没有变，但还是 render 了，这不就很操蛋么？呵呵，数据都不变，你 setState 干嘛？(This will create a new array each time you change, and you can render it. There is a contradiction here. If there is no items.pop(); operation, every time the items data has not changed, but it is still rendered, isn't that fucking? Oh, the data is the same, what are you doing with setState?)

#### 不变数据使用一个引用(Invariant data uses a reference)

##### 子组件数据(Subcomponent data)

上面易变数据不能使用一个引用的案例中有一个点击删除操作，如果我们删除的代码这么写：(The above variable data can't be used in a reference case where there is a click delete operation, if the code we deleted is written like this:)

```javascript
handleClick = () => {
  const { items } = this.state;
  items.splice(items.length - 1, 1);
  this.setState({ items });
}
```

items 的引用也是改变的，但如果 items 里面是引用类型数据：(The reference to items is also changed, but if items are reference type data:)

```javascript
items: [{a: 1}, {a: 2}, {a: 3}]
```

这个时候(at this time)

```javascript
state.items[0] === nextState.items[0] // false
```

子组件里还是re-render了。这样就需要我们保证不变的子组件数据的引用不能改变。这个时候可以使用immutable-js函数库。(The subcomponent is still re-render. This requires us to ensure that the reference to the unchanged subcomponent data cannot be changed. This time you can use the immutable-js library.)

##### 函数属性(Function attribute)

我们在给组件传一个函数的时候，有时候总喜欢:(When we pass a function to a component, we always like it:)

```javascript
// 1
<MyInput onChange={e => this.props.update(e.target.value)} />
// 2
update(e) {
  this.props.update(e.target.value)
}
render() {
  return <MyInput onChange={this.update.bind(this)} />
}
```

由于每次 render 操作 MyInput 组件的 onChange 属性都会返回一个新的函数，由于引用不一样，所以父组件的 render 也会导致 MyInput 组件的 render ，即使没有任何改动，所以需要尽量避免这样的写法，最好这样写：(Since the onChange property of the MyInput component returns a new function each time the render operation is performed, the render of the parent component will also cause the render of the MyInput component, even if there is no change, so it is best to avoid such a way. Write this:)

```javascript
// 1,2
update = (e) => {
  this.props.update(e.target.value)
}
render() {
  return <MyInput onChange={this.update} />
}
```

##### 空对象、空数组或固定对象(Empty object, empty array, or fixed object)

有时候后台返回的数据中，数组长度为0或者对象没有属性会直接给一个 null ，这时候我们需要做一些容错：(Sometimes in the data returned by the background, the length of the array is 0 or the object has no property and will be given a null directly. At this time we need to do some fault tolerance:)

```javascript
class App extends PureComponent {
  state = {
    items: [{ name: 'test1' }, null, { name: 'test3'  }]
  }
  store = (id, value) => {
    const { items } = this.state;
    items[id]  = assign({}, items[id], { name: value });
    this.setState({ items: [].concat(items) });
  }
  render() {
    return (<div>
      <ul>
        {this.state.items.map((i, k) =>
          <Item style={{ color: 'red' }} store={this.store} key={k} id={k} data={i || {}} />)
        }
      </ul>
    </div>)
  }
}
```

当某一个子组件调用 store 函数改变了自己的那条属性，触发 render 操作，如果数据是 null 的话 data 属性每次都是一个 {}，{} ==== {} 是 false 的，这样无端的让这几个子组件重新 render 了。{ color: 'red' }也是一样。(When a subcomponent calls the store function to change its own property, the render operation is triggered. If the data is null, the data property is a {}, {} ==== {} is false, so unwarranted. Let these subcomponents be re-rendered. { color: 'red' } is the same.)

最好设置一个 defaultValue 为 {},如下：

```javascript
static defaultValue = {}
const style = { color: 'red' };
<Item style={style} store={this.store} key={k} id={k} data={i || defaultValue} />
```

### 复杂状态与简单状态不要共用一个组件(Do not share a component between a complex state and a simple state)

这点可能和 PureComponent 没多少关系，但做的不好可能会浪费很多性能，比如一个页面上面一部分是一个复杂的列表，下面是一个输入框，抽象代码：(This may not have much to do with PureComponent, but doing badly can waste a lot of performance. For example, the top part of a page is a complex list, below is an input box, abstract code:)

```javascript
change = (e) => {
  this.setState({ value: e.target.value });
}
render() {
  return (<div>
    <ul>
      {this.state.items.map((i, k) => <li key={k}> {...}</li>)}
    </ul>
    <input value={this.state.value} onChange={this.change} />
  </div>)
}
```

表单和列表其实是没有什么关联的，表单的值也可能经常变动，但它的会给列表也带来必然的 diff 操作，这是没必要的，最好是给列表抽出成一个单独的 PureComponent 组件，这样 state.items 不变的话，列表就不会重新 render 了。(Forms and lists are actually not related, the value of the form may change frequently, but it will bring the necessary diff operation to the list. This is not necessary. It is better to extract the list into a separate PureComponent component. If the state.items is unchanged, the list will not be re-rendered.)

### 与 shouldComponentUpdate 共存

如果 PureComponent 里有 shouldComponentUpdate 函数的话，直接使用 shouldComponentUpdate 的结果作为是否更新的依据，没有 shouldComponentUpdate 函数的话，才会去判断是不是 PureComponent ，是的话再去做 shallowEqual 浅比较。(If there is the shouldComponentUpdate function in PureComponent, use the result of shouldComponentUpdate directly as the basis for updating. If there is no shouldComponentUpdate function, it will judge whether it is PureComponent or not. If yes, do shallowEqual)

```javascript
// 这个变量用来控制组件是否需要更新
var shouldUpdate = true;
// inst 是组件实例
if (inst.shouldComponentUpdate) {
  shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
} else {
  if (this._compositeType === CompositeType.PureClass) {
    shouldUpdate = !shallowEqual(prevProps, nextProps) ||
      !shallowEqual(inst.state, nextState);
  }
}
```

### 老版本兼容写法(Old version compatible)

```javascript
import React { PureComponent, Component } from 'react';
class Foo extends (PureComponent || Component) {
  //...
}
```

这样在老版本的 React 里也不会挂掉。(This will not hang in the old version of React.)

### 使用immutable(Use immutable)

React15.3 中新加了一个类PureComponent，前身是 PureRenderMixin ，和 Component 基本一样，只不过会在 render 之前帮组件自动执行一次shallowEqual（浅比较），来决定是否更新组件，浅比较类似于浅复制，只会比较第一层
当我们使用了 PureComponent 作为组件基类时，如果组件的props或者state没有发生变化，就不应该重新渲染组件，这里说的 “没有发生变化”，不是指语言层面的 === 或者 ==，而是指新的 props 或者 state 不会对组件的渲染结果产生任何的影响，immutable构造了一种特殊的数据结构，把原生的值结合一系列的私有属性，创建成 ImmutableJS 类型，每次改变值，先会通过私有属性的辅助检测，然后改变对应的需要改变的私有属性和真实值，最后生成一个新的值，中间会有很多的优化(React15.3 added a new class PureComponent, formerly PureRenderMixin, which is basically the same as Component, except that it will automatically perform a shallowEqual (light comparison) on the component before the render to decide whether to update the component. Will only compare the first layer When we use PureComponent as the component base class, if the component's props or state has not changed, we should not re-render the component. Here, "no change", not the language level === or ==, It means that the new props or state will not have any effect on the rendering result of the component. Immutable constructs a special data structure, which combines the native value with a series of private properties to create an ImmutableJS type, each time changing the value. First, it will use the auxiliary detection of the private attribute, then change the corresponding private attribute and the real value that need to be changed, and finally generate a new value. There will be many optimizations in the middle.)

事例：
  class Sample extends React.PureComponent{
    
    constructor(props) {
      super(props);
      this.state = {
        name: 'Lucy',
        pet: Immutable.fromJS({
          type: 'cat',
          color: 'red',
        })
      };
    }
    
    ...
    
    change() {
      this.setState({
        name: this.refs.name.value,
        pet: this.state.pet
                .set('color', this.refs.petColor.value)
                .set('type', this.refs.petType.value)
      }); 
    }
    
    render() {
      const name = this.state.name;
      const petC = this.state.pet.get('color');
      const petT = this.state.pet.get('type');
      
      ...
  }
  ...

### 总结(summary)

PureComponent 真正起作用的，只是在一些纯展示组件上，复杂组件用了也没关系，反正 shallowEqual 那一关就过不了，不过记得 props 和 state 不能使用同一个引用哦。(PureComponent really works, but on some pure display components, it doesn't matter if the complex components are used. Anyway, the shallowEqual can't pass, but remember that props and state can't use the same reference.)

##### npm start 启动 "start": "roadhog server",
### CP聚合博客服务器端以及xAdmin管理后台——https://github.com/10086XIAOZHANG/CpWebSourcePlatform
### CP聚合博客移动端——基于React Native支持Android和iOS双平台移动端APP: https://github.com/10086XIAOZHANG/CpBlogApp/tree/master

####博客地址：[https://www.cnblogs.com/fuGuy/](https://www.cnblogs.com/fuGuy/)
