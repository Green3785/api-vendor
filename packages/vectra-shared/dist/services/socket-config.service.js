var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Shared service for socket detection and address resolution.
 * Used by InternalGraphQLClientFactory and other services that need socket configuration.
 */
let SocketConfigService = class SocketConfigService {
    configService;
    PROD_NGINX_PORT = 80;
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * Get the nginx port from configuration
     */
    getNginxPort() {
        const port = Number(this.configService.get('store.emhttp.nginx.httpPort', this.PROD_NGINX_PORT));
        // Validate the numeric result and fall back to PROD_NGINX_PORT if invalid
        if (!Number.isFinite(port) || port <= 0 || port > 65535) {
            return this.PROD_NGINX_PORT;
        }
        return port;
    }
    /**
     * Check if the API is running on a Unix socket
     */
    isRunningOnSocket() {
        const port = this.configService.get('PORT', '/var/run/vectra-api.sock');
        return port.includes('.sock');
    }
    /**
     * Get the socket path from config
     */
    getSocketPath() {
        return this.configService.get('PORT', '/var/run/vectra-api.sock');
    }
    /**
     * Get the numeric port if not running on socket
     */
    getNumericPort() {
        const port = this.configService.get('PORT', '/var/run/vectra-api.sock');
        if (port.includes('.sock')) {
            return undefined;
        }
        const numericPort = Number(port);
        // Check if the conversion resulted in a valid finite number
        // Also check for reasonable port range (0 is not a valid port)
        if (!Number.isFinite(numericPort) || numericPort <= 0 || numericPort > 65535) {
            return undefined;
        }
        return numericPort;
    }
    /**
     * Get the API address for HTTP or WebSocket requests.
     * @param protocol - The protocol to use ('http' or 'ws')
     * @returns The full API endpoint URL
     */
    getApiAddress(protocol = 'http') {
        const numericPort = this.getNumericPort();
        if (numericPort) {
            return `${protocol}://127.0.0.1:${numericPort}/vectra/graphql`;
        }
        const nginxPort = this.getNginxPort();
        if (nginxPort !== this.PROD_NGINX_PORT) {
            return `${protocol}://127.0.0.1:${nginxPort}/vectra/graphql`;
        }
        return `${protocol}://127.0.0.1/vectra/graphql`;
    }
    /**
     * Get the WebSocket URI for subscriptions.
     * Handles both Unix socket and TCP connections.
     * @param enableSubscriptions - Whether subscriptions are enabled
     * @returns The WebSocket URI or undefined if subscriptions are disabled
     */
    getWebSocketUri(enableSubscriptions = false) {
        if (!enableSubscriptions) {
            return undefined;
        }
        if (this.isRunningOnSocket()) {
            // For Unix sockets, use the ws+unix:// protocol
            // Format: ws+unix://socket/path:/url/path
            const socketPath = this.getSocketPath();
            return `ws+unix://${socketPath}:/vectra/graphql`;
        }
        return this.getApiAddress('ws');
    }
};
SocketConfigService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SocketConfigService);
export { SocketConfigService };
//# sourceMappingURL=socket-config.service.js.map