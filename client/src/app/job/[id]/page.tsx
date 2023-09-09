'use client';
import JobListingHeading from '@/components/JobListingHeading';
import useJobListing from '@/hooks/useJobListing';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isError, isLoading, error } = useJobListing(params.id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{String(error)}</p>;
  }

  return (
    <div>
      {data && (
        <JobListingHeading
          _id={data._id}
          jobTitle={data.jobTitle}
          jobType={data.jobType}
          salaryRange={data.salaryRange}
          company={data.company}
          applicationDeadline={data.applicationDeadline}
          location={data.location}
        />
      )}
    </div>
  );
}
