import React from 'react';
import { Users, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { dashboardSummary } from '../data/mockData';
import { formatDate, formatTime } from '../lib/utils';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
        description="Here's what's happening at your gym today."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Total Members"
          value={dashboardSummary.totalMembers}
          icon={<Users className="h-full w-full" />}
          change={{ value: 4.5, isPositive: true }}
        />
        
        <StatCard
          title="Checked In Today"
          value={dashboardSummary.checkedInToday}
          icon={<Activity className="h-full w-full" />}
          change={{ value: 1.2, isPositive: false }}
          iconColor="text-secondary-600"
          iconBackground="bg-secondary-100"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardSummary.membershipStats.map((stat) => (
                <div key={stat.name} className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-700">{stat.name}</span>
                      <span className="text-sm text-gray-500">{stat.value} members</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 rounded-full h-2" 
                        style={{ 
                          width: `${(stat.value / dashboardSummary.totalMembers) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {dashboardSummary.recentAttendance.map((record) => (
                <div key={record.id} className="py-3 flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.memberName)}&background=0EA5E9&color=fff`}
                      alt={record.memberName}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-dark-900">{record.memberName}</p>
                    <div className="text-xs text-gray-500">
                      {record.checkOut ? 'Checked out' : 'Checked in'} at {formatTime(record.checkOut || record.checkIn)}
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {formatDate(record.checkIn)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;