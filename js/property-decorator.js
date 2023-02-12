var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** @description 属性装饰器 */
function logProperty(value) {
    console.log(value, 'value');
    return function (target, attr) {
        target[attr] = value;
        console.log(target, 'target');
        console.log(attr, 'attr');
    };
}
var Occupation = /** @class */ (function () {
    function Occupation() {
        this.name = '';
        this.duration = 0;
    }
    __decorate([
        logProperty('FE')
    ], Occupation.prototype, "name", void 0);
    __decorate([
        logProperty(4)
    ], Occupation.prototype, "duration", void 0);
    return Occupation;
}());
