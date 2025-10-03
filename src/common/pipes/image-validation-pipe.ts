import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export function ImageValidationPipe() {
  return new ParseFilePipe({
    fileIsRequired: false,
    validators: [
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // for max 1 mb
      new FileTypeValidator({ fileType: /^(image\/(jpg|jpeg|png))$/ }),
    ],
  });
}
