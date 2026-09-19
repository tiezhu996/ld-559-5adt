export enum UserRole {
  PET_OWNER = 'PET_OWNER',
  VET = 'VET',
  ADMIN = 'ADMIN',
}

export enum PetSpecies {
  CAT = 'CAT',
  DOG = 'DOG',
  RABBIT = 'RABBIT',
  BIRD = 'BIRD',
  OTHER = 'OTHER',
}

export enum VisitType {
  ROUTINE = 'ROUTINE',
  EMERGENCY = 'EMERGENCY',
  VACCINE = 'VACCINE',
  SURGERY = 'SURGERY',
  CHECKUP = 'CHECKUP',
}

export enum VaccineStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
}

export enum InsuranceStatus {
  ACTIVE = 'ACTIVE',
  PENDING_RENEWAL = 'PENDING_RENEWAL',
  EXPIRED = 'EXPIRED',
  CLAIMING = 'CLAIMING',
}

export enum PolicyType {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
