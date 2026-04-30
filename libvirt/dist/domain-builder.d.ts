/**
 * Copyright 2019 Leon Rinkel <leon@rinkel.me> and vmngr/libvirt contributers.
 *
 * This file is part of the vmngr/libvirt project and is subject to the MIT
 * license as in the LICENSE file in the project root.
 *
 * @brief Contains a builder class to construct domain descriptions.
 */
import { DomainDesc, DomainDiskDesc, DomainInterfaceDesc, DomainGraphicsDesc } from './domain-desc.js';
export declare class DomainBuilder {
    private domainDesc;
    fromTemplate(templateDesc: DomainDesc): DomainBuilder;
    setName(name: string): DomainBuilder;
    setUUID(uuid: string): DomainBuilder;
    addDisk(diskDesc: DomainDiskDesc): DomainBuilder;
    removeDisks(): DomainBuilder;
    addInterface(interfaceDesc: DomainInterfaceDesc): DomainBuilder;
    removeInterfaces(): DomainBuilder;
    addGraphics(graphicsDesc: DomainGraphicsDesc): DomainBuilder;
    removeGraphics(): DomainBuilder;
    build: () => DomainDesc;
}
//# sourceMappingURL=domain-builder.d.ts.map