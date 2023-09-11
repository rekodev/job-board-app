'use client';
import JobListing from '@/components/JobListing';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import useJobListingsByCompanyName from '@/hooks/useCompanyJobListings';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { companyName: string } }) {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;
  const { data, isLoading, isError, error } = useJobListingsByCompanyName(
    params.companyName
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  useEffect(() => {
    const filteredData = searchTerm
      ? data?.filter((job: JobListing) => {
          return (
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      : data;

    setNewData(filteredData);
    setPage(1); // Reset pagination whenever searchTerm changes
  }, [searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{String(error)}</p>;
  }

  return (
    <section className=''>
      <div className='m-auto max-w-7xl py-4 px-8'>
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className='flex flex-col rounded-md shadow-lg overflow-hidden my-2 '>
          {newData?.map((job: JobListing, idx: number) => {
            if (
              idx < page * resultsPerPage &&
              idx > (page - 1) * resultsPerPage - 1
            ) {
              return (
                <JobListing
                  _id={job._id}
                  key={job._id}
                  jobTitle={job.jobTitle}
                  company={job.company}
                  location={job.location}
                  salaryRange={job.salaryRange}
                  applicationDeadline={job.applicationDeadline}
                  jobType={job.jobType}
                />
              );
            }

            return null;
          })}
          <Pagination
            jobListings={newData ? newData : null}
            resultsPerPage={resultsPerPage}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </section>
  );
}
