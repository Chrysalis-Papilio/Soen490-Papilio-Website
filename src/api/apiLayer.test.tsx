import 'jest';
import { IActivityData } from '../interfaces';

import * as API from './apiLayer';

const BUSINESS_ID = 'businessId';
const FIREBASE_ID = 'firebaseId';

const EMPLOYEE_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  firebase_id: FIREBASE_ID,
  businessId: BUSINESS_ID,
  role: 'Admin',
};

describe('api test', () => {
  ;
  global.fetch = jest.fn(async () =>
    await Promise.resolve({
      json: async () => await Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  beforeEach(() => {
    (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValue(new Response());
  });

  describe('login related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint and format the result', async () => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        json: async () => ({
          employee: {
            firstName: 'John',
            lastName: 'Doe',
            firebase_id: FIREBASE_ID,
            businessId: BUSINESS_ID,
            role: 'Admin',
          },
        }),
      } as Response);

      const result = await API.login({ businessId: BUSINESS_ID, firebaseId: FIREBASE_ID, name: 'john' });

      expect(result).toEqual({
        name: 'John Doe',
        firebaseId: FIREBASE_ID,
        businessId: BUSINESS_ID,
        role: 'Admin',
      });
      expect(global.fetch).toHaveBeenCalledWith(`/api/business/${BUSINESS_ID}/employee/${FIREBASE_ID}`, { method: 'GET' });
    });
  });

  describe('register related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should do something', async () => {
      await API.register(BUSINESS_ID);
    });
  });

  describe('getProfile related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getProfile(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}`, { method: 'GET' });
    });
  });

  describe('addEmployee related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      const formData = {
        firebaseId: FIREBASE_ID,
        email: 'jdoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
        businessId: BUSINESS_ID,
        role: 'Admin',
        root: false,
      };

      await API.addEmployee(BUSINESS_ID, formData);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/addEmployee/${BUSINESS_ID}`, {
        method: 'POST',
        body: JSON.stringify({ employee: formData }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      });
    });
  });

  describe('getEmployees related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.getEmployees('')
        .catch(e => expect(e).toEqual(new Error('No business Id', { cause: 1 })));
    });

    it('should send the request to the correct endpoint', async () => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        json: async () => ({
          employees: [{
            firstName: 'John',
            lastName: 'Doe',
            firebase_id: FIREBASE_ID,
            businessId: BUSINESS_ID,
            role: 'Admin',
          }],
        }),
      } as Response);

      const results = await API.getEmployees(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}/employees`, {
        method: 'GET',
      });
      expect(results).toEqual(expect.objectContaining({
        employees: expect.arrayContaining([]),
      }));
    });

    it('should throw when an error occur in the fetch', async () => {
      const message = 'Something wrong happened';
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockRejectedValueOnce(new Error(message));

      await API.getEmployees(BUSINESS_ID)
        .catch(e => expect(e).toEqual(new Error(message, { cause: 0 })));
    });
  });

  describe('addBusiness related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      const formData = {
        business: {
          businessId: BUSINESS_ID,
          name: 'whatever',
        },
        address: {
          mention: 'whatever',
          lineOne: '1234 street',
          lineTwo: 'appt. 1',
          state: 'QC',
          postalCode: 'G8S 3S1',
          city: 'Montreal',
          country: 'Canada',
        },
        employee: {
          ...EMPLOYEE_DATA,
          email: 'jdoe@email.com',
          root: true,
        },
      };

      await API.addBusiness(formData);

      expect(global.fetch).toHaveBeenCalledWith('/api/business/createBusiness', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      });
    });
  });

  describe('getBusiness related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should send the request to the correct endpoint', async () => {
      await API.getBusiness(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}`, expect.objectContaining({ method: 'GET' }));
    });
  });

  describe('getActivities related test', () => {
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.getActivites('')
        .catch(e => expect(e).toEqual(new Error('No business Id', { cause: 1 })));
    });

    it('should send the request to the correct endpoint', async () => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
        json: async () => ({
          activities: [],
          count: 0,
          businessId: BUSINESS_ID,
        }),
      } as Response);

      const results = await API.getActivites(BUSINESS_ID);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/get/${BUSINESS_ID}/activities`, {
        method: 'GET',
      });
      expect(results).toEqual(expect.objectContaining({
        activities: expect.arrayContaining([]),
        count: 0,
        businessId: BUSINESS_ID,
      }));
    });

    it('should throw when an error occur in the fetch', async () => {
      const message = 'Something wrong happened';
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockRejectedValueOnce(new Error(message));

      await API.getActivites(BUSINESS_ID)
        .catch(e => expect(e).toEqual(new Error(message, { cause: 0 })));
    });
  });

  describe('addActivity related test', () => {
    let formData: IActivityData;
    afterEach(() => {
      (global.fetch as jest.MockedFunction<typeof global.fetch>).mockClear();
    });

    beforeEach(() => {
      formData = {
        activity: {
          title: 'title',
          description: 'description',
          costPerIndividual: 9.99,
          costPerGroup: 89.99,
          groupSize: 10,
          startTime: '1970-01-01T00:00:00.000Z',
          endTime: '2070-01-01T00:00:00.000Z',
        },
        address: {
          mention: 'mention',
          lineOne: '1234 Main Street',
          lineTwo: '',
          city: 'Montreal',
          state: 'QC',
          country: 'Canada',
          postalCode: 'EXAMPLE',
        },
      };
    });

    it('should reject with an error when businessId is not present', async () => {
      await API.addActivity('', formData)
        .catch(e => expect(e).toEqual(new Error('No business Id', { cause: 1 })));
    });

    it('should send the request to the correct endpoint', async () => {
      await API.addActivity(BUSINESS_ID, formData);

      expect(global.fetch).toHaveBeenCalledWith(`/api/business/addActivity/${BUSINESS_ID}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      });
    });
  });
});
