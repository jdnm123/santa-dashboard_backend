"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elves = void 0;
const typeorm_1 = require("typeorm");
let Elves = class Elves extends typeorm_1.BaseEntity {
};
exports.Elves = Elves;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Elves.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Elves.prototype, "nameElves", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Elves.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], Elves.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 4, scale: 2 }),
    __metadata("design:type", Number)
], Elves.prototype, "stature", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100 }),
    __metadata("design:type", String)
], Elves.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Elves.prototype, "entryDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Elves.prototype, "rollId", void 0);
exports.Elves = Elves = __decorate([
    (0, typeorm_1.Entity)('elves')
], Elves);
