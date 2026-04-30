/**
 * Possible states a domain can be in
 */
export var DomainState;
(function (DomainState) {
    DomainState[DomainState["NOSTATE"] = 0] = "NOSTATE";
    DomainState[DomainState["RUNNING"] = 1] = "RUNNING";
    DomainState[DomainState["BLOCKED"] = 2] = "BLOCKED";
    DomainState[DomainState["PAUSED"] = 3] = "PAUSED";
    DomainState[DomainState["SHUTDOWN"] = 4] = "SHUTDOWN";
    DomainState[DomainState["SHUTOFF"] = 5] = "SHUTOFF";
    DomainState[DomainState["CRASHED"] = 6] = "CRASHED";
    DomainState[DomainState["PMSUSPENDED"] = 7] = "PMSUSPENDED";
})(DomainState || (DomainState = {}));
/**
 * Flags for domain reboot operations
 */
export var DomainRebootFlags;
(function (DomainRebootFlags) {
    DomainRebootFlags[DomainRebootFlags["NONE"] = 0] = "NONE";
    DomainRebootFlags[DomainRebootFlags["ACPI"] = 1] = "ACPI";
    DomainRebootFlags[DomainRebootFlags["GUEST_AGENT"] = 2] = "GUEST_AGENT";
    DomainRebootFlags[DomainRebootFlags["INIT"] = 4] = "INIT";
    DomainRebootFlags[DomainRebootFlags["SIGNAL"] = 8] = "SIGNAL";
})(DomainRebootFlags || (DomainRebootFlags = {}));
/**
 * Sources for domain interface addresses
 */
export var DomainInterfaceAddressesSource;
(function (DomainInterfaceAddressesSource) {
    DomainInterfaceAddressesSource[DomainInterfaceAddressesSource["LEASE"] = 0] = "LEASE";
    DomainInterfaceAddressesSource[DomainInterfaceAddressesSource["AGENT"] = 1] = "AGENT";
    DomainInterfaceAddressesSource[DomainInterfaceAddressesSource["ARP"] = 2] = "ARP";
})(DomainInterfaceAddressesSource || (DomainInterfaceAddressesSource = {}));
/**
 * Flags for listing domains
 */
export var ConnectListAllDomainsFlags;
(function (ConnectListAllDomainsFlags) {
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["ACTIVE"] = 1] = "ACTIVE";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["INACTIVE"] = 2] = "INACTIVE";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["PERSISTENT"] = 4] = "PERSISTENT";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["TRANSIENT"] = 8] = "TRANSIENT";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["RUNNING"] = 16] = "RUNNING";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["PAUSED"] = 32] = "PAUSED";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["SHUTOFF"] = 64] = "SHUTOFF";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["OTHER"] = 128] = "OTHER";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["MANAGEDSAVE"] = 256] = "MANAGEDSAVE";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["NO_MANAGEDSAVE"] = 512] = "NO_MANAGEDSAVE";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["AUTOSTART"] = 1024] = "AUTOSTART";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["NO_AUTOSTART"] = 2048] = "NO_AUTOSTART";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["HAS_SNAPSHOT"] = 4096] = "HAS_SNAPSHOT";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["NO_SNAPSHOT"] = 8192] = "NO_SNAPSHOT";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["HAS_CHECKPOINT"] = 16384] = "HAS_CHECKPOINT";
    ConnectListAllDomainsFlags[ConnectListAllDomainsFlags["NO_CHECKPOINT"] = 32768] = "NO_CHECKPOINT";
})(ConnectListAllDomainsFlags || (ConnectListAllDomainsFlags = {}));
/**
 * Flags for getting domain XML description
 */
export var DomainGetXMLDescFlags;
(function (DomainGetXMLDescFlags) {
    DomainGetXMLDescFlags[DomainGetXMLDescFlags["NONE"] = 0] = "NONE";
    DomainGetXMLDescFlags[DomainGetXMLDescFlags["SECURE"] = 1] = "SECURE";
    DomainGetXMLDescFlags[DomainGetXMLDescFlags["INACTIVE"] = 2] = "INACTIVE";
    DomainGetXMLDescFlags[DomainGetXMLDescFlags["UPDATE_CPU"] = 4] = "UPDATE_CPU";
    DomainGetXMLDescFlags[DomainGetXMLDescFlags["MIGRATABLE"] = 8] = "MIGRATABLE";
})(DomainGetXMLDescFlags || (DomainGetXMLDescFlags = {}));
export class LibvirtError extends Error {
    constructor(message, code, domain, level, str1, str2, str3) {
        super(message);
        this.name = 'LibvirtError';
        this.code = code;
        this.domain = domain;
        this.level = level;
        this.str1 = str1;
        this.str2 = str2;
        this.str3 = str3;
        // Add more context to the error message
        if (message === 'Expected a number.') {
            this.message = `Type error: Expected a number but received ${typeof str1 || 'undefined'}. This error typically occurs when calling libvirt methods that require numeric parameters.`;
        }
    }
    toString() {
        return `${this.name}: ${this.message} (code: ${this.code}, domain: ${this.domain}, level: ${this.level})`;
    }
}
//# sourceMappingURL=types.js.map