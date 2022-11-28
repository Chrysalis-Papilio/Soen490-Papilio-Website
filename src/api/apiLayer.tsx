import * as Interfaces from '../interfaces';

export async function login(data: { businessId: string, firebaseId: string, name: string }): Promise<any> {
  return await fetch(`/api/business/${data.businessId}/employee/${data.firebaseId}`, {
    method: 'GET',
  })
    .then(async (res) => {
      const { employee } = await res.json();
      return {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        name: `${employee.firstName} ${employee.lastName}`,
        firebaseId: employee.firebase_id,
        businessId: employee.businessId,
        role: employee.role,
      };
    });
}
export async function register(data: any): Promise<any> { console.log(data); }
export function logout(): void {}
export async function getActivites(businessId: string): Promise<Interfaces.IActivitiesResponse> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id', { cause: 1 }));
  }

  return await fetch(`/api/business/get/${businessId}/activities`, {
    method: 'GET',
  })
    .then(async (res) => await res.json())
    .catch(async error => await Promise.reject(new Error(error.message, { cause: 0 })));
}
export function getActivity(): void {}
export async function addActivity(businessId: string, data: Interfaces.IActivityData): Promise<Response> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id'));
  }

  return await fetch(`/api/business/addActivity/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export function updateActivity(): void {}
export function updateProfile(): void {}
export async function getProfile(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}`, {
    method: 'GET',
  });
}

export function getEmployee(): void {}

export async function addEmployee(
  businessId: string,
  data: Interfaces.IEmployeeData
): Promise<Response> {
  return await fetch(`/api/business/addEmployee/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employee: data }),
  });
}

export async function getEmployees(businessId: string): Promise<Response> {
  if (businessId === '') {
    return await Promise.reject(new Error('No business Id', { cause: 1 }));
  }
  return await fetch(`/api/business/get/${businessId}/employees`, {
    method: 'GET',
  })
    .then(async (res) => await res.json())
    .catch(async error => await Promise.reject(new Error(error.message, { cause: 0 })));
}

export function updateEmployeeRole(): void {}
export async function addBusiness(data: Interfaces.IBusinessData): Promise<Response> {
  return await fetch('/api/business/createBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export async function getBusiness(businessId: string): Promise<Response> {
  return await fetch(`/api/business/get/${businessId}`, {
    method: 'GET',
    mode: 'no-cors',
  });
}
