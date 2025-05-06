import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User name',
    example: 'John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  email?: string;
}