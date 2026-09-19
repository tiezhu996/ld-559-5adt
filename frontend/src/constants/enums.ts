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

export const enumLabels = {
  [PetSpecies.CAT]: '猫',
  [PetSpecies.DOG]: '狗',
  [PetSpecies.RABBIT]: '兔',
  [PetSpecies.BIRD]: '鸟',
  [PetSpecies.OTHER]: '其他',
  [VisitType.ROUTINE]: '常规',
  [VisitType.EMERGENCY]: '急诊',
  [VisitType.VACCINE]: '疫苗',
  [VisitType.SURGERY]: '手术',
  [VisitType.CHECKUP]: '体检',
  [VaccineStatus.COMPLETED]: '已接种',
  [VaccineStatus.PENDING]: '待接种',
  [VaccineStatus.OVERDUE]: '已过期',
  [InsuranceStatus.ACTIVE]: '生效',
  [InsuranceStatus.PENDING_RENEWAL]: '待续',
  [InsuranceStatus.EXPIRED]: '已过期',
  [InsuranceStatus.CLAIMING]: '理赔中',
  [PolicyType.BASIC]: '基础',
  [PolicyType.STANDARD]: '标准',
  [PolicyType.PREMIUM]: '高级',
  [Gender.MALE]: '雄性',
  [Gender.FEMALE]: '雌性',
};
