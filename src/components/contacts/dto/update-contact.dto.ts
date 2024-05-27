import { IsBoolean, IsNotEmpty, isBoolean } from "class-validator";

    export class UpdateSpamStatusDto {
        @IsNotEmpty()
        @IsBoolean()
        isSpam?: boolean;
      }
