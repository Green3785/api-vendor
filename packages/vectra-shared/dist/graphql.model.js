var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// This file is for backend use only - contains NestJS decorators
import { Field, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { PrefixedID } from './prefixed-id-scalar.js';
// Import enums from the shared file
import { AuthAction, Resource, Role } from './graphql-enums.js';
// Re-export for convenience
export { AuthAction, Resource, Role };
let Node = class Node {
    id;
};
__decorate([
    Field(() => PrefixedID),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], Node.prototype, "id", void 0);
Node = __decorate([
    InterfaceType()
], Node);
export { Node };
registerEnumType(Resource, {
    name: 'Resource',
    description: 'Available resources for permissions',
});
registerEnumType(Role, {
    name: 'Role',
    description: 'Available roles for API keys and users',
    valuesMap: {
        ADMIN: {
            description: 'Full administrative access to all resources',
        },
        CONNECT: {
            description: 'Internal Role for Unraid Connect',
        },
        GUEST: {
            description: 'Basic read access to user profile only',
        },
        VIEWER: {
            description: 'Read-only access to all resources',
        },
    },
});
// Register AuthAction enum for GraphQL
registerEnumType(AuthAction, {
    name: 'AuthAction',
    description: 'Authentication actions with possession (e.g., create:any, read:own)',
    valuesMap: {
        CREATE_ANY: {
            description: 'Create any resource',
        },
        CREATE_OWN: {
            description: 'Create own resource',
        },
        READ_ANY: {
            description: 'Read any resource',
        },
        READ_OWN: {
            description: 'Read own resource',
        },
        UPDATE_ANY: {
            description: 'Update any resource',
        },
        UPDATE_OWN: {
            description: 'Update own resource',
        },
        DELETE_ANY: {
            description: 'Delete any resource',
        },
        DELETE_OWN: {
            description: 'Delete own resource',
        },
    },
});
//# sourceMappingURL=graphql.model.js.map