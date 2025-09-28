export const registerApiResponse = {
  success: {
    description: 'User registered successfully',
    schema: {
      example: {
        success: true,
        message: 'User registered successfully',
        data: {
          id: '1a2b3c-2bcs-sgfa-adafdafh',
          username: 'Mount Astro',
          email: 'astro@gmail.com',
          password: '',
        },
      },
    },
  },
  validationError: {
    description: 'Validation Error',
    schema: {
      example: {
        success: false,
        message: 'Invalid email address',
      },
    },
  },
  conflictError: {
    description: 'Email already in use',
    schema: {
      example: {
        success: false,
        message: 'Duplicate record already exists',
      },
    },
  },
};
