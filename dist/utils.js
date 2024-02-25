"use strict";
// create function that randomly genrates an id for the session
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
function generate() {
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    const length = 5;
    let id = " ";
    for (let i = 0; i < length; i++) {
        id += subset[Math.floor(Math.random() * subset.length)];
    }
    return id;
}
exports.generate = generate;
