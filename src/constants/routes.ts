import { ContactsModule } from "src/components/contacts/contacts.module";
import { UsersModule } from "src/components/users/users.module";

export const APP_ROUTES = [
	{
		path: 'contacts',
		module: ContactsModule
	},
	{
		path: 'users',
		module: UsersModule
	}
];