'use client';
import jobs from '@/api/jobs.json';
import JobListing from '@/components/JobListing';
import Pagination from '@/components/Pagination';
import useJobListings from '@/hooks/useJobListings';
import { useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const { data, isLoading, isError, error } = useJobListings();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{String(error)}</p>;
  }

  return (
    <div className='flex flex-col gap-6 border-white border-solid border-2 rounded-md shadow-lg'>
      {data?.map((job: JobListing, idx: number) => {
        if (
          idx < page * resultsPerPage &&
          idx > (page - 1) * resultsPerPage - 1
        ) {
          return (
            <JobListing
              id={job.id}
              key={job.id}
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
      <Pagination
        jobListings={jobs}
        resultsPerPage={resultsPerPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
