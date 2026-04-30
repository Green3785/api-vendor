/**
 * Copyright 2019 Leon Rinkel <leon@rinkel.me> and vmngr/libvirt contributers.
 *
 * This file is part of the vmngr/libvirt project and is subject to the MIT
 * license as in the LICENSE file in the project root.
 *
 * @brief Contains a builder class to construct domain descriptions.
 */
export class DomainBuilder {
    constructor() {
        this.domainDesc = {};
        this.build = () => this.domainDesc;
    }
    fromTemplate(templateDesc) {
        this.domainDesc = templateDesc;
        return this;
    }
    setName(name) {
        this.domainDesc.name = name;
        return this;
    }
    setUUID(uuid) {
        this.domainDesc.uuid = uuid;
        return this;
    }
    addDisk(diskDesc) {
        if (!this.domainDesc.devices) {
            this.domainDesc.devices = [];
        }
        this.domainDesc.devices.push({ type: 'disk', disk: diskDesc });
        return this;
    }
    removeDisks() {
        if (this.domainDesc.devices) {
            this.domainDesc.devices = this.domainDesc.devices.filter(device => device.type !== 'disk');
        }
        return this;
    }
    addInterface(interfaceDesc) {
        if (!this.domainDesc.devices) {
            this.domainDesc.devices = [];
        }
        this.domainDesc.devices.push({ type: 'interface', interface: interfaceDesc });
        return this;
    }
    removeInterfaces() {
        if (this.domainDesc.devices) {
            this.domainDesc.devices = this.domainDesc.devices.filter(device => device.type !== 'interface');
        }
        return this;
    }
    addGraphics(graphicsDesc) {
        if (!this.domainDesc.devices) {
            this.domainDesc.devices = [];
        }
        this.domainDesc.devices.push({ type: 'graphics', graphics: graphicsDesc });
        return this;
    }
    removeGraphics() {
        if (this.domainDesc.devices) {
            this.domainDesc.devices = this.domainDesc.devices.filter(device => device.type !== 'graphics');
        }
        return this;
    }
}
//# sourceMappingURL=domain-builder.js.map