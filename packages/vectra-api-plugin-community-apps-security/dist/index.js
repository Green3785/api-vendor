var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CommunityAppsSecurityPluginModule_1;
import { Logger, Module } from '@nestjs/common';
import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
export const adapter = 'nestjs';
let CommunityAppsSecurityConfig = class CommunityAppsSecurityConfig {
    templateUrlAllowlist;
    templateFetchTimeoutMs;
    templateFetchRetryCount;
    templateCacheTtlMs;
};
__decorate([
    Field(() => [String], {
        description: 'Comma-separated allowlist from COMMUNITY_APPS_TEMPLATE_URL_ALLOWLIST (or defaults when unset). "*" allows any host.',
    }),
    __metadata("design:type", Array)
], CommunityAppsSecurityConfig.prototype, "templateUrlAllowlist", void 0);
__decorate([
    Field(() => Int, { description: 'Template fetch timeout in milliseconds.' }),
    __metadata("design:type", Number)
], CommunityAppsSecurityConfig.prototype, "templateFetchTimeoutMs", void 0);
__decorate([
    Field(() => Int, { description: 'Template fetch retry count.' }),
    __metadata("design:type", Number)
], CommunityAppsSecurityConfig.prototype, "templateFetchRetryCount", void 0);
__decorate([
    Field(() => Int, { description: 'Template XML cache TTL in milliseconds.' }),
    __metadata("design:type", Number)
], CommunityAppsSecurityConfig.prototype, "templateCacheTtlMs", void 0);
CommunityAppsSecurityConfig = __decorate([
    ObjectType()
], CommunityAppsSecurityConfig);
let CommunityAppsSecurityPluginResolver = class CommunityAppsSecurityPluginResolver {
    communityAppsSecurityConfig() {
        const allowlistRaw = (process.env.COMMUNITY_APPS_TEMPLATE_URL_ALLOWLIST || '').trim();
        const allowlist = allowlistRaw === '*'
            ? ['*']
            : allowlistRaw
                ? allowlistRaw
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                : ['raw.githubusercontent.com', 'github.com', 'gitlab.com', 'bitbucket.org'];
        const parseIntOr = (raw, fallback) => {
            const n = raw ? Number.parseInt(raw, 10) : NaN;
            return Number.isFinite(n) ? n : fallback;
        };
        return {
            templateUrlAllowlist: Array.from(new Set(allowlist)),
            templateFetchTimeoutMs: parseIntOr(process.env.COMMUNITY_APPS_TEMPLATE_FETCH_TIMEOUT_MS, 15000),
            templateFetchRetryCount: parseIntOr(process.env.COMMUNITY_APPS_TEMPLATE_FETCH_RETRY_COUNT, 2),
            templateCacheTtlMs: parseIntOr(process.env.COMMUNITY_APPS_TEMPLATE_CACHE_TTL_MS, 10 * 60 * 1000),
        };
    }
};
__decorate([
    Query(() => CommunityAppsSecurityConfig, {
        description: 'Community Apps TemplateURL risk-control configuration (from env defaults).',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", CommunityAppsSecurityConfig)
], CommunityAppsSecurityPluginResolver.prototype, "communityAppsSecurityConfig", null);
CommunityAppsSecurityPluginResolver = __decorate([
    Resolver()
], CommunityAppsSecurityPluginResolver);
let CommunityAppsSecurityPluginModule = CommunityAppsSecurityPluginModule_1 = class CommunityAppsSecurityPluginModule {
    logger = new Logger(CommunityAppsSecurityPluginModule_1.name);
    onModuleInit() {
        this.logger.log('Community Apps security plugin initialized');
    }
};
CommunityAppsSecurityPluginModule = CommunityAppsSecurityPluginModule_1 = __decorate([
    Module({
        providers: [CommunityAppsSecurityPluginResolver],
    })
], CommunityAppsSecurityPluginModule);
export const ApiModule = CommunityAppsSecurityPluginModule;
//# sourceMappingURL=index.js.map