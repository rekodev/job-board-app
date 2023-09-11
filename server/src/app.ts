import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import dbConnection from './config/db';
import JobListings from './models/jobListings.model';
import JobListing from './models/jobListing.model';

const app: Express = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Starting server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Database
dbConnection();

// Routes
app.get('/api/job-listings', async (req: Request, res: Response) => {
  try {
    const jobListingsDocument = await JobListings.findOne();

    if (jobListingsDocument && jobListingsDocument.jobs) {
      res.json(jobListingsDocument.jobs);
    } else {
      res.status(404).send('No job listings found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/job-listing/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const jobListingsDocument = await JobListings.findOne();

    if (jobListingsDocument) {
      const jobListing = jobListingsDocument.jobs.find(
        (job) => job._id.toString() === id
      );

      if (jobListing) {
        res.json(jobListing);
      } else {
        res.status(404).send('Job listing not found');
      }
    } else {
      res.status(404).send('No job listings document found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/job-listings', async (req, res) => {
  const newJob = req.body;

  // Input validation can be added here, if desired.

  try {
    let jobListingsDocument = await JobListings.findOne();

    if (!jobListingsDocument) {
      // If there's no existing jobListings document, create one
      jobListingsDocument = new JobListings({ jobs: [newJob] });
    } else {
      // Otherwise, just push the new job to the existing document
      jobListingsDocument.jobs.push(newJob);
    }

    await jobListingsDocument.save();
    res.status(201).send(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get(
  '/api/job-listings/:companyName',
  async (req: Request, res: Response) => {
    try {
      const companyName = req.params.companyName;

      const listingsDoc = await JobListings.findOne({
        'jobs.company': companyName,
      });

      const jobListings = listingsDoc
        ? listingsDoc.jobs.filter((job) => job.company === companyName)
        : [];

      if (jobListings.length) {
        res.json(jobListings);
      } else {
        res.status(404).json({
          message: `No job listings found for company: ${companyName}`,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);
