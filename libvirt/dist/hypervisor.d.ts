import { DomainInfo, DomainGetXMLDescFlags, ConnectListAllDomainsFlags, NodeInfo } from './types.js';
import { Domain } from './domain.js';
/**
 * Represents a connection to a libvirt hypervisor.
 * This class provides methods to interact with libvirt domains (virtual machines)
 * and retrieve information about the hypervisor system.
 */
export declare class Hypervisor {
    private nativeHypervisor;
    /**
     * Creates a new Hypervisor instance.
     * @param options - Connection options
     * @param options.uri - The URI to connect to the hypervisor (e.g., 'qemu:///system')
     */
    constructor(options: {
        uri: string;
    });
    /**
     * Opens a connection to the hypervisor.
     * @throws {LibvirtError} If the connection fails
     */
    connectOpen(): Promise<void>;
    /**
     * Closes the connection to the hypervisor.
     * @throws {LibvirtError} If closing the connection fails
     */
    connectClose(): Promise<void>;
    /**
     * Lists all domains matching the specified flags.
     * If no flags are provided, lists all domains (both active and inactive).
     * @param flags - Optional flags to filter the list of domains
     * @returns Array of Domain objects
     * @throws {LibvirtError} If listing domains fails
     */
    connectListAllDomains(flags?: ConnectListAllDomainsFlags): Promise<Domain[]>;
    /**
     * Lists the IDs of all running domains.
     * @returns Array of domain IDs
     * @throws {LibvirtError} If listing domain IDs fails
     */
    connectListDomains(): Promise<number[]>;
    /**
     * Lists the names of all defined (but not running) domains.
     * @returns Array of domain names
     * @throws {LibvirtError} If listing defined domains fails
     */
    connectListDefinedDomains(): Promise<string[]>;
    /**
     * Creates and starts a new domain from XML configuration.
     * @param xml - XML configuration for the domain
     * @returns The created Domain object
     * @throws {LibvirtError} If domain creation fails
     */
    domainCreateXML(xml: string): Promise<Domain>;
    /**
     * Defines a new domain from XML configuration without starting it.
     * @param xml - XML configuration for the domain
     * @returns The defined Domain object
     * @throws {LibvirtError} If domain definition fails
     */
    domainDefineXML(xml: string): Promise<Domain>;
    /**
     * Looks up a domain by its ID.
     * @param id - The domain ID to look up
     * @returns The found Domain object
     * @throws {LibvirtError} If the domain is not found or lookup fails
     */
    domainLookupByID(id: number): Promise<Domain>;
    /**
     * Looks up a domain by its name.
     * @param name - The domain name to look up
     * @returns The found Domain object
     * @throws {LibvirtError} If the domain is not found or lookup fails
     */
    domainLookupByName(name: string): Promise<Domain>;
    /**
     * Looks up a domain by its UUID.
     * @param uuid - The domain UUID to look up
     * @returns The found Domain object
     * @throws {LibvirtError} If the domain is not found or lookup fails
     */
    domainLookupByUUIDString(uuid: string): Promise<Domain>;
    /**
     * Saves the state of a domain to a file.
     * @param domain - The domain to save
     * @param filename - The file to save the domain state to
     * @throws {LibvirtError} If saving the domain state fails
     */
    domainSave(domain: Domain, filename: string): Promise<void>;
    /**
     * Starts a defined domain.
     * @param domain - The domain to start
     * @throws {LibvirtError} If starting the domain fails
     */
    domainCreate(domain: Domain): Promise<void>;
    /**
     * Gracefully shuts down a domain.
     * @param domain - The domain to shut down
     * @throws {LibvirtError} If shutting down the domain fails
     */
    domainShutdown(domain: Domain): Promise<void>;
    /**
     * Pauses a domain.
     * @param domain - The domain to pause
     * @throws {LibvirtError} If pausing the domain fails
     */
    domainSuspend(domain: Domain): Promise<void>;
    /**
     * Resumes a paused domain.
     * @param domain - The domain to resume
     * @throws {LibvirtError} If resuming the domain fails
     */
    domainResume(domain: Domain): Promise<void>;
    /**
     * Forcefully terminates a domain.
     * @param domain - The domain to destroy
     * @throws {LibvirtError} If destroying the domain fails
     */
    domainDestroy(domain: Domain): Promise<void>;
    /**
     * Removes a domain's configuration from the hypervisor.
     * @param domain - The domain to undefine
     * @throws {LibvirtError} If undefining the domain fails
     */
    domainUndefine(domain: Domain): Promise<void>;
    /**
     * Retrieves information about a domain.
     * @param domain - The domain to get information about
     * @returns Domain information including state, memory usage, etc.
     * @throws {LibvirtError} If retrieving domain information fails
     */
    domainGetInfo(domain: Domain): Promise<DomainInfo>;
    /**
     * Gets the ID of a running domain.
     * @param domain - The domain to get the ID for
     * @returns The domain ID or null if the domain is not running
     * @throws {LibvirtError} If getting the domain ID fails
     */
    domainGetID(domain: Domain): Promise<number | null>;
    /**
     * Gets the name of a domain.
     * @param domain - The domain to get the name for
     * @returns The domain name
     * @throws {LibvirtError} If getting the domain name fails
     */
    domainGetName(domain: Domain): Promise<string>;
    /**
     * Gets the UUID of a domain.
     * @param domain - The domain to get the UUID for
     * @returns The domain UUID as a string
     * @throws {LibvirtError} If getting the domain UUID fails
     */
    domainGetUUIDString(domain: Domain): Promise<string>;
    /**
     * Gets the XML description of a domain.
     * @param domain - The domain to get the XML for
     * @param flags - Optional flags to modify the XML output
     * @returns The domain's XML configuration
     * @throws {LibvirtError} If getting the domain XML fails
     */
    domainGetXMLDesc(domain: Domain, flags?: DomainGetXMLDescFlags): Promise<string>;
    /**
     * Gets the maximum number of virtual CPUs supported for a given hypervisor type.
     * @param type - Optional hypervisor type to check
     * @returns The maximum number of virtual CPUs
     * @throws {LibvirtError} If getting the maximum vCPUs fails
     */
    connectGetMaxVcpus(type?: string): Promise<number>;
    /**
     * Gets the hostname of the hypervisor.
     * @returns The hypervisor's hostname
     * @throws {LibvirtError} If getting the hostname fails
     */
    connectGetHostname(): Promise<string>;
    /**
     * Gets information about the physical node (host machine).
     * @returns Node information including memory, CPUs, etc.
     * @throws {LibvirtError} If getting node information fails
     */
    nodeGetInfo(): Promise<NodeInfo>;
    /**
     * Restores a domain from a saved state file.
     * @param filename - The file containing the saved domain state
     * @throws {LibvirtError} If restoring the domain fails
     */
    domainRestore(filename: string): Promise<void>;
}
//# sourceMappingURL=hypervisor.d.ts.map