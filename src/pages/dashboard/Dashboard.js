import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { useApi } from '../../hooks/useApi';
import { getPatients, getTests, getReports, getAppointments } from '../../api';

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: patientsData } = useApi(getPatients, { limit: 5 });
  const { data: testsData } = useApi(getTests, { limit: 5 });
  const { data: reportsData } = useApi(getReports, { limit: 5 });
  const { data: appointmentsData } = useApi(getAppointments, { limit: 5 });

  const stats = [
    {
      name: 'Total Patients',
      value: patientsData?.total || 0,
      change: '+12%',
      changeType: 'positive',
      href: '/patients',
    },
    {
      name: 'Available Tests',
      value: testsData?.total || 0,
      change: '+5%',
      changeType: 'positive',
      href: '/tests',
    },
    {
      name: 'Reports Generated',
      value: reportsData?.total || 0,
      change: '+8%',
      changeType: 'positive',
      href: '/reports',
    },
    {
      name: 'Upcoming Appointments',
      value: appointmentsData?.total || 0,
      change: '+3%',
      changeType: 'positive',
      href: '/appointments',
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Welcome back, {user?.name}. Here's what's happening in your lab today.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.name} stat={stat} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Patients
          </h2>
          {/* Patient list component would go here */}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Appointments
          </h2>
          {/* Appointments list component would go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;