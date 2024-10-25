import { NextApiRequest, NextApiResponse } from 'next';

// Base URL for the AWS API Gateway
const API_GATEWAY_BASE_URL = process.env.API_GATEWAY_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGet(req, res);
    // case 'POST':
    //   return handlePost(req, res);
    // case 'PUT':
    //   return handlePut(req, res);
    // case 'DELETE':
    //   return handleDelete(req, res);
    default:
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

// GET handler - Fetch work schedule for a user or call schedule for a department
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { 
    userId, 
    departmentId,
    hospitalName,
    date 
  } = req.body;

  try {
    if (userId) {
      // Use fetch to get work schedule for a user from API Gateway
      const response = await fetch(`${API_GATEWAY_BASE_URL}/scheduling/getUserSchedule`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hospitalName,
          userId, 
          date
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
    } else if (departmentId) {
      // Use fetch to get call schedule for a department from API Gateway
      const response = await fetch(`${API_GATEWAY_BASE_URL}/scheduling/getCallSchedule`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departmentId, date }),
      });
      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
    } else {
      return res.status(400).json({ message: 'Missing userId or departmentId' });
    }
  } catch (error) {
    return handleError(res, error);
  }
};

// PUT handler - Edit existing schedules
// const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { userId, departmentId, scheduleData } = req.body;

//   try {
//     if (userId) {
//       // Use fetch to edit work schedule for a user
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/work-schedule`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, scheduleData }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else if (departmentId) {
//       // Use fetch to edit call schedule for a department
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/call-schedule`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ departmentId, scheduleData }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else {
//       return res.status(400).json({ message: 'Missing userId or departmentId' });
//     }
//   } catch (error) {
//     return handleError(res, error);
//   }
// };

// DELETE handler - Delete schedule by ID
// const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { scheduleId } = req.query;

//   try {
//     if (scheduleId) {
//       // Use fetch to delete a schedule by ID
//       const response = await fetch(`${API_GATEWAY_BASE_URL}/schedule/${scheduleId}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         return res.status(response.status).json(data);
//       }

//       return res.status(200).json(data);
//     } else {
//       return res.status(400).json({ message: 'Missing scheduleId' });
//     }
//   } catch (error) {
//     return handleError(res, error);
//   }
// };

const handleError = (res: NextApiResponse, error: any) => {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
};