import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;


    return ((!data) ? user : user[data])

})