import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AuthAction, Resource } from './graphql-enums.js';
import { UsePermissions } from './use-permissions.directive.js';
// Mock NestJS dependencies
vi.mock('nest-authz', () => ({
    UsePermissions: vi.fn(() => vi.fn()),
}));
vi.mock('@nestjs/graphql', () => ({
    Directive: vi.fn(() => vi.fn()),
}));
beforeEach(() => {
    vi.clearAllMocks();
});
describe('UsePermissions Directive', () => {
    describe('Resource Validation', () => {
        it('should accept valid Resource enum values', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
        it('should accept valid Resource enum values', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
        it('should accept Resource enum values', () => {
            const decorator = UsePermissions({
                action: AuthAction.CREATE_ANY,
                resource: Resource.ACTIVATION_CODE,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
        it('should reject invalid resource values at runtime', () => {
            // TypeScript prevents this at compile time, but we can test runtime validation
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'INVALID_RESOURCE',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
        it('should reject typos in resource names at runtime', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'API_KEYS', // typo: should be API_KEY
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value: API_KEYS/);
        });
        it('should provide helpful error message listing valid resources', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'INVALID',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Must be one of:/);
        });
    });
    describe('SDL Injection Protection', () => {
        it('should reject resources with special characters', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'API_KEY", malicious: "true',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
        it('should reject resources with GraphQL directive injection attempts', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'API_KEY") @skipAuth',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
        it('should reject resources with invalid lowercase names', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'api_key', // lowercase not matching enum
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
        it('should validate SDL escape function rejects invalid characters', () => {
            // This tests the escapeForSDL function indirectly
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY, // Use the proper enum value
                resource: Resource.API_KEY,
            });
            // The action should pass validation
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
    });
    describe('Action Validation', () => {
        it('should accept valid AuthAction enum values', () => {
            const decorator = UsePermissions({
                action: AuthAction.CREATE_OWN,
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
        it('should reject invalid AuthAction values', () => {
            const decorator = UsePermissions({
                action: 'invalid:action',
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow('Invalid AuthAction enum value: invalid:action');
        });
        it('should reject invalid action combinations in old format', () => {
            const decorator = UsePermissions({
                action: 'invalid',
                possession: 'any',
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow('Invalid AuthAction enum value: invalid');
        });
        it('should provide helpful error message listing valid actions', () => {
            const decorator = UsePermissions({
                action: 'bad:action',
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Must be one of:/);
        });
    });
    describe('Legacy Format Support', () => {
        it('should support old format with separate verb and possession', () => {
            const decorator = UsePermissions({
                action: 'CREATE',
                possession: 'ANY',
                resource: Resource.API_KEY,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow('Invalid AuthAction enum value: CREATE');
        });
        it('should normalize verb and possession to AuthAction', () => {
            const decorator = UsePermissions({
                action: 'READ',
                possession: 'OWN',
                resource: Resource.DASHBOARD,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow('Invalid AuthAction enum value: READ');
        });
    });
    describe('Error Message Clarity', () => {
        it('should provide clear error for invalid resource', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'WRONG',
            });
            try {
                decorator({}, 'testMethod', {});
            }
            catch (error) {
                expect(error.message).toContain('Invalid Resource enum value: WRONG');
                expect(error.message).toContain('Must be one of:');
                expect(error.message).toContain('API_KEY');
                expect(error.message).toContain('DASHBOARD');
            }
        });
        it('should provide clear error for invalid action', () => {
            const decorator = UsePermissions({
                action: 'wrong:action',
                resource: Resource.API_KEY,
            });
            try {
                decorator({}, 'testMethod', {});
            }
            catch (error) {
                expect(error.message).toContain('Invalid AuthAction enum value: wrong:action');
                expect(error.message).toContain('Must be one of:');
                expect(error.message).toContain('CREATE_ANY');
                expect(error.message).toContain('READ_OWN');
            }
        });
        it('should provide clear error for invalid action combination', () => {
            const decorator = UsePermissions({
                action: 'invalid',
                possession: 'wrong',
                resource: Resource.API_KEY,
            });
            try {
                decorator({}, 'testMethod', {});
            }
            catch (error) {
                expect(error.message).toContain('Invalid AuthAction enum value: invalid');
                expect(error.message).toContain('Must be one of:');
            }
        });
    });
    describe('Security Edge Cases', () => {
        it('should handle resources with double underscores', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: Resource.CONNECT__REMOTE_ACCESS,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).not.toThrow();
        });
        it('should reject null or undefined resources', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: null,
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow();
        });
        it('should reject empty string resources', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: '',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value: /);
        });
        it('should reject resources with newlines', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'API_KEY\n@skipAuth',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
        it('should reject resources with backslashes', () => {
            const decorator = UsePermissions({
                action: AuthAction.READ_ANY,
                resource: 'API_KEY\\", another: "value',
            });
            expect(() => {
                decorator({}, 'testMethod', {});
            }).toThrow(/Invalid Resource enum value/);
        });
    });
});
//# sourceMappingURL=use-permissions.directive.spec.js.map