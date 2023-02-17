/** @description 类装饰器1 */
function logClass1(params: string) {
  console.log('类装饰器1 返回函数外')
  return function (target: newFunc) {
    console.log('类装饰器1 返回函数内')
  }
}

/** @description 类装饰器2 */
function logClass2(params: string) {
  console.log('类装饰器2 返回函数外')
  return function (target: newFunc) {
    console.log('类装饰器2 返回函数内')
  }
}

/** @description 类装饰器3 */
function logClass3(params: string) {
  console.log('类装饰器3 返回函数外')
  return function (target: newFunc) {
    console.log('类装饰器3 返回函数内')
  }
}

/** @description 属性装饰器1 */
function logParams1(params: string) {
  console.log('属性装饰器1')
  return function (target: HttpClient, paramsName: string) {}
}

/** @description 属性装饰器2 */
function logParams2(params: string) {
  console.log('属性装饰器2')
  return function (target: HttpClient, paramsName: string) {}
}

/** @description 方法装饰器1 */
function logFunc1(params: string) {
  console.log('方法装饰器1')
  return function (target: HttpClient, methodsName: string, descriptor: PropertyDescriptor) {}
}

/** @description 方法装饰器2 */
function logFunc2(params: string) {
  console.log('方法装饰器2')
  return function (target: HttpClient, methodsName: string, descriptor: PropertyDescriptor) {}
}

/** @description 方法参数装饰器1  */
function logFunParams1(params: string) {
  console.log('方法参数装饰器1')
  return function (target: HttpClient, methodsName: string, paramsIndex: number) {}
}

/** @description 方法参数装饰器2  */
function logFunParams2(params: string) {
  console.log('方法参数装饰器2')
  return function (target: HttpClient, methodsName: string, paramsIndex: number) {}
}

@logClass1('logClass1')
@logClass2('logClass2')
@logClass3('logClass3')
class HttpClient {
  @logParams1('logParams1')
  public apiUlr: string | undefined

  @logParams2('logParams2')
  public apiParams: string | undefined

  @logFunc1('logFunc1')
  getData(@logFunParams1('logFunParams1') uid: string, @logFunParams2('logFunParams2') pid: string) {}

  @logFunc2('logFunc2')
  setData() {}
}

// 从类内部从上 => 下执行 再执行外部的类装饰器

// 属性装饰器1
// 属性装饰器2
// 方法装饰器1
// 方法参数装饰器1
// 方法参数装饰器2
// 方法装饰器2
// 类装饰器1 返回函数外
// 类装饰器2 返回函数外
// 类装饰器3 返回函数外
// 类装饰器3 返回函数内
// 类装饰器2 返回函数内
// 类装饰器1 返回函数内
