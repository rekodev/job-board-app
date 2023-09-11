import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo } from 'react';

type PaginationProps = {
  jobListings: JobListing[] | null;
  resultsPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  jobListings,
  resultsPerPage,
  page,
  setPage,
}: PaginationProps) {
  useEffect(() => {}, [page]);

  const totalPages = jobListings
    ? Math.ceil(jobListings.length / resultsPerPage)
    : 0;

  const pagesArray = useMemo(
    () => Array.from({ length: totalPages }, (_, idx) => idx),
    [totalPages]
  );

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const lastPage = jobListings
    ? Math.ceil(jobListings.length / resultsPerPage)
    : 1;

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          {jobListings && jobListings.length > 0 ? (
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>
                {page * resultsPerPage - resultsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className='font-medium'>
                {jobListings &&
                jobListings.length % 10 !== 0 &&
                page === lastPage
                  ? jobListings?.length
                  : page * resultsPerPage}
              </span>{' '}
              of <span className='font-medium'>{jobListings?.length}</span>{' '}
              results
            </p>
          ) : (
            <p className='text-sm text-gray-700'>No results</p>
          )}
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={prevPage}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>

            {pagesArray.map((_page, idx) => {
              if (page + 2 === idx || page - 4 === idx) {
                // First 1 and last 1 always show
                if (pagesArray.length - 1 > idx && idx > 0) {
                  return (
                    <span
                      key={idx}
                      className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                    >
                      ...
                    </span>
                  );
                }
              }

              if (idx < page - 3 || idx > page + 1) {
                // First 1 and last 1 always show
                if (pagesArray.length - 1 > idx && idx > 0) {
                  return null;
                }
              }

              if (idx + 1 === page) {
                return (
                  <a
                    key={idx}
                    href='#'
                    aria-current='page'
                    className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    onClick={() => paginate(idx + 1)}
                  >
                    {idx + 1}
                  </a>
                );
              }

              return (
                <a
                  key={idx}
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  onClick={() => paginate(idx + 1)}
                >
                  {idx + 1}
                </a>
              );
            })}

            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={nextPage}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
