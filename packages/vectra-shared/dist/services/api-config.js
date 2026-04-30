var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "@nestjs/graphql";
import { IsString, IsArray, IsOptional, IsBoolean } from "class-validator";
let ApiConfig = class ApiConfig {
    version;
    extraOrigins;
    sandbox;
    ssoSubIds;
    plugins;
};
__decorate([
    Field(),
    IsString(),
    __metadata("design:type", String)
], ApiConfig.prototype, "version", void 0);
__decorate([
    Field(() => [String]),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ApiConfig.prototype, "extraOrigins", void 0);
__decorate([
    Field({ nullable: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ApiConfig.prototype, "sandbox", void 0);
__decorate([
    Field(() => [String]),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ApiConfig.prototype, "ssoSubIds", void 0);
__decorate([
    Field(() => [String]),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ApiConfig.prototype, "plugins", void 0);
ApiConfig = __decorate([
    ObjectType()
], ApiConfig);
export { ApiConfig };
//# sourceMappingURL=api-config.js.map