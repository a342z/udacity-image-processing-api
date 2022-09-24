"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const imagesRouter = (0, express_1.Router)();
const imagesfullPath = path_1.default.resolve('./images/full');
const imagesResizedPath = path_1.default.resolve('./images/resized');
const imagesList = ['cat'];
imagesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    console.log(params);
    if (params.filename == undefined) {
        res.send('filename param is required');
        return;
    }
    if (params.filename == '') {
        res.send('filename param cant be empty');
        return;
    }
    if (!imagesList.includes(params.filename)) {
        res.send('image was not found');
        return;
    }
    if (!params.width && !params.height) {
        res.sendFile(imagesfullPath + '/' + params.filename + '.jpg');
        return;
    }
    if (!params.width || !params.height) {
        res.send('width param and height param both are required');
        return;
    }
    if (Number(params.width) <= 0) {
        res.send('width should be a positve number');
        return;
    }
    if (Number(params.height) <= 0) {
        res.send('height should be a positve number');
        return;
    }
    if (params.height && params.width) {
        const imageResizedPath = imagesResizedPath +
            '/' +
            params.filename +
            '_resized_' +
            params.width +
            '_' +
            params.height +
            '.jpg';
        yield (0, sharp_1.default)(imagesfullPath + '/cat.jpg')
            .resize(Number(params.width), Number(params.height))
            .jpeg({ mozjpeg: true })
            .toFile(imageResizedPath);
        res.sendFile(imageResizedPath);
    }
}));
exports.default = imagesRouter;
