var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
console.log('%c----------------------↓类装饰器----------------------------', 'color:#40a9ff');
/** @description remove装饰器 */
function remove(constructor) {
    /*
      constructor: function Animal
    */
    constructor.prototype.remove = function () {
        console.log('remove');
    };
}
/** @description eat装饰器 */
function eat(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.food = 'fish';
            console.log('子类~');
            return _this;
        }
        return class_1;
    }(constructor));
}
/** @use 普通的类装饰器 => 装饰器执行顺序由上至下*/
var Animal = /** @class */ (function () {
    function Animal() {
        this.food = 'meat';
        console.log('父类~');
    }
    Animal = __decorate([
        eat,
        remove
    ], Animal);
    return Animal;
}());
var cat = new Animal();
cat.remove();
console.log(cat, 'cat');
console.log('%c----------------------↓装饰器工厂----------------------------', 'color:#40a9ff');
/** @description code装饰器 */
function code(framework) {
    return function (constructor) {
        console.log(framework, 'framework');
        constructor.prototype.framework = framework;
    };
}
/** @use 装饰器工厂 => 允许传参 => 返新函数*/
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.action = function () {
        console.log(this.framework, 'this.framework');
    };
    Person = __decorate([
        code('react'),
        remove
    ], Person);
    return Person;
}());
var bear = new Person();
bear.action();
