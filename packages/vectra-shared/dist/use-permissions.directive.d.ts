import { GraphQLDirective, GraphQLSchema } from 'graphql';
import { AuthAction, Resource } from './graphql-enums.js';
export { AuthAction, Resource };
/**
 * GraphQL Directive Definition for @usePermissions
 *
 * IMPORTANT: GraphQL directives MUST use scalar types (String, Int, Boolean) for their arguments
 * according to the GraphQL specification. This is why action and resource are defined as GraphQLString
 * even though we use enum types in TypeScript.
 *
 * Type safety is enforced at:
 * 1. Compile-time: TypeScript decorator requires AuthAction and Resource enum types
 * 2. Runtime: The decorator validates that string values match valid enum values
 *
 * The generated schema will show:
 *   directive @usePermissions(action: String, resource: String) on FIELD_DEFINITION
 *
 * But the actual usage in code requires proper enum types for type safety.
 */
export declare const UsePermissionsDirective: GraphQLDirective;
/**
 * Permissions interface for the UsePermissions decorator
 */
export interface Permissions {
    action: AuthAction;
    resource: Resource;
}
/**
 * UsePermissions Decorator
 *
 * Applies permission-based authorization to GraphQL resolvers and adds schema documentation.
 *
 * @example
 * ```typescript
 * @Query(() => [User])
 * @UsePermissions({
 *     action: AuthAction.READ_ANY,
 *     resource: Resource.USERS
 * })
 * async getUsers() { ... }
 * ```
 *
 * The decorator:
 * 1. Enforces TypeScript type safety with enum types
 * 2. Validates enum values at runtime
 * 3. Applies nest-authz authorization checks
 * 4. Adds @usePermissions directive to GraphQL schema
 *
 * Note: While the GraphQL schema shows String types for the directive,
 * TypeScript ensures only valid enum values can be used.
 */
export declare function UsePermissions(permissions: Permissions): MethodDecorator;
export declare function usePermissionsSchemaTransformer(schema: GraphQLSchema): GraphQLSchema;
