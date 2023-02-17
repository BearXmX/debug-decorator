/** @description 方法装饰器 */
function logMethod(params: any) {
  return function (target: Car, methodName: string, descriptor: PropertyDescriptor) {
    console.log(target, methodName, descriptor)

    // target 为Car类

    // methodName 为被装饰的方法

    // descriptor 对象属性描述符

    /*     

    【configurable】configurable表示可配置性，它决定了是否可以用delete操作符删除属性，以及是否可以修改属性描述符的特性，默认值true

    【enumerable】enumerable表示可枚举性，它决定了是否可以用for-in循环返回该属性，默认值true

    【writable】writable表示可写性，它决定了是否可以修改属性值，默认值true

    【value】value表示属性的数据值，读取属性值的时候就是从这个位置读；写入属性值的时候新值保存在该位置。默认值undefined 

    【getter】读取属性时调用的函数。默认值为undefined。

    【setter】写入属性时调用的函数。默认值为undefined。
    
    */

    // Object.getOwnPropertyDescriptor() | Object.defineProperty() | Object.defineProperties()

    // descriptor.value为原函数

    // 我们可以在此改写move方法，原move函数体将不会执行

    descriptor.value = (params: string) => {
      console.log(params)
    }
  }
}

class Car {
  @logMethod('挂5档')
  move(...rest: any[]) {
    console.log('speed')
  }
  [x: string]: any
}

const audiR8 = new Car()

audiR8.move('move so far')
