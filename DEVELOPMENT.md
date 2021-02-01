# Framework pv-parahyba
Framework pv-parahyba is responsible for compiling the project and providing engine directives for the project, also controls state of the components.

## Create component

Create a class for the new component and extend PVComponent class like example below.
```typescript
import PVComponent from "~/pv-parahyba/extends/pv-component";
```

### Managing state of the components
All **PVComponents** works with _states_. They know the exatly moment to recompile without listening changes.
The state can be created by defining the data method and returning expected the named object with your value.

```typescript
data() => { var1: 'teste' };
```

After compilation, your object will be available through _this_.

```typescript
console.log(this.var1);
```

To change the value of your object, you only need assign the new value.

```typescript
this.var1 = 'teste de update';
```

### Component render
The components has an _constructor_ that must call `super()` function of **PVComponent** extends with `templatePath` argument, which indicates the path of component files starting from `/app/...`

```typescript
super({ componentPath: 'components/slider' })
```

### Component attributes
To create an _attribute_ for a component, you need to put the attribute on element _tag_. If you want to use state value, you will need define `:` before the _attribute_ you created where identifier the state value is the name assign to created _tag_.
```html
<slider :startups="startups"></slider>
```

### Click listeners
You can put **PVClick** to assign an click event listener to element _tag_. Where the arguments are function name and others params.

Example without function params:
```html
<button PVClick="test"></button>
```
On click event, the **test function** will be called with native JS event.

Example with function params?
```html
<button PVClick="test(1, index)"></button>
```
On click event, the **test function** will be called with 1 and index params.

### PVFor
The **PVFor** attribute can be used to control flow statement for traversing items in a collection where the first param is the element and second param is the collection.
```html
<div class="slider__slides__item" pvFor="slide in slides">
```

### PVIf
If you want to control visibility of an element the **PVIf** can be used. It's expected a value to be used as condition. In the same way, you can use `!` to deny the condition.
``html
<span pvIf="slide.data.test" >show me if slide.data.test exists</span>
<span pvIf="!slide.data.test" >show me if slide.data.test is blank</span>
```
