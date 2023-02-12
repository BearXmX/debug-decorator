console.log('%c----------------------↓类装饰器----------------------------', 'color:#40a9ff')

type newFunc = new (...arg: any[]) => {}

/** @description remove装饰器 */
function remove(constructor: newFunc) {
  /* 
    constructor: function Animal
  */
  constructor.prototype.remove = function () {
    console.log('remove')
  }
}

/** @description eat装饰器 */
function eat(constructor: newFunc) {
  return class extends constructor {
    constructor() {
      super()
      console.log('子类~')
    }
    food = 'fish'
  }
}

/** @use 普通的类装饰器 => 装饰器执行顺序由上至下*/
@eat
@remove
class Animal {
  food: string | undefined = 'meat'
  constructor() {
    console.log('父类~')
  }
  [x: string]: any
}

const cat = new Animal()

cat.remove()

console.log(cat, 'cat')

console.log('%c----------------------↓装饰器工厂----------------------------', 'color:#40a9ff')

/** @description code装饰器 */
function code(framework: 'vue' | 'react' | 'angular') {
  return function (constructor: newFunc) {
    console.log(framework, 'framework')
    constructor.prototype.framework = framework
  }
}

/** @use 装饰器工厂 => 允许传参 => 返新函数*/
@code('react')
@remove
class Person {
  constructor() {}

  action() {
    console.log(this.framework, 'this.framework')
  }

  [x: string]: any
}

const bear = new Person()

bear.action()
