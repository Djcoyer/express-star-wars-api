"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Person_1 = require("../models/Person");
let PersonService = class PersonService {
    constructor() {
        this.personStorage = [
            new Person_1.default("Luke Skywalker", "A young farmboy who was destined to be a great jedi master", 20, [], "Original Trilogy", true),
            new Person_1.default("Han Solo", "A rugged smuggler ", 30, [], "Original Trilogy", true)
        ];
    }
    getPeople() {
        return this.personStorage;
    }
};
PersonService = __decorate([
    inversify_1.injectable()
], PersonService);
exports.PersonService = PersonService;
