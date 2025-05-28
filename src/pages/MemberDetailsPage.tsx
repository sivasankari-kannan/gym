import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Clock, CreditCard, Mail, Phone } from 'lucide-react';
import { members, memberships } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams();
  const member = members.find(m => m.id === id);
  const membership = memberships.find(m => m.id === member?.membershipId);

  if (!member) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Member not found</h2>
          <p className="mt-2 text-gray-600">The member you're looking for doesn't exist.</p>
          <Link to="/members" className="mt-4 inline-block">
            <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
              Back to Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate membership due date
  const joinDate = new Date(member.joinDate);
  const dueDate = new Date(joinDate);
  dueDate.setDate(dueDate.getDate() + (membership?.duration || 0));

  const daysLeft = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
              alt={member.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
              <div className="mt-1 flex items-center">
                <Badge variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </dt>
                    <dd className="text-sm text-gray-900">{member.email}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </dt>
                    <dd className="text-sm text-gray-900">{member.phone}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined
                    </dt>
                    <dd className="text-sm text-gray-900">{formatDate(member.joinDate)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Plan
                    </dt>
                    <dd className="text-sm text-gray-900">{membership?.name}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration
                    </dt>
                    <dd className="text-sm text-gray-900">{membership?.duration} days</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(dueDate)}
                      <span className={`ml-2 text-xs ${
                        daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        ({daysLeft} days left)
                      </span>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;