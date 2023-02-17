var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** @description 类装饰器1 */
function logClass1(params) {
    console.log('类装饰器1 返回函数外');
    return function (target) {
        console.log('类装饰器1 返回函数内');
    };
}
/** @description 类装饰器2 */
function logClass2(params) {
    console.log('类装饰器2 返回函数外');
    return function (target) {
        console.log('类装饰器2 返回函数内');
    };
}
/** @description 类装饰器3 */
function logClass3(params) {
    console.log('类装饰器3 返回函数外');
    return function (target) {
        console.log('类装饰器3 返回函数内');
    };
}
/** @description 属性装饰器1 */
function logParams1(params) {
    console.log('属性装饰器1');
    return function (target, paramsName) { };
}
/** @description 属性装饰器2 */
function logParams2(params) {
    console.log('属性装饰器2');
    return function (target, paramsName) { };
}
/** @description 方法装饰器1 */
function logFunc1(params) {
    console.log('方法装饰器1');
    return function (target, methodsName, descriptor) { };
}
/** @description 方法装饰器2 */
function logFunc2(params) {
    console.log('方法装饰器2');
    return function (target, methodsName, descriptor) { };
}
/** @description 方法参数装饰器1  */
function logFunParams1(params) {
    console.log('方法参数装饰器1');
    return function (target, methodsName, paramsIndex) { };
}
/** @description 方法参数装饰器2  */
function logFunParams2(params) {
    console.log('方法参数装饰器2');
    return function (target, methodsName, paramsIndex) { };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function (uid, pid) { };
    HttpClient.prototype.setData = function () { };
    __decorate([
        logParams1('logParams1')
    ], HttpClient.prototype, "apiUlr", void 0);
    __decorate([
        logParams2('logParams2')
    ], HttpClient.prototype, "apiParams", void 0);
    __decorate([
        logFunc1('logFunc1'),
        __param(0, logFunParams1('logFunParams1')), __param(1, logFunParams2('logFunParams2'))
    ], HttpClient.prototype, "getData", null);
    __decorate([
        logFunc2('logFunc2')
    ], HttpClient.prototype, "setData", null);
    HttpClient = __decorate([
        logClass1('logClass1'),
        logClass2('logClass2'),
        logClass3('logClass3')
    ], HttpClient);
    return HttpClient;
}());
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
