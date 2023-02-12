/** @description 属性装饰器 */
function logProperty(value: string | number) {
  console.log(value, 'value')
  return function (target: Occupation, attr: string) {
    target[attr] = value
    console.log(target, 'target')
    console.log(attr, 'attr')
  }
}

class Occupation {
  @logProperty('FE')
  name: string = ''
  @logProperty(4)
  duration: number = 0;
  [x: string]: any
}
