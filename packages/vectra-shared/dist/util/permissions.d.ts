import { Resource, Role, AuthAction } from '../graphql-enums.js';
export interface ScopeConversion {
    permissions: Array<{
        resource: Resource;
        actions: AuthAction[];
    }>;
    roles: Role[];
}
/**
 * Normalize an action string to AuthAction enum value
 * Handles various input formats:
 * - Full AuthAction values: 'READ_ANY', 'CREATE_OWN'
 * - Lowercase with colon: 'read:any', 'create:own' (legacy)
 * - Simple verbs: 'read', 'create' (defaults to '_ANY')
 * - Mixed case: 'Read', 'CREATE'
 *
 * @param action - The action string to normalize
 * @param defaultPossession - Default possession if not specified ('ANY' or 'OWN')
 * @returns The normalized action as AuthAction or null if invalid
 */
export declare function parseActionToAuthAction(action: string | null | undefined, defaultPossession?: 'ANY' | 'OWN'): AuthAction | null;
/**
 * Convenience function to parse action to enum (alias for backward compatibility)
 * @deprecated Use parseActionToAuthAction instead
 */
export declare const parseActionToEnum: typeof parseActionToAuthAction;
/**
 * Parse a resource string to Resource enum
 * Handles special cases and variations
 *
 * @param resourceStr - The resource string to parse
 * @returns The Resource enum value or null if invalid
 */
export declare function parseResourceToEnum(resourceStr: string): Resource | null;
/**
 * Parse a role string to Role enum
 *
 * @param roleStr - The role string to parse
 * @returns The Role enum value or null if invalid
 */
export declare function parseRoleToEnum(roleStr: string): Role | null;
/**
 * Convert scope strings to permissions and roles
 * Scopes can be in format:
 * - "role:admin" for roles
 * - "docker:read" for resource permissions
 * - "docker:*" for all actions on a resource
 *
 * @param scopes - Array of scope strings
 * @returns Object containing parsed permissions and roles
 */
export declare function convertScopesToPermissions(scopes: string[]): ScopeConversion;
/**
 * Convert permissions and roles back to scope strings
 * Inverse of convertScopesToPermissions
 *
 * @param permissions - Array of resource/action pairs
 * @param roles - Array of roles
 * @returns Array of scope strings
 */
export declare function convertPermissionsToScopes(permissions: Array<{
    resource: Resource;
    actions: AuthAction[];
}>, roles?: Role[]): string[];
/**
 * Create a scope string from a role
 * @param role - The role to convert
 * @returns Scope string like "role:admin"
 */
export declare function roleToScope(role: Role | string): string;
/**
 * Create a scope string from resource and action
 * @param resource - The resource
 * @param action - The action (can be verb, AuthAction, or wildcard)
 * @returns Scope string like "docker:read" or "docker:*"
 */
export declare function permissionToScope(resource: Resource | string, action: string): string;
/**
 * Check if a scope string represents a role
 * @param scope - The scope string to check
 * @returns True if the scope is a role scope
 */
export declare function isRoleScope(scope: string): boolean;
/**
 * Extract the role from a role scope string
 * @param scope - The scope string like "role:admin"
 * @returns The role name or null if not a role scope
 */
export declare function getRoleFromScope(scope: string): string | null;
/**
 * Normalize an action string to AuthAction format
 * @param action - The action string to normalize
 * @returns The normalized AuthAction or null if parsing fails
 */
export declare function normalizeAction(action: string): AuthAction | null;
/**
 * Normalize legacy action formats to AuthAction enum values
 * Handles multiple formats:
 * - Simple verbs: "create", "read", "update", "delete" -> AuthAction.CREATE_ANY, etc.
 * - Uppercase with underscore: "CREATE_ANY", "READ_ANY" -> AuthAction.CREATE_ANY, etc.
 * - Already correct: "create:any", "read:any" -> AuthAction.CREATE_ANY, etc.
 *
 * @param action - The action string to normalize
 * @returns The normalized AuthAction enum value or null if invalid
 */
export declare function normalizeLegacyAction(action: string): AuthAction | null;
/**
 * Normalize an array of legacy action strings to AuthAction enum values
 * Filters out any invalid actions that can't be normalized
 *
 * @param actions - Array of action strings in various formats
 * @returns Array of valid AuthAction enum values
 */
export declare function normalizeLegacyActions(actions: string[]): AuthAction[];
/**
 * Expand wildcard action (*) to all CRUD actions
 * @returns Array of all CRUD AuthAction values
 */
export declare function expandWildcardAction(): AuthAction[];
/**
 * Reconcile wildcard permissions by expanding them to all resources
 * @param permissionsWithSets - Map of resources to action sets, may include wildcard resource
 */
export declare function reconcileWildcardPermissions(permissionsWithSets: Map<Resource | '*', Set<AuthAction>>): void;
/**
 * Merge permissions from source map into target map
 * @param targetMap - Map to merge permissions into
 * @param sourceMap - Map to merge permissions from
 */
export declare function mergePermissionsIntoMap(targetMap: Map<Resource, Set<AuthAction>>, sourceMap: Map<Resource, AuthAction[]>): void;
/**
 * Convert permission sets to arrays, filtering out wildcards
 * @param permissionsWithSets - Map of resources to action sets
 * @returns Map of resources to action arrays (excludes wildcard resource)
 */
export declare function convertPermissionSetsToArrays(permissionsWithSets: Map<Resource | '*', Set<AuthAction>>): Map<Resource, AuthAction[]>;
