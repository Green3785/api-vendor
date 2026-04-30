import { ConfigService } from '@nestjs/config';
/**
 * Shared service for socket detection and address resolution.
 * Used by InternalGraphQLClientFactory and other services that need socket configuration.
 */
export declare class SocketConfigService {
    private readonly configService;
    private readonly PROD_NGINX_PORT;
    constructor(configService: ConfigService);
    /**
     * Get the nginx port from configuration
     */
    getNginxPort(): number;
    /**
     * Check if the API is running on a Unix socket
     */
    isRunningOnSocket(): boolean;
    /**
     * Get the socket path from config
     */
    getSocketPath(): string;
    /**
     * Get the numeric port if not running on socket
     */
    getNumericPort(): number | undefined;
    /**
     * Get the API address for HTTP or WebSocket requests.
     * @param protocol - The protocol to use ('http' or 'ws')
     * @returns The full API endpoint URL
     */
    getApiAddress(protocol?: 'http' | 'ws'): string;
    /**
     * Get the WebSocket URI for subscriptions.
     * Handles both Unix socket and TCP connections.
     * @param enableSubscriptions - Whether subscriptions are enabled
     * @returns The WebSocket URI or undefined if subscriptions are disabled
     */
    getWebSocketUri(enableSubscriptions?: boolean): string | undefined;
}
