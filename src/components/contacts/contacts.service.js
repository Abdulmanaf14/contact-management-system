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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const contact_entity_1 = require("./entities/contact.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ContactsService = class ContactsService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async create(contact) {
        return this.contactRepository.save(contact);
    }
    async findByPhoneNumber(phoneNumber) {
        return await this.contactRepository.findOne({ where: { phoneNumber } });
    }
    async updateSpamStatus(phoneNumber, updateSpamStatus, session) {
        if (!session.userId) {
            throw new common_1.BadRequestException('Not logged in.');
        }
        const contact = await this.contactRepository.findOne({ where: { phoneNumber } });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        contact.isSpam = updateSpamStatus.isSpam;
        return this.contactRepository.save(contact);
    }
    async searchByPhoneNumber(phoneNumber, session) {
        if (!session.userId) {
            throw new common_1.BadRequestException('Not logged in.');
        }
        return this.contactRepository.find({
            where: { phoneNumber }
        });
    }
    async searchByName(name, session) {
        console.log(`Searching contacts with name: ${name}`);
        if (!session.accessToken) {
            throw new common_1.BadRequestException('not logged in');
        }
        const contactname = this.contactRepository.createQueryBuilder('contact')
            .where('contact.name LIKE :nameStart', { nameStart: `${name}%` })
            .orWhere('contact.name LIKE :nameContain', { nameContain: `%${name}%` })
            .orderBy('CASE WHEN contact.name LIKE :nameStart THEN 1 ELSE 2 END', 'ASC')
            .setParameters({ nameStart: `${name}%`, nameContain: `%${name}%` })
            .getMany();
        console.log(`Found contacts: ${JSON.stringify(contactname, null, 2)}`);
        return contactname;
    }
};
ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ContactsService);
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map