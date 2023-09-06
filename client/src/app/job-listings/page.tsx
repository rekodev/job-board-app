'use client';
import PageHeading from '@/components/PageHeading';
import React, { useState } from 'react';
import jobs from '@/api/jobs.json';
import Pagination from '@/components/Pagination';
import JobListing from '@/components/JobListing';
import useJobListings from '@/hooks/useJobListings';

export default function Page() {
  const [page, setPage] = useState(1);
  const resultsPerPage = 2;
  const { data, isLoading, isError, error } = useJobListings();

  const paginateRight = () => {
    setPage((prev) => prev + 1);
  };

  const paginateLeft = () => {
    setPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{String(error)}</p>;
  }

  return (
    <div className='flex flex-col gap-6'>
      {data?.map((job: JobListing, idx: number) => {
        if (
          idx < page * resultsPerPage &&
          idx > (page - 1) * resultsPerPage - 1
        ) {
          return (
            <JobListing
              key={idx}
              jobTitle={job.jobTitle}
              company={job.company}
              location={job.location}
              salaryRange={job.salaryRange}
              applicationDeadline={job.applicationDeadline}
              jobType={job.jobType}
            />
          );
        }
      })}
      <Pagination jobListings={jobs} resultsPerPage={resultsPerPage} page={page} setPage={setPage} />
    </div>
  );
}
