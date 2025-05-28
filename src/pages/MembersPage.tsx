import React from 'react';
import { UserPlus } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import MemberList from '../components/member/MemberList';
import { Link } from 'react-router-dom';

const MembersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Members" 
        description="Manage your gym members"
        action={
          <Link to="/members/new">
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>
              Add Member
            </Button>
          </Link>
        }
      />
      
      <MemberList />
    </div>
  );
};

export default MembersPage;