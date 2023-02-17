/** @description 方法参数装饰器 */
function logMethodParams() {
  return function (target: Company, methodName: string, paramsIndex: number) {
    console.log(target)

    console.log(methodName)

    console.log(paramsIndex)

    // target为Company类

    // createGroup methodName为被装饰参数的所在函数名

    // 当前被装饰参数所在函数的索引
  }
}

class Company {
  createGroup(@logMethodParams() gruopName: string) {}
  [x: string]: any
}

const ali = new Company()

ali.createGroup('xxxxxxxxxxxxxxxxx')
