import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiMap(): object {
    return {
      name: 'Uber Freight API - Tırport Case Study',
      endpoints: {
        '/': {
          request: 'GET',
          type: 'public',
          describe: 'API Map',
        },
        '/user/:id': {
          request: 'GET',
          type: 'private',
          describe: 'Get user by id',
        },
        '/user/update': {
          request: 'PUT',
          type: 'private',
          describe: 'Update user',
        },
        '/user/delete': {
          request: 'DELETE',
          type: 'private',
          describe: 'Delete user',
        },
        '/auth/login': {
          request: 'POST',
          type: 'public',
          describe: 'Login',
        },
        '/auth/register': {
          request: 'POST',
          type: 'public',
          describe: 'Register',
        },
        '/auth/refresh': {
          request: 'POST',
          type: 'private',
          describe: 'Refresh token',
        },
        '/auth/driver/register': {
          request: 'POST',
          type: 'public',
          describe: 'Register driver',
        },
        '/driver': {
          request: 'GET',
          type: 'public',
          describe: 'Get all drivers',
        },
        '/favorites/add-favorite-driver': {
          request: 'POST',
          type: 'private',
          describe: 'Add favorite driver',
        },
        '/favorites/fetch-favorite-drivers-of-user': {
          request: 'GET',
          type: 'private',
          describe: 'Fetch favorite drivers of user',
        },
        '/favorites/remove-favorite-driver': {
          request: 'DELETE',
          type: 'private',
          describe: 'Remove favorite driver',
        },
      },
    };
  }
}
