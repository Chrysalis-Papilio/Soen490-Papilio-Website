export declare interface IEmployeeData {
  firebaseId: string
  email: string
  firstName: string
  lastName: string
  businessId: string
  role: string
  root: boolean
}

export declare interface IBusinessData {
  business: {
    businessId: string
    name: string
  }
  address: {
    mention: string
    lineOne: string
    lineTwo: string
    state: string
    postalCode: string
    city: string
    country: string
  }
  employee: {
    firstName: string
    lastName: string
    email: string
    firebase_id: string
    role: string
    root: boolean
  }
}

export declare interface IActivityData {
  activity: IActivity
  address: {
    mention: string
    lineOne: string
    lineTwo: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}

export declare interface IActivity {
  id?: number
  title: string
  description: string
  costPerIndividual: number
  costPerGroup: number
  groupSize: number
  image?: null
  startTime: string
  endTime: string
  createdAt?: string
  updatedAt?: string
  businessId?: string
}

export declare interface IActivitiesResponse {
  businessId: string
  count: number
  activities: IActivity[]
}
