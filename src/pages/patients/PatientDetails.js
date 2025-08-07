import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { getPatient } from '../../api/patients';
import Loader from '../../components/common/Loader';
import PatientInfo from '../../components/patients/PatientInfo';
import PatientReports from '../../components/patients/PatientReports';
import PatientSamples from '../../components/patients/PatientSamples';
import PatientAppointments from '../../components/patients/PatientAppointments';
import { useAuth } from '../../context/AuthContext';

const PatientDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  
  const { data: patient, loading, error, request } = useApi(() => getPatient(id));

  useEffect(() => {
    request();
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (error) return <div>Error: {error}</div>;
  if (!patient) return null;

  const tabs = [
    { id: 'info', name: 'Patient Information' },
    { id: 'reports', name: 'Test Reports' },
    { id: 'samples', name: 'Samples' },
    { id: 'appointments', name: 'Appointments' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => history.goBack()}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <svg
            className="mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to patients
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Patient ID: {patient._id}
          </p>
        </div>
        {['admin', 'receptionist'].includes(user?.role) && (
          <Link
            to={`/patients/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Patient
          </Link>
        )}
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'info' && <PatientInfo patient={patient} />}
        {activeTab === 'reports' && <PatientReports patientId={patient._id} />}
        {activeTab === 'samples' && <PatientSamples patientId={patient._id} />}
        {activeTab === 'appointments' && (
          <PatientAppointments patientId={patient._id} />
        )}
      </div>
    </div>
  );
};

export default PatientDetails;