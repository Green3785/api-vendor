export declare enum URL_TYPE {
    LAN = "LAN",
    WIREGUARD = "WIREGUARD",
    WAN = "WAN",
    MDNS = "MDNS",
    OTHER = "OTHER",
    DEFAULT = "DEFAULT"
}
/**
 * This defines the LOCAL server Access URLs - these are sent to Connect if needed to share access routes
 */
export declare class AccessUrl {
    type: URL_TYPE;
    name?: string | null;
    ipv4?: URL | null;
    ipv6?: URL | null;
}
