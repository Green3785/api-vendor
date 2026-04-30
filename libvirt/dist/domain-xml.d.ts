/**
 * Copyright 2019 Leon Rinkel <leon@rinkel.me> and vmngr/libvirt contributers.
 *
 * This file is part of the vmngr/libvirt project and is subject to the MIT
 * license as in the LICENSE file in the project root.
 *
 * @brief Contains helper functions to deserialize / serialize domain
 *  descriptions from / to XML.
 */
import { DomainDesc, DomainOsDesc, DomainDiskDesc, DomainInterfaceDesc, DomainGraphicsDesc } from './domain-desc.js';
export declare const domainOsXml: {
    serialize(osDesc: DomainOsDesc): {
        loader?: {
            _?: string | undefined;
            $: {
                type?: string | undefined;
                readonly?: string | undefined;
            };
        }[] | undefined;
        boot?: {
            $: {
                dev?: string | undefined;
            };
        } | undefined;
        type?: {
            _?: string | undefined;
            $: {
                machine?: string | undefined;
                arch?: string | undefined;
            };
        } | undefined;
        $: {};
    };
    deserialize(os: any): DomainOsDesc;
};
export declare const domainDiskXml: {
    serialize(diskDesc: DomainDiskDesc): {
        target?: {
            $: {
                bus?: "virtio" | undefined;
                dev?: string | undefined;
            };
        } | undefined;
        source?: {
            $: {
                file?: string | undefined;
            };
        } | undefined;
        driver?: {
            $: {
                type?: "qcow2" | undefined;
                name?: "qemu" | undefined;
            };
        } | undefined;
        $: {
            device?: "disk" | undefined;
            type?: "file" | undefined;
        };
    };
    deserialize(disk: any): DomainDiskDesc;
};
export declare const domainInterfaceXml: {
    serialize(interfaceDesc: DomainInterfaceDesc): Record<string, unknown>;
    deserialize(iface: any): DomainInterfaceDesc;
};
export declare const domainGraphicsXml: {
    serialize(graphicsDesc: DomainGraphicsDesc): {
        $: {
            passwd?: string | undefined;
            listen?: string | undefined;
            port?: number | undefined;
            type?: "vnc" | undefined;
        };
    };
    deserialize(graphics: {
        $: {
            passwd?: string;
            listen?: string;
            port?: number;
            type?: "vnc";
        };
    }): DomainGraphicsDesc;
};
export declare function domainDescToXml(desc: DomainDesc): string;
export declare function domainDescFromXml(xml: string): Promise<DomainDesc>;
//# sourceMappingURL=domain-xml.d.ts.map