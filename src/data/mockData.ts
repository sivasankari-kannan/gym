import { Member, Membership, Attendance, DashboardSummary } from '../types';
import { addDays, subDays, subMonths, format } from 'date-fns';

export const memberships: Membership[] = [
  {
    id: '1',
    name: 'Basic',
    duration: 30, // days
    price: 49.99,
    description: 'Access to basic facilities and classes',
    features: ['Gym access', 'Basic equipment', '2 classes per week'],
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Standard',
    duration: 30,
    price: 79.99,
    description: 'Full access to all facilities and classes',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
    ],
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Premium',
    duration: 30,
    price: 119.99,
    description: 'VIP access with personal training sessions',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
      'Sauna access',
      '2 PT sessions per month',
    ],
    color: 'bg-purple-500',
  },
  {
    id: '4',
    name: 'Annual',
    duration: 365,
    price: 599.99,
    description: 'Full year of standard membership at a discount',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
      '15% off merchandise',
    ],
    color: 'bg-amber-500',
  },
];

export const members: Member[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(555) 123-4567',
    membershipId: '3',
    joinDate: subMonths(new Date(), 6).toISOString(),
    status: 'active',
  },
  {
    id: '2',
    name: 'James Rodriguez',
    email: 'james@example.com',
    phone: '(555) 987-6543',
    membershipId: '2',
    joinDate: subMonths(new Date(), 2).toISOString(),
    status: 'active',
  },
  {
    id: '3',
    name: 'Olivia Chen',
    email: 'olivia@example.com',
    phone: '(555) 456-7890',
    membershipId: '4',
    joinDate: subMonths(new Date(), 10).toISOString(),
    status: 'active',
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '(555) 234-5678',
    membershipId: '1',
    joinDate: subDays(new Date(), 5).toISOString(),
    status: 'pending',
  },
  {
    id: '5',
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    phone: '(555) 345-6789',
    membershipId: '2',
    joinDate: subMonths(new Date(), 1).toISOString(),
    status: 'active',
  },
  {
    id: '6',
    name: 'Daniel Kim',
    email: 'daniel@example.com',
    phone: '(555) 876-5432',
    membershipId: '1',
    joinDate: subDays(new Date(), 20).toISOString(),
    status: 'inactive',
  },
];

export const todayAttendance: Attendance[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Emma Wilson',
    checkIn: subHours(new Date(), 3).toISOString(),
    checkOut: subHours(new Date(), 1).toISOString(),
    duration: 120,
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'James Rodriguez',
    checkIn: subHours(new Date(), 2).toISOString(),
    checkOut: null,
  },
  {
    id: '3',
    memberId: '5',
    memberName: 'Sophia Martinez',
    checkIn: subHours(new Date(), 4).toISOString(),
    checkOut: subHours(new Date(), 2).toISOString(),
    duration: 120,
  },
];

export const recentAttendance: Attendance[] = [
  ...todayAttendance,
  {
    id: '4',
    memberId: '3',
    memberName: 'Olivia Chen',
    checkIn: subDays(new Date(), 1).toISOString(),
    checkOut: subDays(addHours(new Date(), -1), 1).toISOString(),
    duration: 90,
  },
  {
    id: '5',
    memberId: '1',
    memberName: 'Emma Wilson',
    checkIn: subDays(new Date(), 2).toISOString(),
    checkOut: subDays(addHours(new Date(), -1.5), 2).toISOString(),
    duration: 90,
  },
];

export const dashboardSummary: DashboardSummary = {
  totalMembers: members.length,
  activeMembers: members.filter(m => m.status === 'active').length,
  newMembersToday: 1,
  checkedInToday: todayAttendance.length,
  membershipStats: [
    { name: 'Basic', value: members.filter(m => m.membershipId === '1').length },
    { name: 'Standard', value: members.filter(m => m.membershipId === '2').length },
    { name: 'Premium', value: members.filter(m => m.membershipId === '3').length },
    { name: 'Annual', value: members.filter(m => m.membershipId === '4').length },
  ],
  recentAttendance: recentAttendance.slice(0, 5),
};

// Helper function
function subHours(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * 60 * 60 * 1000);
}

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}