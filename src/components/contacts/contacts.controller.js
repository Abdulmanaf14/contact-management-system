"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const contacts_service_1 = require("./contacts.service");
const contact_entity_1 = require("./entities/contact.entity");
const auth_service_1 = require("../../auth/auth.service");
const update_contact_dto_1 = require("./dto/update-contact.dto");
const auth_guard_1 = require("../../authguard/auth.guard");
let ContactsController = class ContactsController {
    constructor(contactsService, authService) {
        this.contactsService = contactsService;
        this.authService = authService;
    }
    async create(contact, session, request) {
        const authHeader = request.headers['authorization'];
        const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : session.accessToken;
        if (!accessToken) {
            throw new common_1.UnauthorizedException('Access token not found in session.');
        }
        const isValidToken = this.authService.verifyAccessToken(accessToken);
        if (!isValidToken) {
            throw new common_1.UnauthorizedException('Invalid access token.');
        }
        if (contact.phoneNumber != undefined) {
            const existingUser = await this.contactsService.findByPhoneNumber(contact.phoneNumber);
            if (existingUser) {
                throw new common_1.BadRequestException('Phone number already saved.');
            }
        }
        const decoded = this.authService.verifyAccessToken(accessToken);
        contact.user = {
            name: session.userName,
            phoneNumber: session.userName,
            email: session.email,
            password: "nil",
            id: decoded.userId
        };
        const res = await this.contactsService.create(contact);
        return res;
    }
    async updateSpamStatus(phoneNumber, updateSpamStatusDto, session) {
        return await this.contactsService.updateSpamStatus(phoneNumber, updateSpamStatusDto, session);
    }
    async searchByPhoneNumber(phoneNumber, session) {
        const contacts = await this.contactsService.searchByPhoneNumber(phoneNumber, session);
        if (!contacts.length) {
            throw new common_1.NotFoundException('No contacts found');
        }
        return contacts.map(contact => ({
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            is_spam: contact.isSpam,
        }));
    }
    async searchByName(name, session) {
        const contacts = await this.contactsService.searchByName(name, session);
        if (!contacts.length) {
            throw new common_1.NotFoundException('No contacts found');
        }
        return contacts.map(contact => ({
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            is_spam: contact.isSpam,
        }));
    }
};
__decorate([
    (0, common_1.Post)('addContact'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_entity_1.Contact, Object, Request]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':phoneNumber/spam'),
    __param(0, (0, common_1.Param)('phoneNumber')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_dto_1.UpdateSpamStatusDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "updateSpamStatus", null);
__decorate([
    (0, common_1.Get)('search/:phoneNumber'),
    __param(0, (0, common_1.Param)('phoneNumber')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "searchByPhoneNumber", null);
__decorate([
    (0, common_1.Get)('searchName/name'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "searchByName", null);
ContactsController = __decorate([
    (0, common_1.Controller)('contacts'),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService,
        auth_service_1.AuthService])
], ContactsController);
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map