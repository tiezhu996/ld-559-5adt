import { Gender, InsuranceStatus, PetSpecies, PolicyType, VaccineStatus, VisitType } from '../constants/enums';
import type { InsurancePolicy } from '../types/insurance';
import type { MedicalRecord } from '../types/medical';
import type { Pet } from '../types/pet';
import type { VaccineRecord } from '../types/vaccine';

export const mockPets: Pet[] = [
  {
    id: 'pet-demo-1',
    ownerId: 'owner-demo',
    name: '豆包',
    species: PetSpecies.DOG,
    breed: '柯基',
    gender: Gender.MALE,
    birthDate: '2021-03-12',
    weight: 11.8,
    microchipNo: 'MC-559-001',
    allergies: '青霉素',
    medicalHistory: '幼年期肠胃敏感，需定期复查。',
  },
  {
    id: 'pet-demo-2',
    ownerId: 'owner-demo',
    name: '糯米',
    species: PetSpecies.CAT,
    breed: '英短',
    gender: Gender.FEMALE,
    birthDate: '2022-08-02',
    weight: 4.6,
    medicalHistory: '已完成绝育。',
  },
];

export const mockMedical: MedicalRecord[] = [
  {
    id: 'medical-demo-1',
    petId: 'pet-demo-1',
    vetId: 'vet-demo',
    clinicId: 'clinic-demo',
    visitDate: '2026-06-10',
    type: VisitType.CHECKUP,
    diagnosis: '年度体检，体况良好',
    treatment: '建议控制体重并增加运动',
    prescription: '益生菌 7 日',
    cost: 328,
    nextVisitDate: '2026-09-10',
    attachments: [],
    pet: mockPets[0],
  },
  {
    id: 'medical-demo-2',
    petId: 'pet-demo-2',
    vetId: 'vet-demo',
    clinicId: 'clinic-demo',
    visitDate: '2026-05-15',
    type: VisitType.ROUTINE,
    diagnosis: '皮肤轻微过敏',
    treatment: '清洁护理并观察',
    prescription: '抗敏喷剂',
    cost: 186,
    attachments: [],
    pet: mockPets[1],
  },
];

export const mockVaccines: VaccineRecord[] = [
  {
    id: 'vaccine-demo-1',
    petId: 'pet-demo-1',
    vaccineName: '狂犬疫苗',
    batchNo: 'RV-2026-06',
    nextDueDate: '2026-06-22',
    vetId: 'vet-demo',
    status: VaccineStatus.PENDING,
    pet: mockPets[0],
  },
  {
    id: 'vaccine-demo-2',
    petId: 'pet-demo-2',
    vaccineName: '猫三联',
    batchNo: 'FCV-2026-04',
    administeredDate: '2026-04-01',
    nextDueDate: '2027-04-01',
    vetId: 'vet-demo',
    status: VaccineStatus.COMPLETED,
    pet: mockPets[1],
  },
];

export const mockInsurance: InsurancePolicy[] = [
  {
    id: 'policy-demo-1',
    petId: 'pet-demo-1',
    provider: 'PawShield',
    planType: PolicyType.STANDARD,
    premium: 1299,
    coverage: 30000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: InsuranceStatus.ACTIVE,
    pet: mockPets[0],
  },
  {
    id: 'policy-demo-2',
    petId: 'pet-demo-2',
    provider: '萌宠保',
    planType: PolicyType.BASIC,
    premium: 699,
    coverage: 12000,
    startDate: '2025-07-01',
    endDate: '2026-07-01',
    status: InsuranceStatus.PENDING_RENEWAL,
    pet: mockPets[1],
  },
];
