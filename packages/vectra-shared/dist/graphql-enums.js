// This file contains only the enum definitions without any NestJS dependencies
// Safe to import in both frontend and backend
// Define our own AuthAction enum with matching keys and values
// This ensures GraphQL schema and runtime values are identical
export var AuthAction;
(function (AuthAction) {
    AuthAction["CREATE_ANY"] = "CREATE_ANY";
    AuthAction["CREATE_OWN"] = "CREATE_OWN";
    AuthAction["READ_ANY"] = "READ_ANY";
    AuthAction["READ_OWN"] = "READ_OWN";
    AuthAction["UPDATE_ANY"] = "UPDATE_ANY";
    AuthAction["UPDATE_OWN"] = "UPDATE_OWN";
    AuthAction["DELETE_ANY"] = "DELETE_ANY";
    AuthAction["DELETE_OWN"] = "DELETE_OWN";
})(AuthAction || (AuthAction = {}));
// Define Resource enum
export var Resource;
(function (Resource) {
    /** Activation code management and validation */
    Resource["ACTIVATION_CODE"] = "ACTIVATION_CODE";
    /** API key management and administration */
    Resource["API_KEY"] = "API_KEY";
    /** Array operations and disk management */
    Resource["ARRAY"] = "ARRAY";
    /** Cloud storage and backup services */
    Resource["CLOUD"] = "CLOUD";
    /** System configuration and settings */
    Resource["CONFIG"] = "CONFIG";
    /** Unraid Connect service management */
    Resource["CONNECT"] = "CONNECT";
    /** Remote access functionality for Connect */
    Resource["CONNECT__REMOTE_ACCESS"] = "CONNECT__REMOTE_ACCESS";
    /** System customization and theming */
    Resource["CUSTOMIZATIONS"] = "CUSTOMIZATIONS";
    /** Dashboard and system overview */
    Resource["DASHBOARD"] = "DASHBOARD";
    /** Individual disk operations and management */
    Resource["DISK"] = "DISK";
    /** Display and UI settings */
    Resource["DISPLAY"] = "DISPLAY";
    /** Docker container management */
    Resource["DOCKER"] = "DOCKER";
    /** Flash drive operations and settings */
    Resource["FLASH"] = "FLASH";
    /** System information and status */
    Resource["INFO"] = "INFO";
    /** System logs and logging */
    Resource["LOGS"] = "LOGS";
    /** Current user profile and settings */
    Resource["ME"] = "ME";
    /** Network configuration and management */
    Resource["NETWORK"] = "NETWORK";
    /** System notifications and alerts */
    Resource["NOTIFICATIONS"] = "NOTIFICATIONS";
    /** Online services and connectivity */
    Resource["ONLINE"] = "ONLINE";
    /** Operating system operations and updates */
    Resource["OS"] = "OS";
    /** System ownership and licensing */
    Resource["OWNER"] = "OWNER";
    /** Permission management and administration */
    Resource["PERMISSION"] = "PERMISSION";
    /** System registration and activation */
    Resource["REGISTRATION"] = "REGISTRATION";
    /** My Servers management and configuration */
    Resource["SERVERS"] = "SERVERS";
    /** System services and daemons */
    Resource["SERVICES"] = "SERVICES";
    /** File share management */
    Resource["SHARE"] = "SHARE";
    /** System variables and environment */
    Resource["VARS"] = "VARS";
    /** Virtual machine management */
    Resource["VMS"] = "VMS";
    /** Welcome and onboarding features */
    Resource["WELCOME"] = "WELCOME";
})(Resource || (Resource = {}));
export var Role;
(function (Role) {
    /** Full administrative access to all resources */
    Role["ADMIN"] = "ADMIN";
    /** Read access to all resources with remote access management */
    Role["CONNECT"] = "CONNECT";
    /** Basic read access to user profile only */
    Role["GUEST"] = "GUEST";
    /** Read-only access to all resources */
    Role["VIEWER"] = "VIEWER";
})(Role || (Role = {}));
//# sourceMappingURL=graphql-enums.js.map