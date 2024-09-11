"use strict";
// "use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteProduct = exports.toggleProductAvailability = exports.updateProduct = exports.addProduct = void 0;
// import db from "@/src/db/db";
// import { z } from "zod";
// import fs from "fs/promises";
// import { notFound, redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// const fileSchema = z.instanceof(File, { message: "Required" });
// const imageSchema = fileSchema.refine(
//   (file) => file.size === 0 || file.type.startsWith("image/")
// );
// const addSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   priceInCents: z.coerce.number().int().min(1),
//   categoryId: z.string().min(1),
//   file: fileSchema.refine((file) => file.size > 0, "Required"),
//   image: imageSchema.refine((file) => file.size > 0, "Required"),
// });
// export async function addProduct(prevState: unknown, formData: FormData) {
//   const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }
//   const data = result.data;
//   await fs.mkdir("products", { recursive: true });
//   const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
//   await fs.mkdir("public/products", { recursive: true });
//   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//   await fs.writeFile(
//     `public${imagePath}`,
//     Buffer.from(await data.image.arrayBuffer())
//   );
//   await db.product.create({
//     data: {
//       isAvailableForPurchase: false,
//       name: data.name,
//       description: data.description,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//       category: { connect: { id: data.categoryId } },
//     },
//   });
//   revalidatePath("/");
//   revalidatePath("/products");
//   redirect("/admin/products");
// }
// const editSchema = addSchema.extend({
//   file: fileSchema.optional(),
//   image: imageSchema.optional(),
// });
// export async function updateProduct(
//   id: string,
//   prevState: unknown,
//   formData: FormData
// ) {
//   const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }
//   const data = result.data;
//   const product = await db.product.findUnique({ where: { id } });
//   if (product == null) return notFound();
//   let filePath = product.filePath;
//   if (data.file != null && data.file.size > 0) {
//     await fs.unlink(product.filePath);
//     filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//     await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
//   }
//   let imagePath = product.imagePath;
//   if (data.image != null && data.image.size > 0) {
//     await fs.unlink(`public${product.imagePath}`);
//     const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//     await fs.writeFile(
//       `public${imagePath}`,
//       Buffer.from(await data.image.arrayBuffer())
//     );
//   }
//   await db.product.update({
//     where: { id },
//     data: {
//       name: data.name,
//       description: data.description,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//       category: { connect: { id: data.categoryId } },
//     },
//   });
//   revalidatePath("/");
//   revalidatePath("/products");
//   redirect("/admin/products");
// }
// export async function toggleProductAvailability(
//   id: string,
//   isAvailableForPurchase: boolean
// ) {
//   await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
//   revalidatePath("/");
//   revalidatePath("/products");
// }
// export async function deleteProduct(id: string) {
//   const product = await db.product.delete({ where: { id } });
//   if (product == null) return notFound();
//   await fs.unlink(product.filePath);
//   await fs.unlink(`public${product.imagePath}`);
//   revalidatePath("/");
//   revalidatePath("/products");
// }
var client_s3_1 = require("@aws-sdk/client-s3");
var lib_storage_1 = require("@aws-sdk/lib-storage");
var db_1 = require("@/src/db/db");
var zod_1 = require("zod");
var navigation_1 = require("next/navigation");
var cache_1 = require("next/cache");
var s3Client = new client_s3_1.S3({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
});
var fileSchema = zod_1.z["instanceof"](File, { message: "Required" });
var imageSchema = fileSchema.refine(function (file) { return file.size === 0 || file.type.startsWith("image/"); });
var addSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    priceInCents: zod_1.z.coerce.number().int().min(1),
    categoryId: zod_1.z.string().min(1),
    image: imageSchema.refine(function (file) { return file.size > 0; }, "Required")
});
function uploadToSpaces(file, key) {
    return __awaiter(this, void 0, void 0, function () {
        var upload, _a, _b, _c, _d, _e, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = lib_storage_1.Upload.bind;
                    _b = {
                        client: s3Client
                    };
                    _c = {
                        Bucket: process.env.DO_SPACES_BUCKET,
                        Key: key
                    };
                    _e = (_d = Buffer).from;
                    return [4 /*yield*/, file.arrayBuffer()];
                case 1:
                    upload = new (_a.apply(lib_storage_1.Upload, [void 0, (_b.params = (_c.Body = _e.apply(_d, [_f.sent()]),
                            _c.ACL = "public-read",
                            _c),
                            _b)]))();
                    return [4 /*yield*/, upload.done()];
                case 2:
                    result = _f.sent();
                    return [2 /*return*/, result.Location];
            }
        });
    });
}
function addProduct(prevState, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, imagePath, imageUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = addSchema.safeParse(Object.fromEntries(formData.entries()));
                    if (result.success === false) {
                        return [2 /*return*/, result.error.formErrors.fieldErrors];
                    }
                    data = result.data;
                    imagePath = "products/" + crypto.randomUUID() + "-" + data.image.name;
                    return [4 /*yield*/, uploadToSpaces(data.image, imagePath)];
                case 1:
                    imageUrl = _a.sent();
                    return [4 /*yield*/, db_1["default"].product.create({
                            data: {
                                isAvailableForPurchase: false,
                                name: data.name,
                                description: data.description,
                                priceInCents: data.priceInCents,
                                imagePath: imageUrl,
                                category: { connect: { id: data.categoryId } }
                            }
                        })];
                case 2:
                    _a.sent();
                    cache_1.revalidatePath("/");
                    cache_1.revalidatePath("/products");
                    navigation_1.redirect("/admin/products");
                    return [2 /*return*/];
            }
        });
    });
}
exports.addProduct = addProduct;
var editSchema = addSchema.extend({
    image: imageSchema.optional()
});
function updateProduct(id, prevState, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, product, imagePath, newImagePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = editSchema.safeParse(Object.fromEntries(formData.entries()));
                    if (result.success === false) {
                        return [2 /*return*/, result.error.formErrors.fieldErrors];
                    }
                    data = result.data;
                    return [4 /*yield*/, db_1["default"].product.findUnique({ where: { id: id } })];
                case 1:
                    product = _a.sent();
                    if (product == null)
                        return [2 /*return*/, navigation_1.notFound()];
                    imagePath = product.imagePath;
                    if (!(data.image != null && data.image.size > 0)) return [3 /*break*/, 3];
                    newImagePath = "products/" + crypto.randomUUID() + "-" + data.image.name;
                    return [4 /*yield*/, uploadToSpaces(data.image, newImagePath)];
                case 2:
                    imagePath = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, db_1["default"].product.update({
                        where: { id: id },
                        data: {
                            name: data.name,
                            description: data.description,
                            priceInCents: data.priceInCents,
                            imagePath: imagePath,
                            category: { connect: { id: data.categoryId } }
                        }
                    })];
                case 4:
                    _a.sent();
                    cache_1.revalidatePath("/");
                    cache_1.revalidatePath("/products");
                    navigation_1.redirect("/admin/products");
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateProduct = updateProduct;
function toggleProductAvailability(id, isAvailableForPurchase) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1["default"].product.update({ where: { id: id }, data: { isAvailableForPurchase: isAvailableForPurchase } })];
                case 1:
                    _a.sent();
                    cache_1.revalidatePath("/");
                    cache_1.revalidatePath("/products");
                    return [2 /*return*/];
            }
        });
    });
}
exports.toggleProductAvailability = toggleProductAvailability;
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1["default"].product["delete"]({ where: { id: id } })];
                case 1:
                    product = _a.sent();
                    if (product == null)
                        return [2 /*return*/, navigation_1.notFound()];
                    // Optionally, delete the image from DigitalOcean Spaces
                    // This step is not always necessary, depending on your requirements
                    cache_1.revalidatePath("/");
                    cache_1.revalidatePath("/products");
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteProduct = deleteProduct;
