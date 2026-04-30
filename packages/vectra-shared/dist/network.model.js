var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GraphQLURL } from 'graphql-scalars';
export var URL_TYPE;
(function (URL_TYPE) {
    URL_TYPE["LAN"] = "LAN";
    URL_TYPE["WIREGUARD"] = "WIREGUARD";
    URL_TYPE["WAN"] = "WAN";
    URL_TYPE["MDNS"] = "MDNS";
    URL_TYPE["OTHER"] = "OTHER";
    URL_TYPE["DEFAULT"] = "DEFAULT";
})(URL_TYPE || (URL_TYPE = {}));
registerEnumType(URL_TYPE, {
    name: 'URL_TYPE',
});
/**
 * This defines the LOCAL server Access URLs - these are sent to Connect if needed to share access routes
 */
let AccessUrl = class AccessUrl {
    type;
    name;
    ipv4;
    ipv6;
};
__decorate([
    Field(() => URL_TYPE),
    IsEnum(URL_TYPE),
    __metadata("design:type", String)
], AccessUrl.prototype, "type", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsString(),
    IsOptional(),
    __metadata("design:type", Object)
], AccessUrl.prototype, "name", void 0);
__decorate([
    Field(() => GraphQLURL, { nullable: true }),
    IsOptional(),
    __metadata("design:type", Object)
], AccessUrl.prototype, "ipv4", void 0);
__decorate([
    Field(() => GraphQLURL, { nullable: true }),
    IsOptional(),
    __metadata("design:type", Object)
], AccessUrl.prototype, "ipv6", void 0);
AccessUrl = __decorate([
    ObjectType()
], AccessUrl);
export { AccessUrl };
//# sourceMappingURL=network.model.js.map