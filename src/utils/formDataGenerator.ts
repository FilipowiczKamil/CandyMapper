import { faker } from '@faker-js/faker';

export const generateContactUsFormData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    message: faker.lorem.paragraph(),
  };
};
